import mongoose from "mongoose";
const ChatRoomSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
      required: false, // Optional: one chat room can handle multiple tasks
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

// Index for faster lookup by participants
ChatRoomSchema.index({ participants: 1 });

export const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);

const MessageSchema = new mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: String,
    file: String,
    taskkId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);

MessageSchema.index({ chatRoomId: 1, createdAt: -1 });
MessageSchema.index({ chatRoomId: 1, seenBy: 1 });
