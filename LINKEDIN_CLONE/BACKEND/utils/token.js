import jwt from "jsonwebtoken";

const gentoken = (userid) => {
  try {
    const token = jwt.sign(
      { id: userid },
      process.env.JWT_SECRET, // make sure .env me JWT_SECRET same hai
      { expiresIn: "7d" }
    );
    return token;
  } catch (err) {
    console.error("Token generation error:", err);
 
  }
};

export default gentoken;
