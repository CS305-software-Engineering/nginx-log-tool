import express, { Request, Response } from 'express';
import User from '../../models/user.model';
import Alert from '../../models/alerts.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import Notify from 'src/models/notify.model';

const app = express.Router();

/**
 * @route           POST /notify/all?query
 * @description     get all the notifications of the authenticated user based on params
 * @access          Private
 */
app.get(
    '/all',
    verifyToken(e_actor.user),
    async (_req: Request, res: Response) => {
        try {
            const notifics = await User.findOne({
                email: res.locals.payload.email,
            }).populate('notifications');
            res.send({ notifics });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           POST /notify/read/:id
 * @description     set the read property to the current time of notification with _id = id
 * @access          Private
 */
app.put(
    '/read/:id',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            await Notify.updateOne(
                { _id: req.params.id },
                { read: Date.now() }
            );
            res.status(201);
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
