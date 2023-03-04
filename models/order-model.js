import mongoose from 'mongoose';

const OrderProductSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: [OrderProductSchema],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model('Order', OrderSchema);
