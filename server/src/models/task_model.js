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
      enum: ["open", "in_progress", "submitted", "completed", "cancelled"],
      default: "open",
    },

    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        bidAmount: { type: Number, default: 0 },
        message: { type: String },
        appliedAt: { type: Date, default: Date.now },
      },
    ],

    applicantsCount: {
      type: Number,
      default: 0,
    },

    attachments: [
      {
        url: { type: String, required: true },
        filename: { type: String, required: true },
      },
    ],

    submittedWork: {
      message: { type: String, default: "" },
      files: [
        {
          url: { type: String },
          filename: { type: String },
        },
      ],
      submittedAt: { type: Date },
    },
  },

  { timestamps: true }
);

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
