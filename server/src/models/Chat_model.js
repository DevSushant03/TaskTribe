import mongoose from "mongoose";
const ChatRoomSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
      required: true,
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
