import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFileSync } from 'fs';
import { join } from 'path';
import { EOL } from 'os';
import { LoggerService } from './logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggerService(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus;
    let errorResponse: Record<string, unknown>;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = {
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: request.url,
      };
      if (typeof exception.getResponse() === 'object') {
        errorResponse = {
          ...errorResponse,
          ...(exception.getResponse() as object),
        };
      } else {
        errorResponse.error = exception.getResponse();
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        message: 'Internal Server Error',
        timeStamp: new Date().toISOString(),
        path: request.url,
      };
    }

    const errorLog = `Response Code: ${status} - Method: ${
      request.method
    } - URL: ${request.url}${EOL}${EOL}${JSON.stringify(
      errorResponse,
    )}${EOL}${EOL}`;

    this.logger.error(errorLog);

    appendFileSync(
      join(process.cwd(), 'logs', 'error.log'),
      `[${new Date().toLocaleString()}] - ${errorLog}`,
      'utf8',
    );

    response.status(status).json(errorResponse);
  }
}
