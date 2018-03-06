import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orders';

router.route('/')
  .post(createOrder)
  .get(getOrders);

router.route('/:order_id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
