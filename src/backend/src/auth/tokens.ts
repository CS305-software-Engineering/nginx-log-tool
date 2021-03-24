import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { jwtpayload } from '../auth/index';

export function genAccessToken(payload: jwtpayload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET! as jwt.Secret, {
        expiresIn: '10m',
    });
}

export function genRefreshToken(payload: jwtpayload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET! as jwt.Secret, {
        expiresIn: '30 days',
    });
}

export function sendRefreshToken(res: Response, refreshToken: any) {
    res.cookie('rid', refreshToken, {
        httpOnly: true,
        // path: '/refresh_token'
    });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
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
}
