import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Логирование в консоль
    new transports.File({ filename: 'logs/app.log' }) // Логирование в файл
  ]
});

// Поток для Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

export default logger;