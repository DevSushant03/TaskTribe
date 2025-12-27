import taskModel from "../models/task_model.js";
import cloudinary from "../config/cloudinary.js";
import bankModel from "../models/BankDetails_model.js";
import { ChatRoomModel, MessageModel } from "../models/Chat_model.js";
import userModel from "../models/user_model.js";

export const uploadToCloudinary = (fileBuffer, folderName) => {
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
export const getPublicIdFromUrl = (url) => {
  const cleanUrl = url.split("?")[0];

  const parts = cleanUrl.split("/upload/")[1];
  if (!parts) return null;

  const withoutVersion = parts.replace(/^v[0-9]+\//, "");

  const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

  return publicId;
};
export const getResourceType = (url) => {
  const extension = url.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension))
    return "image";

  if (["mp4", "mov", "avi", "mkv", "webm"].includes(extension)) return "video";

  return "raw"; // pdf, doc, txt, zip, etc.
};
export const deleteCloudinaryFile = async (url) => {
  try {
    const publicId = getPublicIdFromUrl(url);
    const resourceType = getResourceType(url);
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Cloudinary delete response:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
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

    await userModel.findByIdAndUpdate(userid, {
      $push: {
        notifications: {
          from: null, //from tasktribe
          message: `Your task "${newTask.title}" has been posted successfully`,
        },
      },
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

export const editTask = async (req, res) => {
  const { userid } = req.user;

  try {
    const { TaskId } = req.params;
    const {
      title,
      description,
      tags,
      budgetMin,
      budgetMax,
      deadline,
      deleteAttachments,
    } = req.body;

    // Find the task
    const task = await taskModel.findById(TaskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if user is the creator
    if (task.createdBy.toString() !== userid) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this task",
      });
    }

    // Check if task is open
    if (task.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "You can only edit tasks that are open",
      });
    }

    // Handle file deletions if specified
    if (deleteAttachments) {
      const deleteUrls = JSON.parse(deleteAttachments);
      for (const url of deleteUrls) {
        try {
          await deleteCloudinaryFile(url);
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
      // Remove deleted files from attachments
      task.attachments = task.attachments.filter(
        (att) => !deleteUrls.includes(att.url)
      );
    }

    // Upload new files if present
    let newFiles = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, "tasks");
          newFiles.push({
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

    // Update task fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (tags) task.tags = JSON.parse(tags || "[]");
    if (budgetMin !== undefined)
      task.budget.min = budgetMin ? Number(budgetMin) : undefined;
    if (budgetMax !== undefined)
      task.budget.max = budgetMax ? Number(budgetMax) : undefined;
    if (deadline !== undefined) task.deadline = deadline || null;
    if (newFiles.length > 0) {
      task.attachments = [...task.attachments, ...newFiles];
    }

    await task.save();

    // Notify all applicants if there are any
    if (task.applicants && task.applicants.length > 0) {
      const notificationPromises = task.applicants.map((applicant) => {
        return userModel.findByIdAndUpdate(applicant.user, {
          $push: {
            notifications: {
              from: task.createdBy,
              message: `The task "${task.title}" has been updated. Please review the changes.`,
            },
          },
        });
      });
      await Promise.all(notificationPromises);
    }

    return res.json({
      success: true,
      message: "Task updated successfully",
      task: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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

export const getTaskApplyByMe = async (req, res) => {
  try {
    const { userid } = req.user;

    const tasks = await taskModel
      .find({
        status: "open",
        "applicants.user": userid,
      })
      .select("title description budget deadline applicants.bidAmount applicants.message")
      .populate("createdBy", "name surname photo email")
      .sort({ createdAt: -1 });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: false,
        message: "You have not applied to any tasks yet or rejected",
      });
    }

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const cancelTaskApplyByMe = async (req, res) => {
  try {
    const { TaskId } = req.params;
    const { userid } = req.user;

    const task = await taskModel.findById(TaskId);

    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    task.applicants = task.applicants.filter(
      (applicant) => applicant.user.toString() !== userid
    );
    task.applicantsCount = task.applicants.length;
    await task.save();

    return res.json({
      success: true,
      message: "Application cancel successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateTaskApplication = async (req, res) => {
  try {
    const { TaskId } = req.params;
    const { userid } = req.user;
    const { message, bidAmount } = req.body;

    const task = await taskModel.findById(TaskId);

    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    const applicantIndex = task.applicants.findIndex(
      (a) => a.user.toString() === userid
    );

    if (applicantIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "You have not applied to this task",
      });
    }
    if (message !== undefined) {
      task.applicants[applicantIndex].message = message;
    }
    if (bidAmount !== undefined) {
      task.applicants[applicantIndex].bidAmount = bidAmount;
    }
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { TaskId } = req.params;
    const { userid } = req.user;

    const task = await taskModel.findById(TaskId);

    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    if (task.createdBy.toString() !== userid) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this task",
      });
    }

    if (task.attachments && task.attachments.length > 0) {
      for (let file of task.attachments) {
        await deleteCloudinaryFile(file.url);
      }
    }

    if (task.applicants && task.applicants.length > 0) {
      const notificationPromises = task.applicants.map((applicant) => {
        return userModel.findByIdAndUpdate(applicant.user, {
          $push: {
            notifications: {
              from: null,
              message: `The task "${task.title}" has been deleted by creator.`,
            },
          },
        });
      });
      await Promise.all(notificationPromises);
    }

    await taskModel.findByIdAndDelete(TaskId);

    await userModel.findByIdAndUpdate(userid, {
      $push: {
        notifications: {
          from: null,
          message: `Your task "${task.title}" has been deleted successfully`,
        },
      },
    });

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

export const rejectSubmitedWork = async (req, res) => {
  try {
    const { TaskId } = req.params;
    const { userid } = req.user;

    const task = await taskModel.findById(TaskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Only the creator can reject submitted work
    if (task.createdBy.toString() !== userid) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject this submission",
      });
    }

    // Can only reject if work is actually submitted
    if (task.status !== "submitted") {
      return res.status(400).json({
        success: false,
        message: "Only submitted work can be rejected",
      });
    }

    // Delete submitted work files from Cloudinary (if any)
    if (task.submittedWork && task.submittedWork.files.length > 0) {
      for (let file of task.submittedWork.files) {
        try {
          await deleteCloudinaryFile(file.url);
        } catch (error) {
          console.error("Error deleting submitted work file:", error);
        }
      }
    }

    task.status = "in_progress";
    task.submittedWork = {
      files: [],
      submittedAt: null,
    };
    await task.save();

    // Notify the assigned user that changes are requested
    await userModel.findByIdAndUpdate(task.assignedTo, {
      $push: {
        notifications: {
          from: task.createdBy,
          message:
            "Your submitted work was reviewed. The task creator requested changes. Please update and resubmit your work.",
        },
      },
    });

    return res.json({
      success: true,
      message: "Submission rejected successfully",
    });
  } catch (error) {
    console.error("Reject submitted work error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reject submitted work",
    });
  }
};
export const applyForTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userid } = req.user;
    const { message, bidAmount } = req.body;

    const bankAccount = await bankModel.findOne({ userId: userid });

    if (!bankAccount) {
      return res.json({
        success: false,
        action: "ADD_BANK_DETAILS",
        message: "Please add your bank details",
      });
    }

    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.json({
        success: false,
        action: "TASK_NOT_FOUND",
        message: "Task not found",
      });
    }

    const alreadyApplied = task.applicants.some(
      (a) => a.user.toString() === userid
    );

    if (alreadyApplied) {
      return res.json({
        success: false,
        action: "ALREADY_APPLIED",
        message: "Already applied to this task",
      });
    }

    task.applicants.push({
      user: userid,
      message,
      bidAmount,
    });

    task.applicantsCount += 1;
    await task.save();

    await userModel.findByIdAndUpdate(userid, {
      $push: {
        notifications: {
          from: null, //from tasktribe
          message: `Your proposal for "${task.title}" has been submitted successfully`,
        },
      },
    });

    return res.status(200).json({
      success: true,
      action: "APPLIED_SUCCESSFULLY",
      message: "Applied successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      action: "SERVER_ERROR",
      message: "Server error",
      error,
    });
  }
};

export const getMyTask = async (req, res) => {
  try {
    const { userid } = req.user;

    const tasks = await taskModel
      .find({ createdBy: userid })
      .populate(
        "applicants.user",
        "name surname skills bio email photo review rating"
      )
      .populate("assignedTo", "name surname email photo");

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
    const acceptsApplicant = task.applicants.find(
      (a) => a.user.toString() === applicantId
    );
    if (!acceptsApplicant) {
      return res
        .status(400)
        .json({ message: "Applicant not found in this task" });
    }
    // Get all rejected applicants before clearing the array
    const rejectedApplicants = task.applicants.filter(
      (a) => a.user.toString() !== applicantId
    );

    task.assignedTo = applicantId;
    task.status = "in_progress";
    task.applicants = [];
    task.applicantsCount = 0;
    await task.save();

    // Send notification to accepted applicant
    await userModel.findByIdAndUpdate(applicantId, {
      $push: {
        notifications: {
          from: task.createdBy,
          message: `🎉 Your proposal was accepted for "${task.title}"`,
        },
      },
    });

    // Send notifications to all rejected applicants
    const rejectPromises = rejectedApplicants.map((rej) => {
      return userModel.findByIdAndUpdate(rej.user, {
        $push: {
          notifications: {
            from: task.createdBy,
            message: `Your proposal was not selected for "${task.title}"`,
          },
        },
      });
    });

    await Promise.all(rejectPromises);

    // Check if chat room already exists between these two participants
    // Use $all to check if the participants array contains both users
    let chatRoom = await ChatRoomModel.findOne({
      participants: { $all: [task.createdBy, task.assignedTo] },
    });

    // If no chat room exists, create a new one
    if (!chatRoom) {
      chatRoom = await ChatRoomModel.create({
        participants: [task.createdBy, task.assignedTo],
        // taskId is optional now - one chat room handles multiple tasks
      });
    }

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

    await userModel.findByIdAndUpdate(applicantId, {
      $push: {
        notifications: {
          from: task.createdBy,
          message: `Your proposal was not selected for "${task.title}"`,
        },
      },
    });

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
    task.status = "submitted";
    await task.save();

    await userModel.findByIdAndUpdate(task.createdBy, {
      $push: {
        notifications: {
          from: task.assignedTo,
          message: `Your task "${task.title}" workfiles is submitted `,
        },
      },
    });
    res.json({
      success: true,
      message: "Work Submitted Successfully",
      uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Work Not Submitted ,Server error",
      error,
    });
  }
};

export const markAsComplete = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { rating, review } = req.body;
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    for (let file of task.attachments) {
      await deleteCloudinaryFile(file.url);
    }
    for (let file of task.submittedWork.files) {
      await deleteCloudinaryFile(file.url);
    }

    // Find the chat room between the two users
    const chatRoom = await ChatRoomModel.findOne({
      participants: { $all: [task.createdBy, task.assignedTo] },
    });

    if (chatRoom) {
      // Delete messages related to this specific completed task
      await MessageModel.deleteMany({
        chatRoomId: chatRoom._id,
        taskkId: taskId,
      });

      // Check if there are any other active tasks between these two users
      // Active tasks are those not completed or cancelled
      const otherTasks = await taskModel.find({
        $or: [
          { createdBy: task.createdBy, assignedTo: task.assignedTo },
          { createdBy: task.assignedTo, assignedTo: task.createdBy },
        ],
        _id: { $ne: taskId },
        status: { $nin: ["completed", "cancelled"] },
      });

      // If no other active tasks exist, delete the chat room and all remaining messages
      if (otherTasks.length === 0) {
        await MessageModel.deleteMany({ chatRoomId: chatRoom._id });
        await ChatRoomModel.findByIdAndDelete(chatRoom._id);
      }
      // If other tasks exist, keep the chat room (we already deleted task-specific messages)
    }

    await taskModel.findByIdAndDelete(taskId);

    // Get the assigned user to calculate new rating average
    const assignedUser = await userModel.findById(task.assignedTo);
    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    // Calculate new rating average
    const currentAvg = assignedUser.rating?.avg || 0;
    const currentCount = assignedUser.rating?.count || 0;
    const newCount = currentCount + 1;
    const newAvg = (currentAvg * currentCount + rating) / newCount;

    // Update rating (object) and push review (array)
    await userModel.findByIdAndUpdate(task.assignedTo, {
      $set: {
        "rating.avg": newAvg,
        "rating.count": newCount,
      },
      $push: {
        review: {
          from: task.createdBy,
          message: review,
          createdAt: new Date(),
        },
      },
    });

    await userModel.findByIdAndUpdate(task.createdBy, {
      $push: {
        notifications: {
          from: null, //from tasktribe
          message: `Your task "${task.title}" has been completed successfully`,
        },
      },
    });

    await userModel.findByIdAndUpdate(task.assignedTo, {
      $push: {
        notifications: {
          from: null, //from tasktribe
          message: `Your task "${task.title}" has been completed successfully. Your Payment will be credited to your account within 2-3 business days. If your payment is not credited, you can contact us`,
        },
      },
    });

    res.json({
      success: true,
      message: "Task Completed & files Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not Deleted , Internal Server Error",
      error,
    });
  }
};
