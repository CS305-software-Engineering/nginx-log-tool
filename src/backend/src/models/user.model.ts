import mongoose, { Schema, Document } from 'mongoose';
import IMetrics, { INGINXStatisMetrics, IOSStaticMetrics } from './metrics';

export interface IUser extends Document {
    email: String;
    password: String;
    api_key?: String;
    status?: String;
    max_agents?: Number;
    agents?: Array<IAgent>;
}

export enum e_agentStatus {
    offline = 'OFFLINE',
    online = 'ONLINE',
}

export interface IAgentDesc {
    host: String;
    uid: String;
}

export interface IAgentSetting {
    alias?: String;
    tags?: [String];
}

export interface IAgent {
    agentId: String;
    agentSetting?: IAgentSetting;
    agentDesc?: IAgentDesc;
    agentStatus?: e_agentStatus;
    lastActive?: Date;
    metrics?: Array<IMetrics>;
    osStaticMetrics?: Array<IOSStaticMetrics>;
    nginxStaticMetrics?: Array<INGINXStatisMetrics>;
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
