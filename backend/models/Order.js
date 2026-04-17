import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  productName: {
    type: String,
    required: [true, 'Order must have a product name']
  },
  supplierName: {
    type: String
  },
  dimensions: {
    width: Number,
    height: Number,
    quantity: Number
  },
  totalCost: {
    type: Number,
    required: [true, 'Order must have a total cost']
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
