import express, { Request, Response } from 'express';
import Agents from '../../models/agents.model';
import { e_actor, verifyToken } from '../../auth/tokens';
import { ITSMetricsReq } from 'src/models/metrics';
import { granulMap } from './common';

const app = express.Router();

export interface ISeqRes extends ITSMetricsReq {
    timeseries: Array<{
        _id: Number;
        value: String;
    }>;
}

export interface IValuesRes extends ITSMetricsReq {
    value: String | null;
}

/**
 * @route           GET /timeseries/values
 * @description     returns all the values of metrics aggregated over timewindow
 * @access          Private (authorized by access token)
 */
app.post(
    '/values',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            let result: Array<IValuesRes> = [];
            const len = (req.body?.metrics).length ?? 0;
            for (let i = 0; i < len; i++) {
                const query: ITSMetricsReq = req.body.metrics[i];
                const boundaries = [
                    (query.from as number) + 0.1,
                    (query.to as number) + 0.1,
                ];
                const queryOut = await Agents.aggregate([
                    // find the agent with given agentID
                    {
                        $match: { agentId: query.agentId },
                    },
                    // select tsmetric field to be used in subsequent operations
                    // and combine osmetrics and nginxmetrics into single allMetrics field
                    {
                        $project: {
                            _id: 0,
                            tsMetrics: 1,
                        },
                    },
                    // unwind the agents document on the tsMetrics array
                    {
                        $unwind: '$tsMetrics',
                    },
                    {
                        $unwind: '$tsMetrics.metrics',
                    },
                    // filter the new agents document based on timestamp range [from, to), and metric name
                    {
                        $match: {
                            'tsMetrics.timestamp': {
                                $gte: query.from,
                                $lt: query.to,
                            },
                            'tsMetrics.metrics.name': query.metric,
                        },
                    },
                    // bucket the new documents based on boundries calculated usign getboundries over timestamp
                    {
                        $bucket: {
                            groupBy: '$tsMetrics.timestamp',
                            boundaries: boundaries,
                            output: {
                                value: { $sum: '$tsMetrics.metrics.value' },
                            },
                            default: '_unk',
                        },
                    },
                ]);
                result.push({
                    from: query.from,
                    to: query.to,
                    metric: query.metric,
                    value: queryOut[0].value,
                    combine_fn: query.combine_fn,
                    aggr_fn: query.aggr_fn,
                    granularity: query.granularity,
                    agentId: query.agentId,
                } as IValuesRes);
            }
            res.send({ result });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

// function to calculte bountry values for bucketting document on timestamp
const getBoundries = (granularity: String, to: number, from: number) => {
    const boundaries: number[] = [from + 1];
    let b = from;
    while (b < to) {
        boundaries.push(b + granulMap.get(granularity)! + 1);
        b += granulMap.get(granularity)!;
    }
    return boundaries;
};

/**
 * @route           GET /timeseries/seq
 * @description     returns all the sequence of metrics values aggregated on granularity index for set timewindow
 * @access          Private (authorized by access token)
 */
app.post(
    '/seq',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            let result: Array<ISeqRes> = [];
            const len = (req.body?.metrics).length ?? 0;
            for (let i = 0; i < len; i++) {
                const query: ITSMetricsReq = req.body.metrics[i];
                const boundaries = getBoundries(
                    query.granularity,
                    query.to as number,
                    query.from as number
                );
                const queryOut = await Agents.aggregate([
                    // find the agent with given agentID
                    {
                        $match: { agentId: query.agentId },
                    },
                    // select tsmetric field to be used in subsequent operations
                    // and combine osmetrics and nginxmetrics into single allMetrics field
                    {
                        $project: {
                            _id: 0,
                            tsMetrics: 1,
                        },
                    },
                    // unwind the agents document on the tsMetrics array
                    {
                        $unwind: '$tsMetrics',
                    },
                    {
                        $unwind: '$tsMetrics.metrics',
                    },
                    // filter the new agents document based on timestamp range [from, to), and metric name
                    {
                        $match: {
                            'tsMetrics.timestamp': {
                                $gte: query.from,
                                $lt: query.to,
                            },
                            'tsMetrics.metrics.name': query.metric,
                        },
                    },
                    // bucket the new documents based on boundries calculated usign getboundries over timestamp
                    {
                        $bucket: {
                            groupBy: '$tsMetrics.timestamp',
                            boundaries: boundaries,
                            output: {
                                value: { $sum: '$tsMetrics.metrics.value' },
                            },
                            default: '_unk',
                        },
                    },
                ]);
                const queryOutTemp = new Map<Number, any>();
                const queryOut_len = queryOut?.length;
                for (let j = 1; j < boundaries.length; j++) {
                    queryOutTemp.set(boundaries[j] - 1, {
                        _id: boundaries[j] - 1,
                        value: null,
                    });
                }
                for (let j = 1; j < queryOut_len; j++) {
                    queryOutTemp.set(queryOut[j]?._id - 1, {
                        _id: queryOut[j]?._id - 1,
                        value: queryOut[j - 1]?.value,
                    });
                }
                // add the last timestamp value
                queryOutTemp.set(
                    queryOut[queryOut_len - 1]?._id -
                        1 +
                        granulMap.get(query.granularity)!,
                    {
                        _id:
                            queryOut[queryOut_len - 1]?._id -
                            1 +
                            granulMap.get(query.granularity)!,
                        value: queryOut[queryOut_len - 1]?.value,
                    }
                );
                result.push({
                    from: query.from,
                    to: query.to,
                    metric: query.metric,
                    timeseries: [...queryOutTemp.values()],
                    combine_fn: query.combine_fn,
                    aggr_fn: query.aggr_fn,
                    granularity: query.granularity,
                    agentId: query.agentId,
                } as ISeqRes);
            }
            res.send({ result });
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
