import {NextFunction, Request, Response} from 'express';
import {Injectable, Logger, NestMiddleware} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private logger = new Logger('HTTP');

  public use(request: Request, response: Response, next: NextFunction): void {
    const {ip, method, originalUrl} = request;
    const userAgent = request.get('user-agent') || '';
    const start = Date.now();

    response.on('finish', () => {
      const ms = Date.now() - start;
      const {statusCode} = response;
      const contentLength = response.get('content-length');
      this.logger.log({message: 'req', path: originalUrl, method, statusCode, contentLength, userAgent, ip, ms});
    });

    next();
  }

}
