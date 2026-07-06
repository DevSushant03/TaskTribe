import { MessageModel, ChatRoomModel } from "../models/Chat_model.js";
import { uploadToCloudinary } from "../utils/cloudinary_service.js";
import { io, userSocketMap } from "../app.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const myId = req.user.userid;

    const chatRooms = await ChatRoomModel.find({
      participants: myId,
    })
      .populate("taskId", "title budget")
      .populate("participants", "name surname photo");

    const roomsWithMeta = await Promise.all(
      chatRooms.map(async (room) => {
        const lastMessage = await MessageModel.findOne({
          chatRoomId: room._id,
        }).sort({ createdAt: -1 });

        const unseenCount = await MessageModel.countDocuments({
          chatRoomId: room._id,
          seenBy: { $ne: myId },
          senderId: { $ne: myId },
        });

        return {
          room,
          lastMessage,
          unseenCount,
        };
      })
    );

    res.json({ success: true, chats: roomsWithMeta, myId });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatRoomId } = req.params;
    const myId = req.user.userid;

    const messages = await MessageModel.find({ chatRoomId })
      .sort({ createdAt: 1 }) // Sort by oldest first (ascending)
      .populate("senderId", "name photo");

    // Mark seen
    await MessageModel.updateMany(
      {
        chatRoomId,
        seenBy: { $ne: myId },
        senderId: { $ne: myId },
      },
      { $push: { seenBy: myId } }
    );

    res.json({ success: true, messages });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await MessageModel.findByIdAndUpdate(id, {
      $addToSet: { seenBy: req.user.userid },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { text, file } = req.body;
    const senderId = req.user.userid;

    let fileUrl;
    if (file) {
      const upload = await uploadToCloudinary(file, "ChatFiles");
      fileUrl = upload.secure_url;
    }

    const message = await MessageModel.create({
      chatRoomId,
      senderId,
      text,
      file: fileUrl,
      seenBy: [senderId],
    });

    // Populate sender info for frontend
    await message.populate("senderId", "name avatar");

    // Socket emit to room (better for scalability)
    io.to(`room:${chatRoomId}`).emit("newMessage", message);

    // Also emit to individual sockets for backward compatibility
    const room = await ChatRoomModel.findById(chatRoomId);
    if (room) {
      room.participants.forEach((userId) => {
        if (userId.toString() !== senderId) {
          const socketId = userSocketMap.get(userId.toString());
          if (socketId) {
            io.to(socketId).emit("newMessage", message);
          }
        }
      });
    }

    res.json({ success: true, message });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
