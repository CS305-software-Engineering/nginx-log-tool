import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export enum e_actor {
    agent = 'agent',
    user = 'user',
}

// payload type of user tokens used in webapp
export interface userTokenPayload {
    email: String;
}

// payload type of agent tokens used by collector agent
export interface agentTokenPayload {
    email: String;
    agentId: String;
}

export function genAccessToken(
    payload: userTokenPayload | agentTokenPayload,
    expiry: string = '30m'
) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET! as jwt.Secret, {
        expiresIn: expiry,
    });
}

export function genRefreshToken(
    payload: userTokenPayload | agentTokenPayload,
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

export const verifyToken = (actor: string) => (
    req: Request,
    res: Response,
    next: any
) => {
    try {
        const auth = req.headers['authorization'] as String;
        if (!auth.split(' ')[1]) {
            throw new Error('please login first! (Not Authenticated)');
        }
        const payload: any = jwt.verify(
            auth.split(' ')[1],
            process.env.ACCESS_TOKEN_SECRET as jwt.Secret
        );
        // check if the user has used the token of agent or vice-versa
        if (
            (actor === e_actor.agent && payload?.agentId === undefined) ||
            (actor === e_actor.user && payload?.agentId !== undefined)
        ) {
            throw new Error('Invalid User or token');
        }
        res.locals.payload = payload;
        return next();
    } catch (err) {
        return res.send({ error: true, message: err.message });
    }
};
