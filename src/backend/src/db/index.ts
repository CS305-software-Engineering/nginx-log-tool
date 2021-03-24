import { connect } from 'mongoose';

export default (dbURL: string) => {
    try {
        connect(dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }).then(() => console.log('Successfuly connected to db!'));
    } catch (err) {
        console.log({ error: true, message: err.message });
    }
};