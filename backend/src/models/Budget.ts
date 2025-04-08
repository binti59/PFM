import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  name: string;
  amount: number;
  category: string;
  period: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    period: { type: String, required: true, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>('Budget', BudgetSchema);
