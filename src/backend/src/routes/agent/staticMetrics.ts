import express, { Request, Response } from 'express';
import { INGINXStatisMetrics, IOSStaticMetrics } from 'src/models/metrics';
import User from '../../models/user.model';
import verifyAgent, { staticMetricsValidation } from './common';

const app = express.Router();

/**
 * @route           POST /agent/static/
 * @description     updates static metrics for an already initiated agent
 * @access          Private (authorized by api key)
 */
app.post(
    '/',
    verifyAgent,
    staticMetricsValidation,
    async (req: Request, res: Response) => {
        try {
            console.log(res.locals.payload);
            const user = await User.findOne({
                email: res.locals.payload.email,
                'agents.agentId': res.locals.payload.agentId,
            });
            if (!user) {
                throw new Error('User or Agent does not exist');
            }
            const osMetrics: IOSStaticMetrics = req.body.osStatisMetrics;
            const nginxMetrics: INGINXStatisMetrics =
                req.body.nginxStaticMetrics;
            await User.updateOne(
                {
                    email: res.locals.payload.email,
                    'agents.agentId': res.locals.payload.agentId,
                },
                {
                    $set: {
                        'agents.$.agentStatus': req.body.agentStatus,
                        'agents.$.osStaticMetrics': osMetrics,
                        'agents.$.nginxStaticMetrics': nginxMetrics,
                    },
                }
            );

            res.send({
                error: false,
                message: 'Successfully updated static metrics!',
            });
        } catch (err) {
            res.send({ error: true, message: err.message });
        }
    }
);

export default app;
