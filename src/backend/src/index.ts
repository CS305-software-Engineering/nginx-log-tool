import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index';
import auth from './auth/index';
import refreshToken from './auth/refreshToken';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// middleware
app.use(
    cors({
        origin: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
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

app.get('/', (req: Request, res: Response) => {
    res.send({ error: false });
});

app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`server is running at port:${process.env.SERVER_PORT ?? 3000}`);
});
