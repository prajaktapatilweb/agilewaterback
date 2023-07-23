const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const config = require('config');
require('dotenv').config();
const auth = require('../../middleware/auth');
const logger = require('../../services/Logger');
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  console.log('Get request from Auth');
  try {
    const user = await User.findById(req.user.id, {
      Name: 1,
      UserID: 1,
      Avatar: 1,
      Email: 1,
    });
    logger.info('Auth Route - Token Verified and allowed', {
      by: user.UserID,
      for: [0],
      info: {},
    });
    // return res.json({ user: user, PageList: PermissionList });
    return res.json({user: user});
  } catch (err) {
    logger.error(`Catch Block - Auth Route Get User Data ${err}`, {
      by: req.user.id,
      for: [0],
      info: {},
    });
    return res.status(500).json({error: 'Server Error'});
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    console.log('Post request to Auth');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        'Login Attempt Unsuccessful - Email/Password validation Failed',
        {by: req.body.email, for: [0], info: {password: req.body.password}},
      );
      return res.status(400).json({error: errors.array()[0].msg});
    }
    //Code to resolve Brute Force Attack
    const {RateLimiterMongo} = require('rate-limiter-flexible');
    const mongoOpts = {
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 100, // Reconnect every 100ms
    };
    const mongoConn = mongoose.connection;

    const maxWrongAttemptsByIPperDay = 100;
    const maxWrongAttemptsByIPperMinute = 5;
    const maxConsecutiveFailsByUsernameAndIP = 10;
    const maxWrongAttemptsByUsernamePerDay = 50;

    const limiterSlowBruteByIP = new RateLimiterMongo({
      storeClient: mongoConn,
      keyPrefix: 'login_fail_ip_per_day',
      points: maxWrongAttemptsByIPperDay,
      duration: 60 * 60 * 24,
      blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
    });
    const limiterFastBruteByIP = new RateLimiterMongo({
      storeClient: mongoConn,
      keyPrefix: 'login_fail_ip_per_minute',
      points: maxWrongAttemptsByIPperMinute,
      duration: 30,
      blockDuration: 60 * 10, // Block for 10 minutes, if 5 wrong attempts per 30 seconds
    });
    const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterMongo({
      storeClient: mongoConn,
      keyPrefix: 'login_fail_consecutive_username_and_ip',
      points: maxConsecutiveFailsByUsernameAndIP,
      duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
      blockDuration: 60 * 60 * 24 * 365 * 20, // Block for infinity after consecutive fails
    });
    const limiterSlowBruteByUsername = new RateLimiterMongo({
      storeClient: mongoConn,
      keyPrefix: 'login_fail_username_per_day',
      points: maxWrongAttemptsByUsernamePerDay,
      duration: 60 * 60 * 24,
      blockDuration: 60 * 60 * 24 * 365 * 20, // Block for infinity after 100 fails
    });

    const getUsernameIPkey = (username, ip) => `${username}_${ip}`;

    async function loginRoute(req, res) {
      const ipAddr = req.connection.remoteAddress;
      console.log(ipAddr);
      const usernameIPkey = getUsernameIPkey(req.body.email, ipAddr);
      console.log(usernameIPkey);
      // const isDeviceTrusted = checkDeviceWasUsedPreviously(req.body.email, req.cookies.deviceId);
      // console.log(usernameIPkey, isDeviceTrusted)

      const [resUsernameAndIP, resSlowByIP, resSlowUsername, resFastByIP] =
        await Promise.all([
          limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
          limiterSlowBruteByIP.get(ipAddr),
          limiterSlowBruteByUsername.get(req.body.email),
          limiterFastBruteByIP.get(ipAddr),
        ]);
      console.log(resUsernameAndIP, resSlowByIP, resSlowUsername, resFastByIP);
      let retrySecs = 0;

      // Check if IP, Username + IP or Username is already blocked
      if (
        resSlowByIP !== null &&
        resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay
      ) {
        // if (!isDeviceTrusted && resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
      } else if (
        resUsernameAndIP !== null &&
        resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP
      ) {
        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
        // retrySecs = Number.MAX_SAFE_INTEGER;
      } else if (
        resSlowUsername !== null &&
        resSlowUsername.consumedPoints > maxWrongAttemptsByUsernamePerDay
      ) {
        retrySecs = Math.round(resSlowUsername.msBeforeNext / 1000) || 1;
        // retrySecs = Number.MAX_SAFE_INTEGER;
      } else if (
        resFastByIP !== null &&
        resFastByIP.consumedPoints > maxWrongAttemptsByIPperMinute
      ) {
        retrySecs = Math.round(resFastByIP.msBeforeNext / 1000) || 1;
      }
      console.log(retrySecs);
      if (retrySecs > 0) {
        // return res.set('Retry-After', String(retrySecs));
        logger.warn('Login Attempt Unsuccessful from blocked IP Address', {
          by: req.body.email,
          for: [0],
          info: {password: req.body.password, IPAdr: ipAddr},
        });
        return res.status(429).send({error: 'Too Many Requests'});
      } else {
        //Verfiy User login details
        var isMatch = false;
        try {
          const {email, password} = req.body;
          var user = await User.findOne({Status: 'Active', Email: email});
          if (user) {
            isMatch = await bcrypt.compare(password, user.Password);
          }
        } catch (error) {
          logger.error(`Catch Block - Finding user and password ${error}`, {
            by: req.body.email,
            for: [0],
            info: {password: req.body.password, IPAdr: ipAddr},
          });
          return res.status(500).send({error: 'Server error'});
        }

        if (!isMatch) {
          try {
            const limiterPromises = [];
            limiterPromises.push(limiterSlowBruteByIP.consume(ipAddr));
            limiterPromises.push(limiterFastBruteByIP.consume(ipAddr));

            if (user) {
              // Count failed attempts only for registered users
              limiterPromises.push(
                limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey),
              );
              limiterPromises.push(
                limiterSlowBruteByUsername.consume(req.body.email),
              );
            }

            if (limiterPromises.length > 0) {
              await Promise.all(limiterPromises);
            }
            logger.warn(
              'Login Attempt Unsuccessful - Username or Password does not exist',
              {
                by: req.body.email,
                for: [0],
                info: {password: req.body.password, IPAdr: ipAddr},
              },
            );
            return res.status(403).send({error: 'Invalid Credentials'});
          } catch (rlRejected) {
            if (rlRejected instanceof Error) {
              throw rlRejected;
            } else {
              // All available points are consumed from some/all limiters, block request
              logger.error('Catch Block - counting Unsuccessful attempt', {
                by: req.body.email,
                for: [0],
                info: {password: req.body.password, IPAdr: ipAddr},
              });
              return res.status(429).send({error: 'Too Many Requests'});
            }
          }
        }

        // if (user.isLoggedIn) {
        if (isMatch) {
          console.log('successful login');
          console.log(req.body.email, ipAddr, user._id, user.UserID);
          if (
            resUsernameAndIP !== null &&
            resUsernameAndIP.consumedPoints > 0
          ) {
            // Reset only consecutive counter after successful authorisation
            await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
          }
          try {
            const payload = {
              user: {
                id: user.id,
                gid: user.UserID,
                name: user.Name,
              },
            };
            console.log('The Token', payload, process.env.JWTSECRET);
            jwt.sign(
              payload,
              process.env.JWTSECRET,
              // config.get('jwtSecret'),
              {expiresIn: '1 day'},
              (err, token) => {
                console.log('Error', err, 'TTT', token);
                if (err) throw err;
                logger.notify(`Login Succesful by ${user.UserID}`, {
                  Action: 'UserSignIn',
                  ActionTakenBy: user.UserID,
                  NotifyToJobPosition: [0],
                  NotifyToDepartment: [],
                  NotifyToGID: [],
                });
                return res.header('authtoken', token).send({token});
              },
            );
          } catch (err) {
            logger.error(`Catch Block - Token generation ${err}`, {
              by: user.UserID,
              for: [0],
              info: {IPAdr: ipAddr},
            });
            return res.status(500).send({error: 'Server error'});
          }
        }
      }
    }
    try {
      await loginRoute(req, res);
    } catch (err) {
      logger.error(`Catch Block - Login Function  ${err}`, {
        by: req.body.email,
        for: [0],
        info: {IPAdr: req.connection.remoteAddress},
      });
      return res.status(500).end();
    }
  },
);

module.exports = router;
