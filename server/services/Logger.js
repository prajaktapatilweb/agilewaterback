const {createLogger, transports, format} = require('winston');
const {combine, timestamp, label, printf, json, errors} = format;
require('dotenv').config();
require('winston-mongodb');

const myFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
// logger.approve(
//     'Detailed Text Which action has done',
//     {
//         Action: 'Action Title in short ( This will be used to further task to performed',
//         ActionOnUser: 'User on which action has done. ( This same will be used for further action so unique id to be given)',
//         ActionTakenBy: 'Who did the action only for info',
//         InformToJobPosition: 'Whome to send this for approval',
//         InformToDepartment: 'Which departments approval is required',
//     })

// logger.notify(
//     'Detailed Text what notification to be given ',
//     {
//         Action: 'Action Title in short ( This will be used to further task to performed',
//         ActionTakenBy: 'Who did the action only for info',
//         NotifyToJobPosition: 'Notify to all at this posistion 0-Admin, 1 - CEO,2=Incharge and so on ',
//         NotifyToDepartment: 'Notify to all memeber of this department ',
//         NotifyToGID: 'If wish to notify particular user then use this. Mostly use to notify himself so he can understand what he has done',
//     })
// logger.notify('', { Action: '', ActionTakenBy: '', NotifyToJobPosition: [0, 1], NotifyToDepartment: [], NotifyToGID: [], })

const myCustomLevels = {
  levels: {
    approve: 0,
    notify: 1,
    warn: 2,
    error: 3,
    info: 4,
  },
  colors: {
    approve: 'blue',
    notify: 'green',
    info: 'yellow',
    warn: 'orange',
    error: 'red',
  },
};
const logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    // label({ label: 'right meow!' }),
    // timestamp(),
    json(),
    // myFormat,
    format.metadata(),
    errors({stack: true}),
  ),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'approve',
      db: process.env.MONGODB_URI,
      options: {useUnifiedTopology: true},
      collection: 'approvals',
      // meta: { service: 'user-service' },
      format: myFormat,
    }),
    new transports.MongoDB({
      level: 'notify',
      db: process.env.MONGODB_URI,
      options: {useUnifiedTopology: true},
      collection: 'notifies',
      // meta: { service: 'user-service' },
      format: myFormat,
    }),
    new transports.MongoDB({
      level: 'info',
      db: process.env.MONGODB_URI,
      options: {useUnifiedTopology: true},
      collection: 'logs',
      // meta: { service: 'user-service' },
      format: myFormat,
    }),
  ],
});

module.exports = logger;
