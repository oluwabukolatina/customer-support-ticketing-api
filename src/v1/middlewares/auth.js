const jwt = require('jsonwebtoken');
require('dotenv').config();

// middlware function
function auth(req, res, next) {
// to fetch the token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Authorization Denied!', status: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    // TAKE USER FROM THE TOKEN
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token not valid' });
  }

  // verify the token
}

module.exports = auth;
