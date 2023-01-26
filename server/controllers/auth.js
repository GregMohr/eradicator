const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

const signUp = async (req, res, next) => {
  console.log('auth controller signup');
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

const forgotPassword = (req, res, next) => {
  res.send(`auth.forgotPassword`);
}

const resetPassword = (req, res, next) => {
  res.send(`auth.resetPassword`);
}

const sendToken = (user, statusCode, res) => {
  const token = user.generateAuthToken();
  res.status(statusCode).json({ success: true, token });
}

module.exports = { signUp, signIn, forgotPassword, resetPassword };