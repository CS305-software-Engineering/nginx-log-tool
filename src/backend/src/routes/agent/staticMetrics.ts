import express, { Request, Response } from 'express';
import Agent from '../../models/agents.model';
import { validationResult } from 'express-validator';
import { INGINXStatisMetrics, IOSStaticMetrics } from '../../models/metrics';
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
            const validationError = validationResult(req);
            if (!validationError.isEmpty) {
                res.status(400).json({
                    code: 400,
                    errors: validationError.mapped(),
                });
            }
            const user = await User.findOne({
                email: res.locals.payload.email,
            });
            if (!user) {
                throw new Error('User or Agent does not exist');
            }
            const osMetrics: IOSStaticMetrics = req.body.osStaticMetrics;
            const nginxMetrics: INGINXStatisMetrics =
                req.body.nginxStaticMetrics;
            await Agent.updateOne(
                {
                    'agents.agentId': res.locals.payload.agentId,
                },
                {
                    $set: {
                        osStaticMetrics: osMetrics,
                        nginxStaticMetrics: nginxMetrics,
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
