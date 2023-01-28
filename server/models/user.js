import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const emailRegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/); // Email format: 

// time created, user permissions level, pass min length?
// confirm using email.unique and password.select
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please provide your first name"] },
  lastName: { type: String, required: [true, "Please provide your last name"] },
  email: { type: String, required: [true, "Please provide an email address"], unique: true, match: [emailRegExp, "Please provide a valid email address"] },
  password: { type: String, required: [true, "Please provide your password"], minLength: 8, select: false },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

userSchema.pre('save', async function(next){
  if(!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
}

userSchema.methods.generateResetPasswordToken = function() {
  console.log("generateResetPasswordToken")
}
// userSchema.methods.generateResetPasswordToken = function() {
//   const resetToken = crypto.randomBytes(20).toString('hex');

//   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // First number is minutes

//   return resetToken;
// }

const User = mongoose.model('user', userSchema);

export default User;