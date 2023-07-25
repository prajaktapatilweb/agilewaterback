const express = require('express');
const next = require('next');
const cors = require('cors');
const connectDB = require('./server/Database/MongoDB');
require('dotenv').config();
const helmet = require('helmet');

// For production
// const dev = process.env.NODE_ENV === 'production';
// For Development
const dev = process.env.NODE_ENV !== 'production';
const appn = next({dev});
const handle = appn.getRequestHandler();
const PORT = process.env.PORT || 4000;

connectDB();
const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

// Preventing DOS Attacks: Limiting inflow data to our server (ref:https://blog.logicwind.com/backend-security-in-nodejs/)
app.use(express.json({limit: '10kb'})); // Body limit is 10
// Preventing DOS Attacks: Specifying calls a user can make in specified time duration
// const rateLimit = require('express-rate-limit')
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// Preventing XSS Attacks: Data sanitization against XSS
//Not used because not found correct dependancy.

// Preventing XSS Attacks:Setting special HTTP headers for project
app.use(helmet());

// Apply the rate limiting middleware to all requests
// app.use(limiter)
// Define Route
app.use('/api/studentdata', require('./server/routes/api/googleSheetCourse'));
app.use('/api/courses', require('./server/routes/api/courses'));
app.use('/api/auth', require('./server/routes/api/auth'));

app.get('/', (req, res) => {
  res.header('Content-type', 'text/html');
  return res.end('<h1>I said "Oh my!" What a marvelous tune!!!</h1>');
 });
 app.listen(PORT, (err) => {
  if (err) {
    console.log({err});
  }
  console.log(`Server started on port ${PORT}`);
});
// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next(); 
//   });

app.get('*', (req, res) => {
  return handle(req, res);
});
