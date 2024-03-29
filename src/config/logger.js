import winston from 'winston';
import S3Transport from './s3Transport.js';

const bucketName = 'cyclic-gifted-worm-umbrella-ap-southeast-2';
const logFileName = 'logs/my_application_log.log';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new S3Transport({
      bucketName: bucketName,
      logFileName: logFileName
    })
  ]
});

export default logger;
