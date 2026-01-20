import nodemailer from 'nodemailer'

const verifyemail= async(token,email,username)=>{
    try{
  const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
  })
  // 2️⃣ Create HTML email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color:#333;">
        <h2 style="color:#4CAF50;">Welcome, ${username}!</h2>
        <p>Thanks for signing up. Please verify your email by clicking the button below:</p>
        <a href="http://localhost:8000/api/auth/verify/${token}" 
           style="display:inline-block; padding:10px 20px; color:#fff; background:#4CAF50; text-decoration:none; border-radius:5px;">
           Verify Email
        </a>
        <p>If you did not create an account, please ignore this email.</p>
      </div>
    `;
  const mailconfiguration={
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Email Verification",
    html:htmlContent
  }
   await transporter.sendMail(mailconfiguration);
    console.log("Email sent successfully ✅");
    
   }
    
    catch(err){
  console.error('Error sending verification email:', err.message);
    }
}
export default verifyemail