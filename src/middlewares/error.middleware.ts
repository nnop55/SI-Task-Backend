import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/errors/customError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    let status = 500;
    let message = 'Internal Server Error';

    if (err instanceof SyntaxError &&
        (err as CustomError).status === 400 &&
        'body' in err) {
        status = 400;
        message = 'Bad Request';
    } else if (err instanceof CustomError) {
        status = err.status;
        message = err.message;
    }

    res.status(status).json({
        error: message
    });
}

