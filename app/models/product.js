import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  stock: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    min: 0,
  }
});

module.exports = mongoose.model('Product', ProductSchema);
