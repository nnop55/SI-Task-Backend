import { NextFunction, Request, Response } from 'express';
import { JWTRefreshTokenSecretKey, JWTSecretKey } from '../shared/config';
import { verifyJwt } from '../utils/auth';
import { getUserByColumn, updateUserAccessToken } from '../modules/auth/auth.service';
import UnauthorizedError from '../utils/errors/unauthorizedError';

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError())
    }

    try {
        const decoded = verifyJwt(token, JWTSecretKey!);

        const instance = await getUserByColumn('_id', (decoded as any).id);

        if (!decoded || !instance) {
            throw new UnauthorizedError()
        }

        (req as any).user = instance;

        return next()
    } catch (err) {
        //await updateUserAccessToken('accessToken', token, 'accessToken', null)
        next(new UnauthorizedError('Invalid Token'))
    }
};

export const verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return next(new UnauthorizedError())
    }

    try {
        const decoded = verifyJwt(refreshToken, JWTRefreshTokenSecretKey!);

        const instance = await getUserByColumn('_id', (decoded as any).id);

        if (!decoded || !instance) {
            throw new UnauthorizedError()
        }

        (req as any).user = instance;

        return next()
    } catch (err) {
        //await updateUserAccessToken('refreshToken', refreshToken, 'refreshToken', null)
        next(new UnauthorizedError('Invalid Token'))
    }
};

