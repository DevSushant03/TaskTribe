import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "./database.js";

const PORT = process.env.PORT || 3000;
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(username, email, hashedPassword);
    
    const token = jwt.sign({ id: result.lastInsertRowid, username }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { id: result.lastInsertRowid, username, email } 
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { id: user.id, username: user.username, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get("/api/user/:id", authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, email, bio, skills, rating, completedTasks FROM users WHERE id = ?').get(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put("/api/user/:id", authenticateToken, (req, res) => {
  try {
    const { bio, skills } = req.body;
    
    if (req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const stmt = db.prepare('UPDATE users SET bio = ?, skills = ? WHERE id = ?');
    stmt.run(bio, skills, req.params.id);
    
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.get("/api/tasks", authenticateToken, (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT tasks.*, users.username as posterName 
      FROM tasks 
      JOIN users ON tasks.posterId = users.id 
      WHERE tasks.status = 'open'
      ORDER BY tasks.createdAt DESC
    `).all();
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get("/api/tasks/my-posted", authenticateToken, (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT tasks.*, users.username as solverName 
      FROM tasks 
      LEFT JOIN users ON tasks.solverId = users.id 
      WHERE tasks.posterId = ?
      ORDER BY tasks.createdAt DESC
    `).all(req.user.id);
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get("/api/tasks/my-applications", authenticateToken, (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT tasks.*, applications.status as applicationStatus, users.username as posterName 
      FROM applications 
      JOIN tasks ON applications.taskId = tasks.id 
      JOIN users ON tasks.posterId = users.id
      WHERE applications.solverId = ?
      ORDER BY applications.createdAt DESC
    `).all(req.user.id);
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.get("/api/tasks/:id", authenticateToken, (req, res) => {
  try {
    const task = db.prepare(`
      SELECT tasks.*, 
             poster.username as posterName, poster.rating as posterRating,
             solver.username as solverName, solver.rating as solverRating
      FROM tasks 
      JOIN users as poster ON tasks.posterId = poster.id 
      LEFT JOIN users as solver ON tasks.solverId = solver.id 
      WHERE tasks.id = ?
    `).get(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

app.post("/api/tasks", authenticateToken, (req, res) => {
  try {
    const { title, description, category, difficulty, deadline } = req.body;
    
    if (!title || !description || !category || !difficulty) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const stmt = db.prepare('INSERT INTO tasks (title, description, category, difficulty, deadline, posterId) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(title, description, category, difficulty, deadline, req.user.id);
    
    res.json({ id: result.lastInsertRowid, message: 'Task posted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get("/api/tasks/:taskId/applications", authenticateToken, (req, res) => {
  try {
    const task = db.prepare('SELECT posterId FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task || task.posterId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const applications = db.prepare(`
      SELECT applications.*, users.username, users.rating 
      FROM applications 
      JOIN users ON applications.solverId = users.id 
      WHERE applications.taskId = ?
      ORDER BY applications.createdAt DESC
    `).all(req.params.taskId);
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.post("/api/tasks/:taskId/apply", authenticateToken, (req, res) => {
  try {
    const { message } = req.body;
    
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.posterId === req.user.id) {
      return res.status(400).json({ error: 'Cannot apply to your own task' });
    }
    
    if (task.status !== 'open') {
      return res.status(400).json({ error: 'Task is not open for applications' });
    }
    
    const stmt = db.prepare('INSERT INTO applications (taskId, solverId, message) VALUES (?, ?, ?)');
    stmt.run(req.params.taskId, req.user.id, message);
    
    const notifStmt = db.prepare('INSERT INTO notifications (userId, message, type, taskId) VALUES (?, ?, ?, ?)');
    notifStmt.run(task.posterId, `${req.user.username} applied to your task: ${task.title}`, 'application', task.id);
    
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'You have already applied to this task' });
    } else {
      res.status(500).json({ error: 'Failed to submit application' });
    }
  }
});

app.post("/api/applications/:appId/approve", authenticateToken, (req, res) => {
  try {
    const application = db.prepare(`
      SELECT applications.*, tasks.posterId, tasks.title 
      FROM applications 
      JOIN tasks ON applications.taskId = tasks.id 
      WHERE applications.id = ?
    `).get(req.params.appId);
    
    if (!application || application.posterId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    db.prepare('UPDATE applications SET status = ? WHERE id = ?').run('approved', req.params.appId);
    db.prepare('UPDATE tasks SET solverId = ?, status = ? WHERE id = ?').run(application.solverId, 'in-progress', application.taskId);
    db.prepare('UPDATE applications SET status = ? WHERE taskId = ? AND id != ?').run('rejected', application.taskId, req.params.appId);
    
    const notifStmt = db.prepare('INSERT INTO notifications (userId, message, type, taskId) VALUES (?, ?, ?, ?)');
    notifStmt.run(application.solverId, `Your application for "${application.title}" was approved!`, 'approval', application.taskId);
    
    res.json({ message: 'Application approved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve application' });
  }
});

app.post("/api/tasks/:taskId/complete", authenticateToken, (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task || (task.posterId !== req.user.id && task.solverId !== req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    db.prepare('UPDATE tasks SET status = ?, completedAt = CURRENT_TIMESTAMP WHERE id = ?').run('completed', req.params.taskId);
    
    const otherUserId = task.posterId === req.user.id ? task.solverId : task.posterId;
    const notifStmt = db.prepare('INSERT INTO notifications (userId, message, type, taskId) VALUES (?, ?, ?, ?)');
    notifStmt.run(otherUserId, `Task "${task.title}" has been marked as completed. Please rate your experience.`, 'completion', task.id);
    
    res.json({ message: 'Task marked as complete' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

app.get("/api/tasks/:taskId/messages", authenticateToken, (req, res) => {
  try {
    const task = db.prepare('SELECT posterId, solverId FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task || (task.posterId !== req.user.id && task.solverId !== req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const messages = db.prepare(`
      SELECT messages.*, users.username 
      FROM messages 
      JOIN users ON messages.senderId = users.id 
      WHERE messages.taskId = ?
      ORDER BY messages.createdAt ASC
    `).all(req.params.taskId);
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post("/api/tasks/:taskId/messages", authenticateToken, (req, res) => {
  try {
    const { message } = req.body;
    
    const task = db.prepare('SELECT posterId, solverId FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task || (task.posterId !== req.user.id && task.solverId !== req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const stmt = db.prepare('INSERT INTO messages (taskId, senderId, message) VALUES (?, ?, ?)');
    const result = stmt.run(req.params.taskId, req.user.id, message);
    
    const otherUserId = task.posterId === req.user.id ? task.solverId : task.posterId;
    if (otherUserId) {
      const notifStmt = db.prepare('INSERT INTO notifications (userId, message, type, taskId) VALUES (?, ?, ?, ?)');
      notifStmt.run(otherUserId, `New message from ${req.user.username}`, 'message', task.id);
    }
    
    res.json({ id: result.lastInsertRowid, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.post("/api/tasks/:taskId/rate", authenticateToken, (req, res) => {
  try {
    const { rating, comment, ratedUserId } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.taskId);
    
    if (!task || (task.posterId !== req.user.id && task.solverId !== req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    if (task.status !== 'completed') {
      return res.status(400).json({ error: 'Task must be completed to rate' });
    }
    
    const stmt = db.prepare('INSERT INTO ratings (taskId, raterId, ratedUserId, rating, comment) VALUES (?, ?, ?, ?, ?)');
    stmt.run(req.params.taskId, req.user.id, ratedUserId, rating, comment);
    
    const avgRating = db.prepare('SELECT AVG(rating) as avg FROM ratings WHERE ratedUserId = ?').get(ratedUserId);
    const completedCount = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE (solverId = ? OR posterId = ?) AND status = "completed"').get(ratedUserId, ratedUserId);
    
    db.prepare('UPDATE users SET rating = ?, completedTasks = ? WHERE id = ?').run(avgRating.avg, completedCount.count, ratedUserId);
    
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'You have already rated this task' });
    } else {
      res.status(500).json({ error: 'Failed to submit rating' });
    }
  }
});

app.get("/api/notifications", authenticateToken, (req, res) => {
  try {
    const notifications = db.prepare('SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 50').all(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.put("/api/notifications/:id/read", authenticateToken, (req, res) => {
  try {
    db.prepare('UPDATE notifications SET isRead = 1 WHERE id = ? AND userId = ?').run(req.params.id, req.user.id);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

app.get("/api/stats", authenticateToken, (req, res) => {
  try {
    const totalTasks = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE posterId = ?').get(req.user.id);
    const completedTasks = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE solverId = ? AND status = "completed"').get(req.user.id);
    const pendingApps = db.prepare('SELECT COUNT(*) as count FROM applications WHERE solverId = ? AND status = "pending"').get(req.user.id);
    const activeTasks = db.prepare('SELECT COUNT(*) as count FROM tasks WHERE solverId = ? AND status = "in-progress"').get(req.user.id);
    
    res.json({
      totalPosted: totalTasks.count,
      totalCompleted: completedTasks.count,
      pendingApplications: pendingApps.count,
      activeTasks: activeTasks.count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "TaskTribe API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
