import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  thickness: { type: Number, default: null },
  size: { type: String, required: true },
  color: { type: String, required: true },
  coating: { type: String, required: true },
  certification: { type: String, required: true },
  edgeFinish: { type: String, default: null },
  supplier: { type: String, required: true },
  pricePerSqm: { type: Number, default: null },
  pricePerUnit: { type: Number, default: null },
  minOrder: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
