const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

const signUp = async (req, res, next) => {
  console.log('auth controller signup');
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    // res.status(201).json({ success: true, user });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
}

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorResponse("Please provide valid email and password", 400));
    // res.status(400).json({ success: false, error: "Please provide valid email and password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password"); //confirm using select

    if(!user) return next(new ErrorResponse("Invalid credentials", 401));
    // if(!user) res.status(404).json({ success: false, error: "Invalid credentials" });

    const isMatch = await user.matchPasswords(password);

    if(!isMatch) return next(new ErrorResponse("Invalid credentials", 401));
    // if(!isMatch) res.status(404).json({ success: false, error: "Invalid credentials" });

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