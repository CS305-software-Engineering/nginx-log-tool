import { connect } from 'mongoose';

export default async (dbURL: string) => {
    try {
        await connect(dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('Successfuly connected to db!');
    } catch (err) {
        console.log({ error: true, message: err.message + '@db' });
    }
};
