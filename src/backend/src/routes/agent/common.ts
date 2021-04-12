import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { agentTokenPayload } from './index';
import {check} from 'express-validator';

function verifyAgent(req: Request, res: Response, next: any) {
    try {
        const auth = req.headers['authorization'] as String;
        if (!auth.split(' ')[1]) {
            throw new Error('No token in request.');
        }
        const payload:agentTokenPayload  = jwt.verify(
            auth.split(' ')[1],
            process.env.ACCESS_TOKEN_SECRET as jwt.Secret
        ) as agentTokenPayload;
        res.locals.payload = payload;
        return next();
    } catch (err) {
        return res.send({ error: true, message: err.message });
    }
}

export const staticMetricsValidation = [
    check('osStaticMetrics')
        .exists()
        .withMessage('osStaticMetrics is empty!'),
    check('nginxStaticMetrics')
        .exists()
        .withMessage('nginxStaticMetrics is empty!')
];

export default verifyAgent;
