import React, { useState, useContext } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("") // <-- message state
  const [error, setError] = useState("")     // <-- error state
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { firstname, lastname, username, email, password },
        { withCredentials: true }
      )

      // Signup success
      if (result.status === 201) {
        setMessage("Signup successful! You can now login.")
        // Clear form
        setfirstname("")
        setlastname("")
        setusername("")
        setemail("")
        setpassword("")

        // Optional: redirect after 2 sec
        setTimeout(() => navigate("/login"), 2000)
      }
    } catch (err) {
      // Check if server sent error message
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data)
        } else if (err.response.data.message) {
          setError(err.response.data.message)
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Logo */}
      <div className="w-full p-7">
        <img src={logo} alt="logo" className="w-32 md:w-36" />
      </div>

      {/* Signup Card */}
      <form
        onSubmit={handleSignup}
        className="w-[90%] max-w-md bg-white my-10 p-4 rounded-md md:shadow-lg"
      >
        <h2 className="text-xl md:text-2xl text-blue-600 text-center font-bold mb-6">
          Sign Up
        </h2>

        {/* Success / Error Messages */}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* First Name */}
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
          className="border rounded w-full p-1.5 mb-4"
        />

        {/* Last Name */}
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
          className="border rounded w-full p-1.5 mb-4"
        />

        {/* Username */}
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="border rounded w-full p-1.5 mb-4"
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          className="border rounded w-full p-1.5 mb-4"
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="flex border rounded w-full items-center px-2 mb-4">
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="w-full p-1.5 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-blue-600 font-semibold text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-sm">Remember me</label>
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-3xl font-semibold mt-6 hover:bg-blue-700">
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  )
}

export default Signup
