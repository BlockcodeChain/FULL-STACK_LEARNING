import React from "react"

const Toast = ({ message, type }) => {
  if (!message) return null

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  )
}

export default Toast
