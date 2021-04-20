import express, { Request, Response } from 'express';
import Agents from '../../models/agents.model';
import { validationResult } from 'express-validator';
import { INGINXStaticMetrics, IOSStaticMetrics } from '../../models/metrics';
import User from '../../models/user.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import { staticMetricsValidation } from '../../validators/index';

const app = express.Router();

/**
 * @route           POST /agent/static/
 * @description     updates static metrics for an already initiated agent
 * @access          Private (authorized by api key)
 */
app.post(
    '/',
    verifyToken(e_actor.agent),
    staticMetricsValidation,
    async (req: Request, res: Response) => {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                res.status(400).json({
                    code: 400,
                    errors: validationError.mapped(),
                });
            }
            const user = await User.findOne({
                email: res.locals.payload.email,
            });
            if (!user) {
                res.status(401).send({
                    message: 'User or Agent does not exist',
                });
            } else {
                const osMetrics: IOSStaticMetrics = req.body.osStaticMetrics;
                const nginxMetrics: INGINXStaticMetrics =
                    req.body.nginxStaticMetrics;
                await Agents.updateOne(
                    {
                        agentId: res.locals.payload.agentId,
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
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
);

export default app;
