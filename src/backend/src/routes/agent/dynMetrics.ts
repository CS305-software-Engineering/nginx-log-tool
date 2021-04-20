import express, { Request, Response } from 'express';
import Agents from '../../models/agents.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import ITSMetric, { IMetricDesc } from 'src/models/metrics';

const app = express.Router();

/**
 * @route           POST /agent/dyn/
 * @description     recieve dynamic metrics from agent
 * @access          Authorized
 */
app.post(
    '/',
    verifyToken(e_actor.agent),
    async (req: Request, res: Response) => {
        try {
            const tsData: Array<ITSMetric> = [];
            const metrics: Array<IMetricDesc> = [];
            req.body.data.forEach((element: any) => {
                Object.keys(element.osDynamicMetrics).forEach((key) => {
                    const metricDesc: IMetricDesc = {
                        name: key,
                        value: element.osDynamicMetrics[key]?.value,
                        source: element.osDynamicMetrics[key]?.source,
                        category: element.osDynamicMetrics[key]?.category,
                    };
                    metrics.push(metricDesc);
                });
                Object.keys(element.nginxDynamicMetrics).forEach((key) => {
                    const metricDesc: IMetricDesc = {
                        name: key,
                        value: element.nginxDynamicMetrics[key]?.value,
                        source: element.nginxDynamicMetrics[key]?.source,
                        category: element.nginxDynamicMetrics[key]?.category,
                    };
                    metrics.push(metricDesc);
                });
                tsData.push(({
                    timestamp: new Date(element.timestamp),
                    metrics: metrics,
                } as unknown) as ITSMetric);
            });
            await Agents.updateOne(
                {
                    agentId: res.locals.payload.agentId,
                },
                {
                    $push: { tsMetrics: { $each: tsData } },
                }
            );
            res.send({ error: false, message: 'Metrics added in DB!' });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
