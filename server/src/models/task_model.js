import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    budget: {
      min: { type: Number },
      max: { type: Number },
    },

    deadline: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "open",
        "applied",
        "in_progress",
        "submitted",
        "completed",
        "cancelled",
      ],
      default: "open",
    },

    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        message: { type: String },
        appliedAt: { type: Date, default: Date.now },
      },
    ],

    applicantsCount: {
      type: Number,
      default: 0,
    },

    // ✔️ Attachments directly inside taskSchema (NO separate schema file)
    attachments: [
      {
        url: { type: String, required: true },
        filename: { type: String, required: true },
      },
    ],
  },

  { timestamps: true }
);

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
