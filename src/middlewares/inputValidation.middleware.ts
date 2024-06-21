
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { DtoTypes } from '../utils/enum';
import ValidationError from '../utils/errors/validationError';

export const inputValidationMiddleware = (
    dtoClass: DtoTypes
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        const dtoInstance = new dtoClass()
        Object.assign(dtoInstance, req.body);

        const errors = await validate(dtoInstance)

        if (errors.length > 0) {
            const errorMessage =
                errors.map(error => Object.values(error.constraints!)).join(', ');

            next(new ValidationError(errorMessage))
        }
        next();
    };
}
