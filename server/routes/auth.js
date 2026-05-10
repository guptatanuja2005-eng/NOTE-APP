import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js'

const router = express.Router()

// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashPassword
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Account created successfully"
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in registration"
    });
  }
});


// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      "secretkeyofnoteapp123@#",
      { expiresIn: "5h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        id: user._id
      },
      message: "Login successful"
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in login"
    });
  }
});


// ✅ VERIFY (FIXED 🔥)
router.get('/verify', middleware, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
});


export default router;