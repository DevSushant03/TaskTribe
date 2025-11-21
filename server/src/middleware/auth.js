import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyAuth(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.json({ success: false, message: "User not login !" });
  }

  try {
    const DecodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (DecodedToken.id) {
      req.user = { userid: DecodedToken.id };
      next();
    } else {
      return res.json({
        success: false,
        message: "No Authoried user , Login Again !",
      });
    }
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
}
