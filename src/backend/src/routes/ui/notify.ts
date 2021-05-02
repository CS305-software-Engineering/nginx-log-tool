import express, { Request, Response } from 'express';
import User, { IUser } from '../../models/user.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import Notify from '../../models/notify.model';

const app = express.Router();

/**
 * @route           GET /notify/all?query
 * @description     get all the notifications of the authenticated user based on params
 * @access          Private
 */
app.get(
    '/all',
    verifyToken(e_actor.user),
    async (_req: Request, res: Response) => {
        try {
            const notifics: IUser = (await User.findOne({
                email: res.locals.payload.email,
            }).populate('notifications')) as IUser;
            res.send({ notifications: notifics.notifics });
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
    '/read',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            await Notify.updateOne({ _id: req.body.id }, { read: Date.now() });
            res.status(201);
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           POST /notify/remove/:id
 * @description     delete a notification from the backend.
 * @access          Private
 */
app.delete(
    '/remove/:id',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            const deleteRes = await Notify.deleteOne({ _id: req.params.id });
            if (deleteRes.deletedCount === 1) {
                // remove the reference alert from the user document also
                await User.updateOne(
                    { email: res.locals.payload.email },
                    { $pull: { notifics: req.params.id } }
                );
            } else {
                throw new Error('Error deleting notification!');
            }
            res.send({ message: 'Notification removed successfully' });
            res.status(201).send();
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
