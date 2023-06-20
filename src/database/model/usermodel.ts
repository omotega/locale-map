import { Schema, model } from 'mongoose';

export interface Iuser {
  _id?: string;
  name: string;
  email: string;
  apiKey?: string;
  password: string;
  active?: boolean;
}

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean, defaultValue: true },
    apiKey: { type: String }
  },
  {
    timestamps: true
  }
);

export const userModel = model<Iuser>('User', userSchema);
