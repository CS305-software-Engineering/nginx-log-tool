import express, { Request, Response } from 'express';
import { e_actor, verifyToken } from '../../auth/tokens';
import Agent from '../../models/agents.model';

const app = express.Router();

/**
 * @route           GET /metrics/:agentId
 * @description     returns all the (static) metrics collected by the agent with given agentId
 * @access          Private (authorized by access token)
 */
app.get(
    '/:agentId',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            const agent = await Agent.findOne({
                agentId: req.params.agentId,
            });
            if (!agent) {
                res.status(401).send({ message: 'Invalid User or agent' });
            } else {
                const resData = {
                    os: agent?.osStaticMetrics ?? null,
                    nginx: agent?.nginxStaticMetrics ?? null,
                };
                res.send({ metrics: resData });
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
);

export default app;
