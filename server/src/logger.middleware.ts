import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method } = req;
    // const start = Date.now();
    console.log(`${originalUrl}----${method}`);
    next();
  }
}
