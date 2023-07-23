const express = require('express');
const bcrypt = require('bcryptjs');
const connectDB = require('./Database/MongoDB');
const User = require('./models/User');

connectDB();
async function firstuser() {
  const Name = 'Administrator';
  const Email = 'prajaktaweb@gmail.com';
  const Mobilenumber = 9860313171;
  console.log('Starting');
  let totalNumber = await User.countDocuments();
  // const LastUser = await User.find().limit(1).sort({ onetoOneID: -1 });
  UserID = `AW-${totalNumber + 111}`;
  console.log({totalNumber});
  // const UserID = 'AW-10001'
  const password = 'Agile@AW20**';
  const salt = await bcrypt.genSalt(10);
  const Password = await bcrypt.hash(password, salt);
  user = new User({
    UserID,
    Name,
    Email,
    Mobilenumber,
    Password,
  });

  console.log({user});

  await user
    .save()
    .then(() => {
      console.log('Login Created');
    })
    .catch((err) => {
      console.log({err});
    });
}
firstuser();
