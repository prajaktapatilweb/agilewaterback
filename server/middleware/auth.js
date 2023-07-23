const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('../services/Logger');
// const config = require('config');

module.exports = function (req, res, next) {
  console.log('Auth Middleware');
  // Get token from header
  // const token1 = req.headers.authtoken;
  const token = req.headers.authorization;
  // Check if not token
  if (!token) {
    logger.warn('Token Not Available', {
      by: req.connection.remoteAddress,
      for: [0],
      info: {url: req.baseUrl},
    });
    return res.status(401).json({msg: 'No token, authorization denied'});
  }
  // Verify token
  try {
    // jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
      if (error) {
        logger.warn('Token Broken', {
          by: req.connection.remoteAddress,
          for: error,
          info: {url: req.baseUrl},
        });
        return res.status(401).json({msg: 'Token is not valid'});
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    logger.error('Catch Block - Token authentication', {
      by: req.connection.remoteAddress,
      for: [0],
      info: {},
    });
    console.error('something wrong with auth middleware');
    return res.status(500).json({msg: 'Server Error'});
  }
};
