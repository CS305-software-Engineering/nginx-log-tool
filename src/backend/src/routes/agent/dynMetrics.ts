import express, { Request, Response } from 'express';
import { e_actor, verifyToken } from '../../auth/tokens';
import Agents from '../../models/agents.model';
import { alert_period, IAlert } from '../../models/alerts.model';
import User from '../../models/user.model';
import ITSMetric, { IMetricDesc } from '../../models/metrics';
import Notify from '../../models/notify.model';
import { sendNotifyMail } from './mailUtil';

const app = express.Router();

// function to format the notification message
const formatNotificMessage = (userAlert: any, value: Number) => {
    let status = '';
    if (userAlert.operator == '>') {
        status = value > userAlert.threshold ? 'above' : 'no longer above';
    } else if (userAlert.operator == '<') {
        status = value < userAlert.threshold ? 'below' : 'no longer below';
    } else {
        status =
            value === userAlert.threshold ? 'equal to' : 'no longer equal to';
    }
    const message = `Metric ${userAlert.metric_name} is ${status} the threshold of ${userAlert.threshold}.\n Last checked value was ${value} over the past ${userAlert.period}`;
    // send a mail to the user
    sendNotifyMail(userAlert.contact, userAlert.agentId, message);
    return message;
};

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
            const user = await User.findOne({
                email: res.locals.payload.email,
            }).populate('alerts');
            if (!user) {
            } else {
                const tsData: Array<ITSMetric> = [];
                const metrics: Array<IMetricDesc> = [];
                req.body.data.forEach((element: any) => {
                    Object.keys(element.osDynamicMetrics).forEach((key) => {
                        const metricDesc: IMetricDesc = {
                            name: key,
                            value: element.osDynamicMetrics[key]?.value,
                            source: element.osDynamicMetrics[key]?.source,
                            category: element.osDynamicMetrics[key]?.category,
                            type: 'os',
                        };
                        metrics.push(metricDesc);
                    });
                    Object.keys(element.nginxDynamicMetrics).forEach((key) => {
                        const metricDesc: IMetricDesc = {
                            name: key,
                            value: element.nginxDynamicMetrics[key]?.value,
                            source: element.nginxDynamicMetrics[key]?.source,
                            category:
                                element.nginxDynamicMetrics[key]?.category,
                            type: 'nginx',
                        };
                        metrics.push(metricDesc);
                    });
                    tsData.push(({
                        timestamp: element.timestamp,
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
                const userAlerts: IAlert[] = user.alerts as IAlert[];
                if (!userAlerts) {
                } else {
                    const curr_time = Date.now();
                    for (let i = 0; i < userAlerts?.length!; i++) {
                        const doUpdate =
                            userAlerts[i].last_checked === null
                                ? curr_time - +userAlerts[i].date_created! >=
                                  alert_period[userAlerts[i].period as string]
                                : curr_time - +userAlerts[i].last_checked! >=
                                  alert_period[userAlerts[i].period as string];

                        if (doUpdate) {
                            // find details from the query
                            const checkAlert = await Agents.aggregate([
                                // find the agent with given agentId
                                {
                                    $match: {
                                        agentId: res.locals.payload.agentId,
                                    },
                                },
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
                                            $gte:
                                                curr_time -
                                                +alert_period[
                                                    userAlerts[i]
                                                        .period as string
                                                ],
                                            $lt: curr_time,
                                        },
                                        'tsMetrics.metrics.name':
                                            userAlerts[i].metric_name,
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 },
                                        sum_val: {
                                            $sum: '$tsMetrics.metrics.value',
                                        },
                                    },
                                },
                            ]);
                            
                            if (!checkAlert[0]?.sum_val) {
                                continue;
                            } else {
                                // update the last check in alerts section
                                await userAlerts[i].updateOne({
                                    last_checked: curr_time,
                                });
                                // create a new notification instance for this check
                                const newNotification = new Notify({
                                    user: user._id,
                                    message: formatNotificMessage(
                                        userAlerts[i],
                                        checkAlert[0].sum_val
                                    ),
                                    date_created: curr_time,
                                    agent_id: res.locals.payload.agentId,
                                });
                                newNotification.save(async (err) => {
                                    if (err) {
                                        throw new Error(err.message);
                                    } else {
                                        user.notifics?.push(
                                            newNotification._id
                                        );
                                        user.save();
                                    }
                                    // await newNotification.save();
                                    // user.notifics?.push(newNotification._id);
                                    // await user.save();
                                });
                            }
                        }
                    }
                }
                res.send({ error: false, message: 'Metrics added in DB!' });
            }
        } catch (err) {
            res.status(500).send({ error: true, message: err.message });
        }
    }
);

export default app;
