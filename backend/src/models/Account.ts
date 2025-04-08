import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
  name: string;
  type: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['checking', 'savings', 'credit', 'investment', 'cash', 'other'] },
    balance: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true, default: 'USD' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IAccount>('Account', AccountSchema);
