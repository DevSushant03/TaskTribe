import taskModel from "../models/task_model.js";
import cloudinary from "../config/cloudinary.js";
import bankModel from "../models/BankDetails_model.js";

const uploadToCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: `tasktribe/${folderName}` },
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
          const result = await uploadToCloudinary(file.buffer, "tasks");

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
      .find({ createdBy: { $ne: userid }, status: "open" })
      .populate("createdBy", "name surname email photo bio skills")
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
    
    const bankAccount = await bankModel.findOne({userId:userid})
     if (!bankAccount) {
      return res.status(404).json({success:false, message: "Please add your bank details" });
    }
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
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

    res.status(200).json({ success: false, message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
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

export const acceptApplicant = async (req, res) => {
  try {
    const { applicantId, TaskId } = req.params;

    const task = await taskModel.findById(TaskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const applicant = task.applicants.find(
      (a) => a.user.toString() === applicantId
    );
    if (!applicant) {
      return res
        .status(400)
        .json({ message: "Applicant not found in this task" });
    }
    task.assignedTo = applicantId;
    task.status = "in_progress";
    task.applicants = [];
    task.applicantsCount = 0;
    await task.save();

    res.json({
      message: "Applicant accepted",
      task,
    });
    console.log("Applicant accepted");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};
export const rejectApplicant = async (req, res) => {
  try {
    const { applicantId, TaskId } = req.params;

    const task = await taskModel.findById(TaskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const updatedApplicants = task.applicants.filter(
      (a) => a.user.toString() !== applicantId
    );

    task.applicants = updatedApplicants;
    task.applicantsCount = updatedApplicants.length;
    await task.save();

    res.json({
      message: "Applicant rejected",
      task,
    });
    console.log("Applicant rejected");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAssignedTask = async (req, res) => {
  try {
    const { userid } = req.user;

    const tasks = await taskModel
      .find({
        assignedTo: userid,
      })
      .populate("createdBy", "name surname email photo");

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks have been assigned to you yet.",
      });
    }

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const submitWork = async (req, res) => {
  try {
    const { TaskId } = req.params;
    const task = await taskModel.findById(TaskId);
    let uploadedFiles = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, "workFiles");
             
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

    task.submittedWork = {
      files: uploadedFiles,
      submittedAt: new Date(),
    };
    task.status="submitted";
    await task.save();
    res.json({
      success: true,
      message: "Work Submitted Successfully",
      uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Work Not Submitted ,Server error",
      error
    });
  }
};
