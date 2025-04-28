// src/api/user/userModel.ts
import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name:      string;
  email:     string;
  password:  string;
  age?:      number;
  roles:     string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age:      { type: Number, min: 0 },
    roles:    { type: [String], default: ["user"] },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);

/**
 * A plain-Object view of your users, for services/controllers.
 * We omit `password` here for safety.
 */
export type User = {
  id:         string;
  name:       string;
  email:      string;
  age?:       number;
  roles:      string[];
  createdAt:  Date;
  updatedAt:  Date;
};
