// packages/shared/logger.ts
import winston, { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, json, colorize, errors } = format;
const LOG_DIR = process.env.LOG_DIR || 'logs';
const isDev = process.env.NODE_ENV !== 'production';

// 1) Define your colors once
winston.addColors({
    error:   'red',
    warn:    'yellow',
    info:    'green',
    http:    'magenta',
    debug:   'blue',
    silly:   'gray',
  });

// 2) Single, shared Winston instance
export const baseLogger = createLogger({
  level: isDev ? 'debug' : 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    // pick between a pretty‐print for dev or JSON for prod
    isDev
      ? combine(
          colorize({ all: true }),
          printf((info) => {
            // if you passed { module: 'foo' } into child(), it'll show up here
            const prefix = info.module ? `[${info.module}] ` : '';
            if (info.stack) {
              return `${info.timestamp} ${prefix}${info.level}: ${info.message}\n${info.stack}`;
            }
            return `${info.timestamp} ${prefix}${info.level}: ${info.message}`;
          })
        )
      : combine(
          json(),
          printf((info) => {
            const prefix = info.module ? `[${info.module}] ` : '';
            if (info.stack) {
              return `${info.timestamp} ${prefix}${info.level}: ${info.message}\n${info.stack}`;
            }
            return `${info.timestamp} ${prefix}${info.level}: ${info.message}`;
          })
        )
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      level: 'info',
      filename: `${LOG_DIR}/app-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d',
      zippedArchive: true,
    }),
    new DailyRotateFile({
      level: 'error',
      filename: `${LOG_DIR}/error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${LOG_DIR}/exceptions.log` }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${LOG_DIR}/rejections.log` }),
  ],
});