import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import hash from 'object-hash';
import User from '../../models/user.model';
import Agent, { e_agentStatus } from '../../models/agents.model';
import * as jwt from 'jsonwebtoken';
import { agentTokenPayload, verifyToken } from '../../auth/tokens';

const app = express.Router();
app.use(cookieParser());

/**
 * @route           POST /agent/init
 * @description     initiates an agent for the requested user
 * @access          Private (authorized by api key)
 */
app.post('/init', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            api_key: req.body.api_key,
        });
        if (!user || req.body?.api_key === undefined) {
            res.status(403).send({ message: 'Invalid Api key' });
        } else {
            if (user?.agents?.length! > user?.max_agents!) {
                res.status(403).send({
                    message: 'Max Agent limit has exceeded',
                });
            } else {
                const agentId = hash(req.body.agentDesc);
                // check if the agent already exist for this user
                const duplicate = await Agent.findOne({
                    agentId: agentId,
                    userId: user._id,
                });
                if (duplicate) {
                    duplicate.agentDesc = req.body.agentDesc;
                    duplicate.agentStatus = e_agentStatus.online;
                    duplicate.meta = req.body.meta;
                    duplicate.lastActive = Date.now();

                    // update in db
                    await duplicate.save();
                } else {
                    // create new agent if all the above checks are passed.
                    // agentId is the hash of the description data.
                    const agent: any = new Agent({
                        userId: user._id,
                        agentId: hash(req.body.agentDesc),
                        agentDesc: req.body.agentDesc,
                        agentStatus: e_agentStatus.online,
                        meta: req.body.meta,
                        lastActive: Date.now(),
                    });
                    // update in db
                    await agent.save(async (err: any) => {
                        if (err) {
                            throw new Error(err.message);
                        }
                        user.agents?.push(agent._id);
                        await user.save();
                    });
                }
                // token for every subsequent request by the agent
                const payload: agentTokenPayload = {
                    email: user.email,
                    agentId: agentId,
                } as agentTokenPayload;
                res.send({
                    token: jwt.sign(
                        payload,
                        process.env.ACCESS_TOKEN_SECRET! as jwt.Secret,
                        {}
                    ),
                });
            }
        }
    } catch (err) {
        res.status(500).send({ error: true, message: err.message });
    }
});

/**
 * @route           POST /agent/metrics
 * @description     Saves all the metrics description from the agent in the DB
 * @access          Private (authorized by api key)
 */
app.post('/metrics', verifyToken, async (req: Request, res: Response) => {
    try {
        res.status(501).send({ message: 'Yet to implement' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

export default app;
