import mongoose, { Schema, Document } from 'mongoose';
import IMetrics, { INGINXStatisMetrics, IOSStaticMetrics } from './metrics';

export interface IUser extends Document {
    email: String;
    password: String;
    api_key?:String;
    status?: String;
    max_agents?: Number;
    agents?: [IAgent];
}

export interface IAgent{
    agentId: String;
    agentStatus: Boolean;
    metrics?: Array<IMetrics>;
    osStaticMetrics?: IOSStaticMetrics;
    nginxStaticMetrics?: INGINXStatisMetrics;
}

export const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    api_key: String,
    status: { type: String, default: 'pending' },
    max_agents: { type: Number, default: 5 },
    agents: Array<IAgent>(),
});

export default mongoose.model<IUser>('Users', userSchema);
