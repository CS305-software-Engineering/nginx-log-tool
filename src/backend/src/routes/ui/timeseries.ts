import express, { Request, Response } from 'express';
import { verifyToken } from '../../auth/tokens';

const app = express.Router();

export interface IMetricsReq {
    to: Number;
    from: Number;
    metric: String;
    combine_fn: String;
    aggr_fn: String;
    granularity: String;
    agentId: String;
}

/**
 * @route           GET /timeseries/values
 * @description     returns all the values of metrics aggregated over timewindow
 * @access          Private (authorized by access token)
 */
app.post('/values', verifyToken, async (_req: Request, res: Response) => {
    try {
        res.send({ error: false, message: 'Yet to implement' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

/**
 * @route           GET /timeseries/seq
 * @description     returns all the sequence of metrics values aggregated on granularity index for set timewindow
 * @access          Private (authorized by access token)
 */
app.post('/seq', verifyToken, async (_req: Request, res: Response) => {
    try {
        res.send({ error: false, message: 'Yet to implement' });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
