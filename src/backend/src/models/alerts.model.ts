import mongoose, { Schema, Document } from 'mongoose';

export const alert_period: { [id: string]: Number } = {
    '2m': 120000,
    '5m': 300000,
    '10m': 600000,
    '30m': 1800000,
    '1hr': 3600000,
    '2hr': 7200000,
    '4hr': 14400000,
    '24hr': 86400000,
};

export const threshOp: { [id: string]: string } = {
    '<': 'below',
    '>': 'not below',
    '=': 'equal to',
};

export interface IAlert extends Document {
    user: String;
    metric_name: String;
    contact: String;
    operator?: String;
    threshold?: Number;
    agentId?: String;
    threshold_unit?: String;
    period: String;
    last_checked?: Number;
    date_created: Number;
}

const alertSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    metric_name: { type: String, required: true },
    contact: { type: String, required: true },
    operator: String,
    threshold: String,
    agentId: { type: String, required: true },
    threshold_unit: String,
    period: { type: String, required: true },
    last_checked: { type: Number, default: null },
    date_created: { type: Number, default: Date.now(), required: true },
});

export default mongoose.model<IAlert>('alerts', alertSchema, 'alerts');
