import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  account: mongoose.Types.ObjectId;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['income', 'expense', 'transfer'] },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
