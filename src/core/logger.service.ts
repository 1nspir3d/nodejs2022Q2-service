import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { LogLevels } from 'src/types';
import { EOL } from 'os';

export class LoggerService extends ConsoleLogger {
  private logsLevel = parseInt(process.env.LOG_LVL);

  log(message: any, context?: string): void {
    if (this.logsLevel >= LogLevels.log) {
      super.log(message, context);
      this.saveLogs(message);
    }
  }

  error(message: any, ...optionalParams: any[]): void {
    if (this.logsLevel >= LogLevels.error) {
      super.error(message);
      this.saveLogs(message);
    }
  }

  warn(message: any, ...optionalParams: any[]): void {
    if (this.logsLevel >= LogLevels.warn) {
      super.warn(message);
      this.saveLogs(message);
    }
  }

  debug(message: any, ...optionalParams: any[]): void {
    if (this.logsLevel >= LogLevels.debug) {
      super.debug(message);
      this.saveLogs(message);
    }
  }

  verbose(message: any, ...optionalParams: any[]): void {
    if (this.logsLevel >= LogLevels.verbose) {
      super.verbose(message);
      this.saveLogs(message);
    }
  }
  saveLogs(message: any) {
    const logsDir = join(process.cwd(), 'logs');
    const newLogFile = `api - ${new Date().toDateString()} - ${new Date()
      .toTimeString()
      .split(' ')[0]
      .replaceAll(':', '-')}.log`;
    const files = fs.readdirSync(logsDir);

    if (files.length === 0) {
      return fs.appendFileSync(join(logsDir, newLogFile), this.format(message));
    }

    for (let i = 0; i < files.length; i++) {
      const stats = fs.statSync(join(logsDir, files[i]));
      if (stats.size / 1000 < parseInt(process.env.LOG_FILE_SIZE)) {
        return fs.appendFileSync(join(logsDir, files[i]), this.format(message));
      }
    }
    return fs.appendFileSync(join(logsDir, newLogFile), this.format(message));
  }

  format(message: any) {
    if (message === 'Starting Nest application...') {
      return `${EOL}[${new Date().toLocaleString()}] - ${message} ${EOL}`;
    }
    return `[${new Date().toLocaleString()}] - ${message} ${EOL}`;
  }
}
