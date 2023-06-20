import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config/env';

const dir = path.resolve('logs');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = config.NODE_ENV === 'development' ? 'debug' : 'warn';

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filename: dir + '/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  handleExceptions: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  )
});

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
      )
    }),
    dailyRotateFile
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false
});
