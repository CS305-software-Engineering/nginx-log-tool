import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index';
import auth from './auth/index';
import refreshToken from './auth/refreshToken';
import cookieParser from 'cookie-parser';
import agent from './routes/agent/index';
import staticMetrics from './routes/agent/staticMetrics';
import dynMetrics from './routes/agent/dynMetrics';
import system from './routes/ui/system';
import metrics from './routes/ui/metrics';
import timewindow from './routes/ui/timewindow';
import timeseries from './routes/ui/timeseries';

dotenv.config();
const app = express();

// middleware
app.use(
    cors({
        origin: (process.env.CLIENT_URL as string) ?? '/',
        credentials: true,
    })
);

// express middlewares

// parse content-type: application/json
app.use(express.json());
// parse cookie contents
app.use(cookieParser());
// parse content-type: application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);

// connect db
connectDB(process.env.DBURL as string);

// auth routes
app.use('/auth', auth);
// refresh_token route
app.use('/refresh_token', refreshToken);

// agent routes
app.use('/agent', agent);
app.use('/agent/static', staticMetrics);
app.use('/agent/dyn', dynMetrics);
// ui routes
app.use('/system', system);
app.use('/metrics', metrics);
app.use('/tw', timewindow);
app.use('/timeseries', timeseries);

app.get('/', (_req: Request, res: Response) => {
    res.send({ error: false });
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`server is running at port:${process.env.SERVER_PORT ?? 3000}`);
});
