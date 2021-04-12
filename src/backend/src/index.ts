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

console.log((process.env.CLIENT_URL as string) ?? '/');
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

// Web App routes
// auth routes
app.use('/wapi/auth', auth);
// refresh_token route
app.use('/wapi/refresh_token', refreshToken);
// ui routes
app.use('/wapi/system', system);
app.use('/wapi/metrics', metrics);
app.use('/wapi/tw', timewindow);
app.use('/wapi/timeseries', timeseries);

// agent routes
app.use('/aapi/agent', agent);
app.use('/aapi/agent/static', staticMetrics);
app.use('/aapi/agent/dyn', dynMetrics);

app.get('/', (_req: Request, res: Response) => {
    res.send({ error: false });
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`server is running at port:${process.env.SERVER_PORT ?? 3000}`);
});
