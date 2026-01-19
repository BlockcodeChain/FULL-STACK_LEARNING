import { ErrorHandler } from '../middleware/error.middleware.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import User from '../model/user.model.js';

export const register = catchAsyncError(async (req, res, next) => {
  const { fullname, email, password, phone, verificationCode } = req.body;

  if (!fullname || !email || !password || !phone || !verificationCode) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Phone validation
  function validatePhoneNumber(phone) {
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid Phone Number", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [
      { email, accountVerified: true },
      { phone, accountVerified: true }
    ]
  });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  
});
