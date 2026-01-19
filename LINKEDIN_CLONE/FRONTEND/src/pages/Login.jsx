import React, { useState, useContext } from "react"
import logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { authDataContext } from "../context/AuthContext"
import Toast from "./Toast"

const Login = () => {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState({ message: "", type: "" })

  const handleLogin = async (e) => {
    e.preventDefault()

    // password validation
    if (password.length < 8) {
      setToast({ message: "Password must be at least 8 characters", type: "error" })
      return
    }

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )

      setToast({ message: "Login successful 🎉", type: "success" })

      setTimeout(() => {
        navigate("/")
      }, 1200)

    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Login failed",
        type: "error"
      })
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <Toast message={toast.message} type={toast.type} />

      <div className="w-full p-7">
        <img src={logo} alt="logo" className="w-32" />
      </div>

      <form
        onSubmit={handleLogin}
        className="w-[90%] max-w-md bg-white p-6 rounded-md shadow-lg"
      >
        <h2 className="text-2xl text-blue-600 text-center font-bold mb-6">
          Sign In
        </h2>

        <label>Email</label>
        <input
          type="email"
          required
          className="border w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="flex border items-center mb-4">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full p-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-full">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
