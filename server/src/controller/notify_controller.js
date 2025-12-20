import userModel from "../models/user_model.js";

export const getAllNotification = async (req, res) => {
  const { userid } = req.user;
  try {
    const user = await userModel
      .findById(userid)
      .select("notifications")
      .populate("notifications.from", "name surname photo");
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Sort notifications by createdAt (newest first)
    const sortedNotifications = user.notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.json({ 
      success: true, 
      notifications: sortedNotifications 
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { userid } = req.user;
  const { notificationId } = req.params;
  
  try {
    const user = await userModel.findById(userid);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.json({ success: false, message: "Notification not found" });
    }

    notification.isRead = true;
    await user.save();

    return res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  const { userid } = req.user;
  
  try {
    const user = await userModel.findById(userid);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.notifications.forEach((notification) => {
      notification.isRead = true;
    });
    
    await user.save();

    return res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};