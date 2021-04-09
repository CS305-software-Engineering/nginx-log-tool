import express, { Request, Response } from 'express';
import { IMetricsDesc } from '../../models/metrics';
import { verifyToken } from '../../auth/tokens';
import User from '../../models/user.model';

const app = express.Router();

/**
 * @route           GET /metrics/:agentId
 * @description     returns all the (static) metrics collected by the agent with given agentId
 * @access          Private (authorized by access token)
 */
app.get('/:agentId', verifyToken, async (req: Request, res: Response) => {
    try {
        const resData: IMetricsDesc[] = [];
        const user = await User.findOne({
            email: res.locals.payload.email,
            'agents.agentId': req.params.agentId,
        });
        if (!user) {
            throw new Error('Invalid User or agent');
        }
        const agent = user.agents?.find(
            (agent) => agent.agentId === req.params.agentId
        );
        agent?.osStaticMetrics?.forEach((metric) => {
            resData.push(metric.desc);
        });
        agent?.nginxStaticMetrics?.forEach((metric) => {
            resData.push(metric.desc);
        });
        res.send({ metrics: resData });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
