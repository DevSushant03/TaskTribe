import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true, 
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false, 
    default: null,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["task", "review", "system", "message"],
    default: "system",
  },
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    required: false,
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const notificationModel =
  mongoose.models.notification ||
  mongoose.model("notification", notificationSchema);

export default notificationModel;