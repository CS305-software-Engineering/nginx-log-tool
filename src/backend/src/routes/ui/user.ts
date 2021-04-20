import express, { Request, Response } from 'express';
import User from '../../models/user.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import { updatePasswordValidation } from '../..//validators';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const app = express.Router();

/**
 * @route           GET /user/me
 * @description     get user's info including email, api_key, maximum num of agents, current num of agents
 * @access          Private (authorized by access token)
 */
app.get(
    '/me',
    verifyToken(e_actor.user),
    async (_req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                email: res.locals.payload.email,
            }).populate('agents');
            if (!user) {
                res.status(403).send({ message: 'Invalid User' });
            } else {
                res.send({
                    user: {
                        email: user.email,
                        api_key: user.api_key,
                        max_agents: user.max_agents,
                        curr_agents_num: user.agents?.length,
                    },
                });
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           GET /user/updateme
 * @description     Update user's password
 * @access          Private (authorized by access token)
 */
app.post(
    '/updateme',
    verifyToken(e_actor.user),
    updatePasswordValidation,
    async (req: Request, res: Response) => {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                res.status(400).json({
                    code: 400,
                    errors: validationError.mapped(),
                });
            } else {
                const salt = await bcrypt.genSalt(6);
                const hashedPassword = await bcrypt.hash(
                    req.body.password,
                    salt
                );
                await User.updateOne(
                    { email: res.locals.payload.email },
                    { password: hashedPassword }
                );
                res.status(204).send('Password updated successfully!');
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);
export default app;
