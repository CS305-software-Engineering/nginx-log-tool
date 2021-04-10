import mongoose, { Document, Schema } from 'mongoose';
import ITSMetrics, { INGINXStatisMetrics, IOSStaticMetrics } from './metrics';

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

export interface IAgent extends Document {
    userId: Schema.Types.ObjectId;
    agentId: String;
    agentSetting?: IAgentSetting;
    agentDesc?: IAgentDesc;
    agentStatus?: e_agentStatus;
    lastActive?: Number;
    meta: Schema.Types.Mixed;
    tsMetrics?: Array<ITSMetrics>;
    osStaticMetrics?: IOSStaticMetrics;
    nginxStaticMetrics?: INGINXStatisMetrics;
}

const agentSchema: Schema = new Schema({
    agentId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    agentSetting: {
        alias: String,
        tags: [String],
    },
    agentDesc: {
        host: { type: String, required: true },
        uid: { type: String, required: true },
    },
    agentStatus: {
        type: String,
        enum: e_agentStatus,
        default: e_agentStatus.online,
    },
    meta: { type: Schema.Types.Mixed },
    lastActive: Number,
    tsMetrics: [Schema.Types.Mixed],
    osStaticMetrics: Schema.Types.Mixed,
    nginxStaticMetrics: Schema.Types.Mixed,
});

export default mongoose.model<IAgent>('Agents', agentSchema);
