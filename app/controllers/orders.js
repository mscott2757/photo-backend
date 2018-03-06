import express from 'express';
import Order from '../models/order';

function errHandler(res) {
  return (err) => {
    res.json(err);
  }
}

function sendData(res) {
  return (data) => {
    res.json(data);
  }
}

export function createOrder({ body: { first, last, product, local, address, city, state, zip, notes } }, res) {
  let order = new Order();
  order.set({
    name: {
      first,
      last },
    product,
    local,
    notes,
    address,
    city,
    state,
    zip
  });

  if (!local) {
    order.set({
      address,
      city,
      state,
      zip
    });
  }

  order.save().then((order) => {
    order.populate('product').execPopulate().then(sendData(res)).catch(errHandler(res));
  }).catch(errHandler(res));
}

export function getOrders(req, res) {
  Order.find().populate('product').then(sendData(res)).catch(errHandler(res));
}

export function getOrder({ params: { order_id } }, res) {
  Order.findById(order_id).populate('product').then(sendData(res)).catch(errHandler(res));
}

export function updateOrder({ body: { first, last, local, address, city, state, zip, notes, done, product }, params: { order_id } }, res) {
  Order.findById(order_id).then((order) => {
    order.set({
      name: {
        first,
        last
      },
      notes,
      local,
      done,
      product,
      address,
      city,
      state,
      zip
    });

    order.save().then((order) => {
      order.populate('product').execPopulate().then(sendData(res)).catch(errHandler(res));
    }).catch(errHandler(res));
  }).catch(errHandler(res));
}

export function deleteOrder({ params: { order_id } }, res) {
  Order.remove({
    _id: order_id
  }).then((order) => {
    res.json(order);
  }).catch(errHandler(res));
}

