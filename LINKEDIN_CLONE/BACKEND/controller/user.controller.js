import bcrypt from "bcryptjs"
import User from "../model/user.model.js"
import gentoken from "../utils/token.js"
import {sendEmail} from "../utils/sendEmail.js"


/* ===================== SIGNUP ===================== */
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body

    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      })
    }

    const existEmail = await User.findOne({ email })
    if (existEmail) {
      return res.status(400).json({
        message: "Email already exists, please login"
      })
    }

    const existUsername = await User.findOne({ username })
    if (existUsername) {
      return res.status(400).json({
        message: "Username already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword
    })

    const token = gentoken(newUser._id)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    return res.status(201).json({
      message: "Signup successful 🎉",
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (err) {
    console.error("SIGNUP ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const matched = await bcrypt.compare(password, user.password)
    if (!matched) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const token = gentoken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })
     await sendEmail(
      user.email,
      "Login Successful 🎉",
      `Hi ${user.firstname},

You have successfully logged in to your account.

If this wasn't you, please secure your account immediately.

— LinkedIn Clone Team`
    )
    return res.status(200).json({
      message: "Login successful 🎉",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email
      }
    })
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}

/* ===================== LOGOUT ===================== */
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    return res.status(200).json({
      message: "Logout successful"
    })
  } catch (err) {
    console.error("LOGOUT ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}
