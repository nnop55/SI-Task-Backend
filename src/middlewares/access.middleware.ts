import { NextFunction, Request, Response } from 'express';
import { accessUrl } from '../shared/config';
import CustomError from '../utils/errors/customError';

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    const isDevMode = process.env.NODE_ENV === 'development';
    const isPostmanRequest = req.header('user-agent') && req.header('user-agent')!.includes('Postman');
    const isLocalhostRequest = req.headers.origin && req.headers.origin.includes('http://localhost:');
    const isWebsiteRequest = req.headers.origin && req.headers.origin === accessUrl;

    if (isDevMode && (isPostmanRequest || isLocalhostRequest)) {
        return next();
    }

    if (!isDevMode && isWebsiteRequest) {
        return next();
    }

    throw new CustomError(403, 'Forbidden')
}