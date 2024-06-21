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
    return await tokenCheck(req, next, 'accessToken', JWTSecretKey)
};

export const verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return await tokenCheck(req, next, 'refreshToken', JWTRefreshTokenSecretKey)
};

const tokenCheck = async (
    req: Request,
    next: NextFunction,
    tokenCol: string,
    secretKey: string | undefined
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError())
    }

    try {
        const decoded = verifyJwt(token, secretKey!);
        const instance = await getUserByColumn('id', (decoded as any).id);

        if (!instance || !decoded) {
            throw new UnauthorizedError()
        }

        (req as any).user = instance;

        return next()
    } catch (err) {
        await updateUserAccessToken(tokenCol, token, tokenCol, null)
        next(new UnauthorizedError('Invalid Token'))
    }
}