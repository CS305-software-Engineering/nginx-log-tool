import express, { Request, Response } from 'express';
import verifyAgent from './common'

const app = express.Router();

/**
 * @route           POST /agent/dyn/
 * @description     recieve dynamic metrics from agent
 * @access          Authorized
 */
app.post('/', verifyAgent, async (_req: Request, res: Response) => {
    try {
        res.send({ error: false, message: 'Not yet Implemented' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
