import express, { Request, Response } from 'express';
import User from '../../models/user.model';
import Alert from '../../models/alerts.model';
import { e_actor, verifyToken } from '../../auth/tokens';

const app = express.Router();

const formatStreamData = (data: string) =>
    'data: ' + JSON.stringify(data) + '\n\n';

/**
 * @route           GET /alerts/forever
 * @description     A text stream SSE for notification data
 * @access          Private
 */
app.get(
    '/forever',
    // verifyToken(e_actor.user),
    async (_req: Request, res: Response) => {
        try {
            res.setHeader('Content-Type', 'text/event-stream');

            const interval = setInterval(
                () => res.write(formatStreamData('forever')),
                5000
            );
            // stop sending requests if client closes connection
            res.on('close', () => {
                res.end();
                clearInterval(interval);
            });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           POST /alerts/add
 * @description     add a new alert for the authenticated user
 * @access          Private
 */
app.post(
    '/add',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                email: res.locals.payload.email,
            });
            if (!user) {
            } else {
                if (user?.alerts?.length === user?.max_alerts) {
                    res.status(403).send({
                        message: 'Max Alerts limit has exceeded',
                    });
                } else {
                    const newAlert = new Alert({
                        metric_name: req.body.metric_name,
                        contact: req.body.contact,
                        operator: req.body.operator,
                        period: req.body.period,
                        threshold: req.body.threshold,
                        agentId: req.body.agentId,
                    });
                    newAlert.save(async (err: any) => {
                        if (err) {
                            throw new Error(err.message);
                        } else {
                            user.alerts?.push(newAlert._id);
                            await user.save();
                            res.status(201).send({
                                message: 'Successfully added new alert',
                            });
                        }
                    });
                }
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           PUT /alerts/:id
 * @description     update an existing alert for the authenticated user
 * @access          Private
 */
app.put(
    '/update/:id',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            await Alert.updateOne(
                { _id: req.params.id },
                {
                    metric_name: req.body.metric_name,
                    contact: req.body.contact,
                    operator: req.body.operator,
                    period: req.body.period,
                    threshold: req.body.threshold,
                    threshold_unit: req.body.threshold_unit,
                }
            );
            res.status(201).send({ message: 'updated Alert Successfully' });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           DELETE /alerts/remove/:id
 * @description     removes a specific alert of the authenticated user
 * @access          Private
 */
app.delete(
    '/remove/:id',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            const deleteRes = await Alert.deleteOne({ _id: req.params.id });
            if (deleteRes.deletedCount === 1) {
                // remove the reference alert from the user document also
                await User.updateOne(
                    { email: res.locals.payload.email },
                    { $pull: { alerts: req.params.id } }
                );
            } else {
                throw new Error('Error deleting alert!');
            }
            res.status(201).send({ message: 'alert removed successfully' });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

/**
 * @route           GET /alerts/all?id=<id> or /alerts/all
 * @description     returns a/all alert details with input id
 * @access          Private
 */
app.get(
    '/all',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            if (!req.query.id) {
                const alerts = await User.findOne({
                    email: res.locals.payload.email,
                }).populate('alerts');
                res.send({ alerts: alerts });
            } else {
                const alerts = await User.findOne({
                    email: res.locals.payload.email,
                    'alerts._id': req.query.id,
                }).populate('alerts');
                res.send({ alerts: alerts });
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
