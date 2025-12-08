import userModel from "../models/user_model.js";
import { uploadToCloudinary } from "./task_controller.js";

export const getUserData = async (req, res) => {
  try {
    const { userid } = req.user;
    const user = await userModel.findById(userid);

    return res.json({ success: true, message: user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const setUserData = async (req, res) => {
  try {
    const { userid } = req.user;
    const { skills, bio } = req.body;
    let profilePic = "";
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "ProfilePictures"
      );
      profilePic = result.secure_url;
    }
    const user = await userModel.findByIdAndUpdate(
      userid,
      { photo: profilePic, skills, bio, isCreatedProfile: true },
      { new: true, runValidators: true }
    );
    return res.json({
      success: true,
      message: "Profile Created Succesfully",
      userid,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
