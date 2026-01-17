import express from "express"
import { signup, login, logout } from "../controller/user.controller.js"
import loginValidator from "../middleware/login.middleware.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", loginValidator, login)
router.post("/logout", authMiddleware, logout)

export default router
