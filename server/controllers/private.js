export const getPrivateData = (req, res, next) => {
  res.status(200).json({success: true, message: 'You have access to this protected route'});
}