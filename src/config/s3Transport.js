import AWS from 'aws-sdk';
import TransportStream from 'winston-transport';
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  })
});

class S3Transport extends TransportStream {
  constructor(opts) {
    super(opts);
    this.s3 = new AWS.S3();
    this.bucketName = process.env.S3_BUCKET_NAME || opts.bucketName;
    this.logFileName = process.env.LOG_FILE_NAME || opts.logFileName;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const message = `${info.timestamp} [${info.level}]: ${info.message}\n`;

    this.s3.putObject({
      Bucket: this.bucketName,
      Key: this.logFileName,
      Body: message,
      ContentType: 'text/plain'
    }, (err, data) => {
      if (err) {
        console.error('Error writing log to S3', err);
      }
      if (callback) {
        callback();
      }
    });
  }
}

export default S3Transport;
