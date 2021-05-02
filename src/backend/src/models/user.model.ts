import mongoose, { Schema, Document } from 'mongoose';
import { IAgent } from './agents.model';
import { IAlert } from './alerts.model';
import { INotify } from './notify.model';

export interface IUser extends Document {
    email?: String;
    timewindow?: String;
    password?: String;
    api_key?: String;
    status?: String;
    max_agents?: Number;
    max_alerts?: Number;
    agents?: Array<String> | Array<IAgent>;
    alerts?: Array<String> | Array<IAlert>;
    notifics?: Array<String> | Array<INotify>;
}

export enum e_timewindow {
    h_1 = '1h',
    h_4 = '4h',
    d_1 = '1d',
    d_2 = '2d',
    w_1 = '1w',
}

export const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    api_key: String,
    status: { type: String, default: 'pending' },
    max_agents: { type: Number, default: 5 },
    max_alerts: { type: Number, default: 5 },
    timewindow: { type: String, enum: e_timewindow, default: e_timewindow.h_1 },
    agents: [{ type: Schema.Types.ObjectId, ref: 'Agents' }],
    alerts: [{ type: Schema.Types.ObjectId, ref: 'alerts' }],
    notifics: [{ type: Schema.Types.ObjectId, ref: 'notifications' }],
});

export default mongoose.model<IUser>('Users', userSchema);
