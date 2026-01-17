import mongoose from "mongoose";

// User Schema
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true, // First name is mandatory
    },
    lastname: {
      type: String,
      required: true, // Last name is mandatory
    },
    username: {
      type: String,
      required: true, // Username is mandatory
      unique: true,   // Must be unique for each user
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true,   // Must be unique for each user
    },
    password: {
      type: String,
      required: true, // Password is mandatory
    },
    profileImage: {
      type: String,
      default: "", // Default profile picture (can be empty)
    },
    coverImage: {
      type: String,
      default: "", // Default cover image (can be empty)
    },
    headline: {
      type: String,
      default: "", // Short description or headline about the user
    },
    skills: [
      {
        type: String, // Array of skills as strings
      },
    ],
    education: [
      {
        college: { type: String },      // College name
        degree: { type: String },       // Degree obtained
        fieldOfStudy: { type: String }, // Field of study
      },
    ],
    location: {
      type: String, // User's location
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Only accepts these three values
    },
    experience: [
      {
        title: { type: String },       // Job title
        company: { type: String },     // Company name
        description: { type: String }, // Job description/responsibilities
      },
    ],
    connection: [
      {
        type: mongoose.Schema.Types.ObjectId, // Stores ID of another user
        ref: "User",                          // References the 'User' collection
        // This allows us to store friends/connections and populate full user info later
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create User model
const userModel = mongoose.model("User", userSchema);

export default userModel;
