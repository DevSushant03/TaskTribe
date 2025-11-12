import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('tasktribe.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    bio TEXT,
    skills TEXT,
    rating REAL DEFAULT 0,
    completedTasks INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    deadline DATE,
    status TEXT DEFAULT 'open',
    posterId INTEGER NOT NULL,
    solverId INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME,
    FOREIGN KEY (posterId) REFERENCES users(id),
    FOREIGN KEY (solverId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER NOT NULL,
    solverId INTEGER NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (taskId) REFERENCES tasks(id),
    FOREIGN KEY (solverId) REFERENCES users(id),
    UNIQUE(taskId, solverId)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER NOT NULL,
    senderId INTEGER NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (taskId) REFERENCES tasks(id),
    FOREIGN KEY (senderId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER NOT NULL,
    raterId INTEGER NOT NULL,
    ratedUserId INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (taskId) REFERENCES tasks(id),
    FOREIGN KEY (raterId) REFERENCES users(id),
    FOREIGN KEY (ratedUserId) REFERENCES users(id),
    UNIQUE(taskId, raterId, ratedUserId)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    taskId INTEGER,
    isRead INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

export default db;
