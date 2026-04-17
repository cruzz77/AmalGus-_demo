import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here are protected
router.use(protect);

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
  try {
    const { productName, supplierName, dimensions, totalCost } = req.body;

    const newOrder = await Order.create({
      user: req.user._id,
      productName,
      supplierName,
      dimensions,
      totalCost
    });

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   GET /api/orders
// @desc    Get all orders for the logged-in user
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel/Delete a pending order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'No order found with that ID'
      });
    }

    // 1. Check if the order belongs to the user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to cancel this order'
      });
    }

    // 2. Check if the order is still Pending
    if (order.status !== 'Pending') {
      return res.status(400).json({
        status: 'fail',
        message: `Current order status is '${order.status}'. Only 'Pending' orders can be cancelled.`
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

export default router;
