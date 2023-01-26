const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

// Verify token/access
exports.protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) return next(new ErrorResponse('Not authorized for this route', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(decoded._id);

    if(!user) return next(new ErrorResponse('User not found', 404));
    req.user = user;
    next();

  } catch (error) {
    return next(new ErrorResponse('Not authorized for this route', 401));
  }
}