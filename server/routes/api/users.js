const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult, Result} = require('express-validator');
// const autheticate = require('../../middleware/autheticate');
const auth = require('../../middleware/auth');
// const sendMail = require('../../services/emailConfiguration');
// const normalize = require('normalize-url');
// const authConstantBackend = require('../../authConstants');
const User = require('../../models/User');
// const { userSignupEmailBody } = require('../../EmailBody/userSignupEmailBody');
// const {
//   userTableAuth,
//   notificationTableAuth,
//   notificationSend,
// } = require('../../constants/userRole');
const logger = require('../../services/Logger');
// const uploadController = require('../../middleware/uploadMultipleFiles');
require('dotenv').config();

// router.post(
//   '/',
//   auth,
//   autheticate('Users', 'Create'),
//   [
//     check('name', 'Name is required').not().isEmpty(),
//     check('password', 'Password is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('mobilenumber', 'Mobile Number is required').not().isEmpty(),
//   ],
//   async (req, res) => {
//     console.log('In user post ');
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log({errors});
//       logger.warn('Post request to User Signup - Data is not validated - ', {
//         by: req.user.gid,
//         for: [0],
//         info: {CreatedUser: req.body.email},
//       });
//       return res.status(400).json({error: errors.array()[0].msg});
//     }
//     const {name, email, mobilenumber, password} = req.body;

//     // Password of the user
//     const status = 'Active';
//     const updatedBy = [];
//     let totalNumber = await User.countDocuments();
//     firstLetter = role.split('')[0];
//     let onetoOneID = `${firstLetter}-${totalNumber + 121001}`;
//     try {
//       let user = await User.findOne({email});
//       console.log({user});
//       if (user) {
//         logger.warn(
//           'Post request to User Signup - Same user is already Exist',
//           {by: req.user.gid, for: [0], info: {CreatedUser: email}},
//         );
//         return res.status(400).json({error: 'User already exists'});
//       }
//       // const avatar = normalize(
//       //   gravatar.url(email, {
//       //     s: '200',
//       //     r: 'pg',
//       //     d: 'mm'
//       //   }),
//       //   { forceHttps: true }
//       // );
//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(password, salt);

//       user = new User({
//         UserID,
//         Status,
//         Name,
//         Email,
//         Mobilenumber,
//         hashPassword,
//       });

//       await user
//         .save()
//         .then(() => {
//           //   if (process.env.NODE_ENV !== 'development') {
//           //     const senderemailid = 'Head, HR Department  <hr@1to1guru.com>';
//           //     const receiveremailid = email;
//           //     const subjectofemail = 'Request to complete your profile';
//           //     const userSignupEmailContent = userSignupEmailBody(
//           //       name,
//           //       email,
//           //       mobilenumber,
//           //     );
//           //     sendMail(
//           //       senderemailid,
//           //       receiveremailid,
//           //       subjectofemail,
//           //       userSignupEmailContent,
//           //     )
//           //       .then((result) => {
//           //         const notfnMessage = `New user is created. Name: ${name} & Email:${email} & ID :${onetoOneID}`;
//           //         const notfnByUserName = signby;
//           //         // const notfnByUserEmail = sign.email;
//           //         const notfnisRead = 'false';
//           //         const notfnForUserRole =
//           //           notificationTableAuth.userAdd.notfnForUserRole;
//           //         notificationSend(
//           //           notfnMessage,
//           //           notfnByUserName,
//           //           notfnForUserRole,
//           //         );
//           //         logger.notify(notfnMessage, {
//           //           Action: 'NewUserAdd',
//           //           ActionTakenBy: req.user.gid,
//           //           NotifyToJobPosition: [0, 1, 2],
//           //           NotifyToDepartment: [],
//           //           NotifyToGID: [],
//           //         });
//           //         logger.approve(notfnMessage, {
//           //           Action: 'NewUserAdd',
//           //           ActionOnUser: onetoOneID,
//           //           ActionTakenBy: req.user.gid,
//           //           InformToJobPosition: [0, 1],
//           //           InformToDepartment: [''],
//           //         });
//           //         // logger.notify(notfnMessage, { by: req.user.gid, for: [0, 1, 2], info: { User: onetoOneID } })
//           //         // logger.info(notfnMessage, { by: req.user.gid, for: [0, 1, 2], info: { User: onetoOneID } })
//           //         return res.status(200).send({ Result: notfnMessage });
//           //       })
//           //       .catch((error) => {
//           //         logger.error(
//           //           `Catch Block - User Created But Email not Sent ${error}`,
//           //           { by: req.user.gid, for: [0], info: { User: onetoOneID } },
//           //         );
//           //         return res.json(
//           //           'User created But due to technical error email NOT sent to the user ',
//           //         );
//           //       });
//           //   } else {
//           const notfnMessage = `New user is created. Name: ${name} & Email:${email} & ID :${onetoOneID}`;
//           logger.notify(notfnMessage, {
//             Action: 'NewUserAdd',
//             ActionTakenBy: req.user.gid,
//             NotifyToJobPosition: [0, 1, 2],
//             NotifyToDepartment: [],
//             NotifyToGID: [],
//           });
//           logger.approve(notfnMessage, {
//             Action: 'NewUserAdd',
//             ActionOnUser: onetoOneID,
//             ActionTakenBy: req.user.gid,
//             InformToJobPosition: [0, 1],
//             InformToDepartment: [''],
//           });
//           // logger.notify(notfnMessage, { by: req.user.gid, for: [0, 1, 2], info: { User: onetoOneID } })
//           // logger.info(notfnMessage, { by: req.user.gid, for: [0, 1, 2], info: { User: onetoOneID } })
//           return res.status(200).send({Result: notfnMessage});
//           //   }
//         })
//         .catch((err) => {
//           logger.error(
//             `Catch Block - User Creation and Sending email Block Error ${err}`,
//             {by: req.user.gid, for: [0], info: {}},
//           );
//           console.log({err});
//           return res.status(500).json({error: 'Server Error'});
//         });
//     } catch (err) {
//       logger.error(`Catch Block - User Signup Form ${err}`, {
//         by: req.user.gid,
//         for: [0],
//         info: {},
//       });
//       console.error(err.message);
//       return res.status(500).json({error: 'Server Error'});
//     }
//   },
// );

module.exports = router;
