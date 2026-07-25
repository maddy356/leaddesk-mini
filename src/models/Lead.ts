import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  budgetRange: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  budgetRange: { 
    type: String, 
    required: true,
    enum: ['< ₹10 Lakhs', '₹10 Lakhs - ₹1 Cr', '₹1 Cr - ₹10 Cr', '₹10 Cr+'] 
  },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Closed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
