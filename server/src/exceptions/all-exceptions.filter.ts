import {BaseExceptionFilter} from '@nestjs/core';
import {ArgumentsHost, Catch, HttpException, Logger} from '@nestjs/common';
import {BaseException} from './base.exeption';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  private logger = new Logger('AllExceptionsFilter');

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();


    if (exception instanceof BaseException) {
      this.logger.error(exception.serverMsg, exception.stack);

      return response.status(500).json({
        statusCode: 500,
        type: exception.type,
        message: exception.clientMsg,
      });
    }

    if (exception instanceof HttpException) {
      this.logger.error(exception.message, exception.stack);

      return response.status(500).json({
        statusCode: 500,
        type: exception.constructor.name,
      });
    }

    this.logger.error(exception);
    super.catch(exception, host);
  }

}
