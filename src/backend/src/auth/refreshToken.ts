import express, { Request, Response } from 'express';
import User from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { userTokenPayload } from './tokens';
import { genRefreshToken, genAccessToken, sendRefreshToken } from './tokens';

const app = express.Router();

/**
 * @route           POST /refresh_token
 * @description     Refresh token to check for cookie and update the token in cookie as well as in database.
 * @access          Public
 */
app.post('/', async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.rid;
        if (!token) {
            throw new Error('Please login first!');
        }
        const payload: userTokenPayload = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as jwt.Secret
        ) as userTokenPayload;
        const user = await User.findOne({
            email: payload.email,
        });
        if (!user) {
            throw new Error('Please login first! (user not in db)');
        }
        const pload: userTokenPayload = {
            email: payload.email,
        } as userTokenPayload;

        sendRefreshToken(res, genRefreshToken(pload));
        res.send({
            email: payload.email,
            token: genAccessToken(pload),
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
