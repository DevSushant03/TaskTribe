import userModel from "../models/user_model.js";
import { uploadToCloudinary, deleteCloudinaryFile } from "./task_controller.js";

export const getUserData = async (req, res) => {
  try {
    const { userid } = req.user;
    const user = await userModel.findById(userid).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const setUserData = async (req, res) => {
  try {
    const { userid } = req.user;

    // Handle FormData properly
    let skills = req.body.skills;
    let bio = req.body.bio;
    let socialLinks = req.body.socialLinks;
    let profilePic = "";

    // Parse skills
    let parsedSkills = [];
    if (skills) {
      if (typeof skills === "string") {
        try {
          parsedSkills = JSON.parse(skills);
        } catch (e) {
          parsedSkills = skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }
      } else if (Array.isArray(skills)) {
        parsedSkills = skills.filter((s) => s && s.trim().length > 0);
      }
    }

    // Parse socialLinks
    let parsedSocialLinks = {};
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        parsedSocialLinks = {};
      }
    }

    // Upload photo
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "ProfilePictures"
      );
      profilePic = result.secure_url;
    }

    // Update user
    const user = await userModel
      .findByIdAndUpdate(
        userid,
        {
          photo: profilePic,
          skills: parsedSkills,
          bio,
          socialLinks: parsedSocialLinks, // Now properly parsed
          isCreatedProfile: true,
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    return res.json({
      success: true,
      message: "Profile Created Successfully",
      userid: user._id,
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userid } = req.user;
    let { skills, bio } = req.body;

    // Parse skills - handle different formats
    let parsedSkills = undefined;
    if (skills !== undefined) {
      if (typeof skills === "string") {
        try {
          // Try to parse as JSON first
          parsedSkills = JSON.parse(skills);
          // Ensure it's an array
          if (!Array.isArray(parsedSkills)) {
            parsedSkills = [parsedSkills];
          }
        } catch (e) {
          // If not JSON, try comma-separated string
          parsedSkills = skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }
      } else if (Array.isArray(skills)) {
        parsedSkills = skills
          .map((s) => String(s).trim())
          .filter((s) => s.length > 0);
      } else {
        parsedSkills = [];
      }
    }

    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (parsedSkills !== undefined) updateData.skills = parsedSkills;

    const user = await userModel
      .findByIdAndUpdate(userid, updateData, { new: true, runValidators: true })
      .select("-password");

    await userModel.findByIdAndUpdate(
      userid,
      {
        $push: {
          notifications: {
            from: null,
            message: "Your profile information has been successfully updated.",
            isRead: false,
            createdAt: new Date(),
          },
        },
      },
      { runValidators: true }
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const editProfilePic = async (req, res) => {
  try {
    const { userid } = req.user;

    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Get current user to delete old photo
    const currentUser = await userModel.findById(userid);
    if (currentUser && currentUser.photo) {
      try {
        await deleteCloudinaryFile(currentUser.photo);
      } catch (error) {
        console.error("Error deleting old photo:", error);
        // Continue even if deletion fails
      }
    }

    // Upload new photo
    const result = await uploadToCloudinary(req.file.buffer, "ProfilePictures");

    const user = await userModel
      .findByIdAndUpdate(
        userid,
        { photo: result.secure_url },
        { new: true, runValidators: true }
      )
      .select("-password");

    await userModel.findByIdAndUpdate(
      userid,
      {
        $push: {
          notifications: {
            from: null,
            message: "Your profile picture has been successfully updated.",
            isRead: false,
            createdAt: new Date(),
          },
        },
      },
      { runValidators: true }
    );

    return res.json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
