import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';

const signUp = async (req, res, next) => {
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
    const user = User.findOne(email);
    if(!user) return next(new ErrorResponse('Email address not found', 404));

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    // 3000 is possibly temp. It represents the port where the front end is taking requests. resetpassword may als be incorrect as vid said passwordrest, but I think it's incorrect
    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `
      <h1>Password reset requested</h1>
      <p>A password reset request was submitted, for this email address, to Eradicator.
      We have found your email address on file and you may reset your password by following the link below</p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
      <p>If you didn't make this request, feel free to ignore it.</p>
    `
    try {
      
    } catch (error) {
      
    }
  } catch (error) {
    
  }
}

const resetPassword = (req, res, next) => {
  res.send(`auth.resetPassword`);
}

const sendToken = (user, statusCode, res) => {
  const token = user.generateAuthToken();
  res.status(statusCode).json({ success: true, token });
}

export { signUp, signIn, forgotPassword, resetPassword };