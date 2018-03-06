import express from 'express';
import Product from '../models/product';

export function createProduct({ body: { name, stock } }, res) {
  let product = new Product();
  product.set({
    name,
    stock
  });
  product.save().then((product) => {
    res.json(product);
  }).catch((err) => {
    res.json(err);
  });
}

export function getProducts(req, res) {
  Product.find().then((products) => {
    res.json(products);
  }).catch((err) => {
    res.json(err);
  });
}

export function getProduct({ params: { product_id } }, res) {
  Product.findById(product_id).then((product) => {
    res.json(product);
  }).catch((err) => {
    res.json(err);
  });
}

export function deleteProduct({ params: { product_id } }, res) {
  Product.remove({
    _id: product_id
  }).then((product) => {
    res.json(product);
  }).catch((err) => {
    res.json(err);
  });
}

export function updateProduct({ params: { product_id }, body: { name, stock } }, res) {
  Product.findById(product_id).then((product) => {
    product.set({
      name,
      stock
    });
    product.save().then((product) => {
      res.json(product);
    }).catch((err) => {
      res.json(err);
    });
  }).catch((err) => {
    res.json(err);
  });
}

