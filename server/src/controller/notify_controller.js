import notificationModel from "../models/notification_model.js";

export const getAllNotification = async (req, res) => {
  const { userid } = req.user;

  try {
    const notifications = await notificationModel
      .find({ recipient: userid })
      .populate("from", "name surname photo")
      .sort({ createdAt: -1 }); 

    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { userid } = req.user;
  const { notificationId } = req.params;

  try {
    const notification = await notificationModel.findOneAndUpdate(
      { _id: notificationId, recipient: userid }, // ensures user can only mark their own
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    return res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  const { userid } = req.user;

  try {
    await notificationModel.updateMany(
      { recipient: userid, isRead: false },
      { isRead: true },
    );

    return res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
