import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import User, { IAgent } from '../../models/user.model';
import * as jwt from 'jsonwebtoken';

const app = express.Router();
app.use(cookieParser());

export interface agentTokenPayload {
    email: String;
    agentId: String;
}

/**
 * @route           POST /agent/init
 * @description     initiates an agent for the requested user
 * @access          Private (authorized by api key)
 */
app.post('/', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            api_key: req.body.api_key,
        });
        if (!user || req.body?.api_key === undefined) {
            throw new Error('Invalid Api key');
        }
        if (user.agents?.length! > user.max_agents!) {
            throw new Error('Max Agent limit has exceeded');
        }
        // create new agent if all the above checks are passed
        const agent: IAgent = {
            agentId: req.body.agentId,
            agentStatus: true,
        };
        // update in db
        user.agents?.push(agent);
        await user.save();
        // token for every subsequent request by the agent
        const payload: agentTokenPayload = {
            email: user.email,
            agentId: req.body.agentId,
        } as agentTokenPayload;
        res.send({
            token: jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET! as jwt.Secret,
                {}
            ),
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

export default app;
