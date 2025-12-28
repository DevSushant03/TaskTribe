import bcrypt from "bcryptjs";


export const createAccessToken = (jwt, user, res) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getEmailOtpValidation = (res, user, verificationCode) => {
  if (!user) {
    console.log("User Not Found");

    return res.json({ success: false, message: "User Not Found" });
  }
  if (user.verifyOtp === "" || user.verifyOtp !== verificationCode) {
    return res.json({ success: false, message: "Invalid OTP" });
  }
  if (user.verifyOtpExpireAt < Date.now()) {
    console.log("Otp is expired");
    return res.json({ success: false, message: "Otp is expired" });
  }

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;
  user.save();
};

export const deleteAccessToken = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
};

export const setNewPassword = async (newPassword, bcrypt, user) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newHashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  user.save();
};
