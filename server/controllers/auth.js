import User from '../models/user.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const signUp = async (req, res, next) => {
  console.log("AuthController signUp");
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    // What if user fails to create? No token should be sent. What is returned from a failed User.create?
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
}

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorResponse("Please provide valid email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password"); //confirm using select
    if(!user) return next(new ErrorResponse("Invalid credentials", 401));

    const isMatch = await user.matchPasswords(password);
    if(!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user) return next(new ErrorResponse('Email address not found', 404));

    console.log("user email", user.email);
    const resetToken = user.generateResetPasswordToken();

    await user.save();

    // 3000 is possibly temp. It represents the port where the front end is taking requests. resetpassword route may also be incorrect as vid said passwordrest, but I think it's incorrect
    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `
      <h1>Password reset requested</h1>
      <p>A password reset request was submitted, for this email address, to Eradicator.
      We have found your email address on file and you may reset your password by following the link below</p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
      <p>If you didn't make this request, feel free to ignore it.</p>
    `
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: message
      })

      res.status(200).json({ success: true, data: 'Password Reset email sent' })
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
}

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) return next(new ErrorResponse("Invalid Reset Token", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.generateAuthToken();
  res.status(statusCode).json({ success: true, token });
}

export { signUp, signIn, forgotPassword, resetPassword };