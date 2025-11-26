import taskModel from "../models/task_model.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "tasktribe/tasks" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    upload.end(fileBuffer);
  });
};

export const createTask = async (req, res) => {
  const { userid } = req.user;

  try {
    const { title, description, tags, budgetMin, budgetMax, deadline } =
      req.body;

    let uploadedFiles = [];

    // Upload files if present
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer);

          uploadedFiles.push({
            url: result.secure_url,
            filename: result.original_filename,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      }
    }

    // Now save task in DB
    const newTask = await taskModel.create({
      title,
      description,
      tags: JSON.parse(tags || "[]"),
      budget: {
        min: budgetMin ? Number(budgetMin) : undefined,
        max: budgetMax ? Number(budgetMax) : undefined,
      },
      deadline: deadline || null,
      createdBy: userid,
      attachments: uploadedFiles,
    });

    return res.json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ----------------------
// Get All Tasks
// ----------------------
export const getAllTasks = async (req, res) => {
  const { userid } = req.user;
  try {
    const tasks = await taskModel
      .find({ createdBy: { $ne: userid } })
      .populate("createdBy")
      .populate("assignedTo");

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// ----------------------
// Get Single Task
// ----------------------
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await taskModel
      .findById(taskId)
      .populate("createdBy", "name email photo");

    if (!task) {
      return res.json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({ success: true, task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not get task",
    });
  }
};

// ----------------------
// Delete Task (only owner)
// ----------------------
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.user;

    const task = await taskModel.findById(id);

    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    if (task.createdBy.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this task",
      });
    }

    await taskModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

export const applyForTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userid } = req.user;
    const { message } = req.body;

    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const alreadyApplied = task.applicants.some(
      (a) => a.user.toString() === userid
    );

    if (alreadyApplied) {
      return res.json({
        success: false,
        message: "Already applied to this task",
      });
    }
    task.applicants.push({
      user: userid,
      message,
    });
    task.applicantsCount += 1;

    await task.save();

    res.status(200).json({ msg: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const getMyTask = async (req, res) => {
  try {
    const { userid } = req.user;

  const tasks = await taskModel
  .find({ createdBy: userid })
  .populate("applicants.user", "name surname skills bio email photo");

    if (!tasks) {
      return res.json({
        success: false,
        message: "Task Not found",
      });
    }
    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};
