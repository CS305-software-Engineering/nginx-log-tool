import mongoose, { Schema, Document } from 'mongoose';

export interface INotify extends Document {
    user: String;
    message: String;
    read?: Number;
    date_created: Number;
    agent_id: String;
}

const notifySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    message: { type: String, required: true },
    read: { type: String, default: null },
    date_created: { type: Number, required: true, default: Date.now() },
    agent_id: { type: String, required: true },
});

export default mongoose.model<INotify>('notifications', notifySchema, 'notifications');
