const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config();
console.log('5', new Date());

const connectDB = async () => {
  console.log('6', new Date());

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('7', new Date());

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
  console.log('8', new Date());
};

module.exports = connectDB;
