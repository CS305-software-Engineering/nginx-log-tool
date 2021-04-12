import express, { Request, Response } from 'express';
import { IMetricsDesc } from '../../models/metrics';
import { verifyToken } from '../../auth/tokens';
import Agent from '../../models/agents.model';

const app = express.Router();

/**
 * @route           GET /metrics/:agentId
 * @description     returns all the (static) metrics collected by the agent with given agentId
 * @access          Private (authorized by access token)
 */
app.get('/:agentId', verifyToken, async (req: Request, res: Response) => {
    try {
        const agent = await Agent.findOne({
            agentId: req.params.agentId,
        });
        if (!agent) {
            throw new Error('Invalid User or agent');
        }
        const resData = {
            os: agent?.osStaticMetrics ?? null,
            nginx: agent?.nginxStaticMetrics ?? null,
        };
        res.send({ metrics: resData });
    } catch (err) {
        console.log(err);
        res.send({ error: true, message: err.message });
    }
});

export default app;
