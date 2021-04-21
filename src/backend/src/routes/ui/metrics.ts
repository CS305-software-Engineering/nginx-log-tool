import express, { Request, Response } from 'express';
import ITSMetric, { e_typeSys } from '../../models/metrics';
import { e_actor, verifyToken } from '../../auth/tokens';
import Agent from '../../models/agents.model';

const app = express.Router();

/**
 * @route           GET /metrics/:agentId?static=&dyn=
 * @description     returns all the (static) metrics collected by the agent with given agentId
 * @access          Private (authorized by access token)
 */
app.get(
    '/:agentId',
    verifyToken(e_actor.user),
    async (req: Request, res: Response) => {
        try {
            const agent = await Agent.findOne({
                agentId: req.params.agentId,
            });
            if (!agent) {
                res.status(401).send({ message: 'Invalid User or agent' });
            } else {
                if (req.query.static === '1') {
                    const resData = {
                        os: agent?.osStaticMetrics ?? null,
                        nginx: agent?.nginxStaticMetrics ?? null,
                    };
                    res.send({ metrics: resData });
                } else if (req.query.dyn === '1') {
                    const osMetrics = [];
                    const nginxMetrics = [];
                    const ts = agent.tsMetrics?.find((_e) => true) as ITSMetric;
                    for (let i = 0; i < ts?.metrics.length; i++) {
                        if (ts?.metrics[i].type === e_typeSys.os) {
                            osMetrics.push(ts?.metrics[i].name);
                        } else if (ts?.metrics[i].type === e_typeSys.nginx) {
                            nginxMetrics.push(ts?.metrics[i].name);
                        }
                    }
                    console.log(osMetrics, nginxMetrics);
                    res.send({
                        metrics: {
                            os: osMetrics,
                            nginx: nginxMetrics,
                        },
                    });
                }
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
);

export default app;

/*
from :  1618071100000,
to:     1618071280000

1618071100000       1618071160000       1618071220000       1618071280000

--                  12                  5                   null
21:41:40            21:42:40            21:43:40            21:44:40
    12                  5                   null            null
*/
