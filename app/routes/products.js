import express from 'express';
const router = express.Router();

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products';

router.route('/')
  .post(createProduct)
  .get(getProducts);

router.route('/:product_id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
