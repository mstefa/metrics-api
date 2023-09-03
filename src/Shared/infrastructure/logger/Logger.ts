import { createLogger, format, transports } from 'winston';

export class Logger {
  private static WinstonConsoleLogger = createLogger({
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console({ level: 'debug' })]
  });

  static debug(message: string) {
    this.WinstonConsoleLogger.log('debug', message);
  }

  static info(message: string) {
    this.WinstonConsoleLogger.log('info', message);
  }

  static warn(message: string) {
    this.WinstonConsoleLogger.log('warn', message);
  }

  static error(error: Error | unknown) {
    if (error instanceof Error) {
      this.WinstonConsoleLogger.error(`${error?.message} :  ${error.stack} `);

      return;
    }
    this.WinstonConsoleLogger.error(error);
  }
}
