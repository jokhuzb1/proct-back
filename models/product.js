import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  model: { type: 'String', required: true, },
  make: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  color: { type: 'String' },
  image: [String],
  ram: { type: 'Number', required: true },
  storage: { type: 'Number', required: true },
  amount: { type: 'Number', required: true }
})

export const Product = mongoose.model('Product', ProductSchema);