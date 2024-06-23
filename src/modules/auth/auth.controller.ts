import { Request, Response } from 'express';
import { comparePasswords, getJwt } from '../../utils/auth';
import { getUserByColumn, insertUser, updateUserAccessToken } from './auth.service';
import { JWTRefreshTokenSecretKey, JWTSecretKey } from '../../shared/config';
import ValidationError from '../../utils/errors/validationError';

class AuthController {

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await getUserByColumn('username', username);
        const isMatch = comparePasswords(password, user.password)

        if (!isMatch) {
            throw new ValidationError('Invalid password')
        }

        const accessToken = getJwt(
            { id: user.id, username: user.username },
            JWTSecretKey
        );
        const refreshToken = getJwt(
            { id: user.id, username: user.username },
            JWTRefreshTokenSecretKey,
            '17s'
        );
        await updateUserAccessToken('username', username, 'accessToken', accessToken)
        await updateUserAccessToken('username', username, 'refreshToken', refreshToken)
        res.status(200).json({ code: 1, data: { accessToken, refreshToken } });
    }

    public async refreshToken(req: Request, res: Response) {
        const { id, username } = (req as any).user;

        const accessToken = getJwt(
            { id, username },
            JWTSecretKey
        );

        await updateUserAccessToken('_id', id, 'accessToken', accessToken)
        res.status(200).json({ code: 1, data: { accessToken } });
    }

    public async register(req: Request, res: Response) {
        const newUser = await insertUser(req.body)
        res.status(201).json({ code: 1, data: newUser });
    }

    public async logout(req: Request, res: Response) {
        const { id } = (req as any).user;
        await updateUserAccessToken('_id', id, 'accessToken', null)
        await updateUserAccessToken('_id', id, 'refreshToken', null)
        res.send({ code: 1, data: null });
    }
}

export default new AuthController()