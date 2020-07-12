const jwt = require('jsonwebtoken');
require('dotenv').config();

// middlware function
function admin(req, res, next) {
// to fetch the token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Authorization Denied!', status: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    // TAKE USER FROM THE TOKEN; checl if the role is admin then proceed
    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return res
        .status(401)
        .json({ message: 'Not authorized to view this resource. Only Admin can access this route', status: false });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Token not valid' });
  }
}

module.exports = admin;
