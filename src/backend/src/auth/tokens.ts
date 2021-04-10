import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jwtpayload } from './index';

export function genAccessToken(payload: jwtpayload, expiry: string = '30m') {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET! as jwt.Secret, {
        expiresIn: expiry,
    });
}

export function genRefreshToken(
    payload: jwtpayload,
    expiry: string = '30 days'
) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET! as jwt.Secret, {
        expiresIn: expiry,
    });
}

export function sendRefreshToken(res: Response, refreshToken: any) {
    res.cookie('rid', refreshToken, {
        httpOnly: true,
        // path: '/refresh_token'
    });
}

export const verifyToken = (req: Request, res: Response, next: any) => {
    try {
        const auth = req.headers['authorization'] as String;
        if (!auth.split(' ')[1]) {
            throw new Error('please login first! (Not Authenticated)');
        }
        const payload: jwtpayload = jwt.verify(
            auth.split(' ')[1],
            process.env.ACCESS_TOKEN_SECRET as jwt.Secret
        ) as jwtpayload;
        res.locals.payload = payload;
        return next();
    } catch (err) {
        return res.send({ error: true, message: err.message });
    }
};
