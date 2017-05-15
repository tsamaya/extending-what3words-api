var winston = require('winston'); // application log file
var level = process.env.LOG_LEVEL || 'info';
// application log file
winston.level = level;

winston.add(winston.transports.File, {
  filename: 'logs/api.log'
});
// winston.remove(winston.transports.Console);
module.exports = winston;
