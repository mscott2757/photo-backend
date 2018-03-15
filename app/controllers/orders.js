import express from 'express';
import Order from '../models/order';
import Product from '../models/product';
import { errHandler, dataHandler } from './utils';

export function createOrder(
  {
    body: { first, last, product, local, email, address, city, state, zip, notes, tracking }
  },
  res
) {
  let order = new Order();
  order.set({
    name: { first, last },
    product, local, notes, email, address, city, state, zip, tracking
  });

  order.save().then((order) => {
    Product.findById(product).then((product) => {
      product.set({ stock: product.stock - 1 });
      product.save().then((product) => {
        order.populate('product')
          .execPopulate()
          .then(dataHandler(res))
          .catch(errHandler(res));
      }).catch(errHandler(res));
    });
  }).catch(errHandler(res));
}

export function getOrders(req, res) {
  Order.find().populate('product')
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function getOrder({ params: { order_id } }, res) {
  Order.findById(order_id).populate('product')
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function updateOrder(
  {
    body: { first, last, local, email, address, city, state, zip, notes, tracking, done, product },
    params: { order_id }
  },
  res
) {
  Order.findById(order_id).then((order) => {
    order.set({
      name: { first, last },
      notes, local, done, product, email, address, city, state, zip, tracking
    });

    order.save().then((order) => {
      order.populate('product')
        .execPopulate()
        .then(dataHandler(res))
        .catch(errHandler(res));
    }).catch(errHandler(res));
  }).catch(errHandler(res));
}

export function deleteOrder({ params: { order_id } }, res) {
  Order.findById(order_id).then((order) => {
    Product.findById(order.product).then((product) => {
      product.set({ stock: product.stock + 1 });
      product.save().then((product) => {
        Order.remove({ _id: order_id })
          .then(dataHandler(res))
          .catch(errHandler(res));
      }).catch(errHandler(res));
    }).catch(errHandler(res));
  }).catch(errHandler(res));
}


