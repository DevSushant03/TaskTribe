import express from "express";
import routes from "./index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import morgan from "morgan";


const app = express();
const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: ["https://tasktribe-plum.vercel.app", "http://localhost:5173"],
    credentials: true,
  },
});

// ✅ USE MAP (BEST)
export const userSocketMap = new Map();

io.use((socket, next) => {
  try {
    const cookieHeader = socket.request.headers.cookie;
    if (!cookieHeader) return next(new Error("Unauthorized"));

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map(c => c.split("="))
    );

    const token = cookies.accessToken;
    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;

    next();
  } catch (err) {
    next(new Error("Invalid Token"));
  }
});


io.on("connection", (socket) => {
  const userId = socket.userId;

  console.log("User connected:", userId);

  userSocketMap.set(userId.toString(), socket.id);

  // Handle room joining for chat
  socket.on("joinRoom", (roomId) => {
    socket.join(`room:${roomId}`);
    console.log(`User ${userId} joined room: ${roomId}`);
  });

  // Handle room leaving
  socket.on("leaveRoom", (roomId) => {
    socket.leave(`room:${roomId}`);
    console.log(`User ${userId} left room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    userSocketMap.delete(userId.toString());
  });
});

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://tasktribe-plum.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/", routes);

export { app, server };
