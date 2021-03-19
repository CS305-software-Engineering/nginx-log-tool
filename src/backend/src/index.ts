import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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
// parse content-type: application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send({ error: false });
});

app.listen(process.env.SERVER_PORT ?? 3000, () => {
    console.log(`server is running at port:${process.env.SERVER_PORT ?? 3000}`);
});
