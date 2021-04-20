import express, { Request, Response } from 'express';
import { IAgent } from 'src/models/agents.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import User from '../../models/user.model';

const app = express.Router();

/**
 * @route           GET /system/objects
 * @description     returns all the agents' info available for the user
 * @access          Private (authorized by access token)
 */
app.get(
    '/objects',
    verifyToken(e_actor.user),
    async (_req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                email: res.locals.payload.email,
            }).populate('agents');
            if (!user) {
                res.status(401).send({ message: 'Invalid User' });
            } else {
                const resData: any = [];
                if (user.agents instanceof String) {
                } else {
                    user.agents?.forEach((agent: any) => {
                        resData.push({
                            agentId: agent.agentId,
                            status: agent.agentStatus,
                            description: agent.agentDesc,
                            setting: agent.agentSetting,
                            lastActive: agent.lastActive,
                            static: agent.osStaticMetrics,
                        });
                    });
                }
                res.send({ resData });
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
