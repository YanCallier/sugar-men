const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('authentication-token');

  if (!token) {
    return res.status(401).json({ msg: 'authorisation denied (no token)' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ msg: 'authorisation denied (invalid token)' });
  }
};
