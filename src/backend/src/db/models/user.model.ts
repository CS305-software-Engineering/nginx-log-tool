import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: String;
    password: String;
    status: String;
    max_agents: Number;
    agents: Array<String>;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'pending' },
    max_agents: { type: Number, default: 0 },
    agents: Array<String>(),
});

export default mongoose.model<IUser>('Users', userSchema);
