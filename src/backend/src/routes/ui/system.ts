import express, { Request, Response } from 'express';
import { verifyToken } from 'src/auth/tokens';
import User from '../../models/user.model';

const app = express.Router();

/**
 * @route           GET /system/objects
 * @description     returns all the agents' info available for the user
 * @access          Private (authorized by access token)
 */
app.get('/objects', verifyToken, async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: res.locals.payload.email });
        if (!user) {
            throw new Error('Invalid user');
        }
        const resData = [];
        user?.agents?.forEach((agent) => {
            resData.push({
                status: agent.agentStatus,
                description: agent.agentDesc,
                setting: agent.agentSetting,
                lastActive: agent.lastActive,
                static: agent.osStaticMetrics,
            });
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
