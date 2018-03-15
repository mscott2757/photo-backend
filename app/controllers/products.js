import express from 'express';
import Product from '../models/product';
import { errHandler, dataHandler } from './utils';

export function createProduct({ body: { name, stock, price } }, res) {
  let product = new Product();
  product.set({ name, stock, price });
  product.save()
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function getProducts(req, res) {
  Product.find()
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function getProduct({ params: { product_id } }, res) {
  Product.findById(product_id)
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function deleteProduct({ params: { product_id } }, res) {
  Product.remove({ _id: product_id })
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function updateProduct({ params: { product_id }, body: { name, stock, price } }, res) {
  Product.findById(product_id).then((product) => {
    product.set({ name, stock, price });
    product.save()
    .then(dataHandler(res))
    .catch(errHandler(res));
  }).catch(errHandler(res));
}

