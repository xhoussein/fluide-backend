const winston = require('winston');
const config = require('./config');
const path = require("path")

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: path.join(__dirname, `../logs/${new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate() + '-'}error.log`),
      level: 'info'
    })
  ],
});

module.exports = logger;
