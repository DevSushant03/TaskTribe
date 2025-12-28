import bcrypt from "bcryptjs";

export const getOtpEmailHtml = (otp) => `
  <div style="background-color:#f4f6f8;padding:30px;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:30px;">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0;color:#222;">OTP Verification</h2>
              </td>
            </tr>

            <tr>
              <td style="color:#555;font-size:15px;padding-bottom:15px;">
                Hello,
                <br /><br />
                Use the following One-Time Password (OTP) to complete your verification.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="font-size:32px;letter-spacing:6px;font-weight:bold;color:#ff7a18;">
                  ${otp}
                </div>
              </td>
            </tr>

            <tr>
              <td style="color:#555;font-size:14px;padding-bottom:10px;">
                This OTP is valid for <strong>5 minutes</strong>.
              </td>
            </tr>

            <tr>
              <td style="color:#999;font-size:13px;">
                If you didn’t request this, please ignore this email.
              </td>
            </tr>

            <tr>
              <td style="padding-top:25px;border-top:1px solid #eee;color:#777;font-size:12px;" align="center">
                © ${new Date().getFullYear()} TaskTribe. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`;


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
