import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check header first
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "secretkeyofnoteapp123@#");

    const user = await User.findById(decoded.id); // ✅ FIXED (no object)

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = { name: user.name, id: user._id };

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

export default middleware;