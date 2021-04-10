import express, { Request, Response } from 'express';
import { verifyToken } from '../../auth/tokens';

const app = express.Router();

app.get('/values', verifyToken, async (_req: Request, res: Response) => {
    try {
        res.send({ error: false, message: 'yet to implement' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
