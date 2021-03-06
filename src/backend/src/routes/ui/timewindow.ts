import express, { Request, Response } from 'express';
import { e_actor, verifyToken } from '../../auth/tokens';
import User from '../../models/user.model';

const app = express.Router();

/**
 * @route           GET /tw/update
 * @description     returns all the agents' info available for the user
 * @access          Private (authorized by access token)
 */
app.put(
    '/update',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            if (req.body.timewindow === undefined) {
                res.status(400).send({
                    message: `Invalid timewindow ${req.body.timewindow}`,
                });
            } else {
                await User.updateOne(
                    { email: res.locals.payload.email },
                    { timewindow: req.body.timewindow }
                );
                res.send({
                    error: false,
                    message: 'timewindow updated successfully!',
                });
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
