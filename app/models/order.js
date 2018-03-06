import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    first: {
      type: String,
      require: true,
      default: ''
    },
    last: {
      type: String,
      require: true,
      default: ''
    }
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  done: {
    type: Boolean,
    require: true,
    default: false
  },
  local: {
    type: Boolean,
    require: true,
    default: false
  },
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Order', OrderSchema);
