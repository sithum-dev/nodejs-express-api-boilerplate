import { ApiUser } from '@interfaces/apiUser.interface';
import { Schema, model, SchemaOptions } from 'mongoose';

const schema = new Schema<ApiUser>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String },
        officeId: { type: Schema.Types.ObjectId, ref: 'Offices' },
        uuid: { type: String, required: true },
    },
    { timestamps: true } as SchemaOptions,
);

const ApiUserModel = model<ApiUser>('ApiUsers', schema);

export default ApiUserModel;
