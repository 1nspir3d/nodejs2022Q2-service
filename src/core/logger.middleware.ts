import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService(LoggerService.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.once('finish', async () => {
      const { url, query, body, method } = req;
      const { statusCode, statusMessage } = res;
      const message = `${method} ${url} ${statusCode} ${statusMessage} - body: ${JSON.stringify(
        body,
      )}, query: ${JSON.stringify(query)}`;

      if (statusCode >= 500) {
        return this.logger.error(message, LoggerMiddleware.name);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message, LoggerMiddleware.name);
      }

      this.logger.log(message, LoggerMiddleware.name);
    });
    next();
  }
}
