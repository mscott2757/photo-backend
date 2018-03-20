import express from 'express';
import User from '../models/user';
import { errHandler, dataHandler } from './utils';

export function createUser({ body: { username, password } }, res) {
  let user = new User();
  user.set({ username, password });
  user.save()
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function getUsers(req, res) {
  User.find()
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function deleteUser({ params: { user_id } }, res) {
  User.remove({ _id: user_id })
  .then(dataHandler(res))
  .catch(errHandler(res));
}

export function login({ body: { username, password } }, res) {
  User.findOne({ username }).then((user) => {
    if (user.validPassword(password)) {
      res.json({
        success: true,
       _id: user._id
      });
    } else {
      res.json({
        success: false,
        message: 'Incorrect Password'
      });
    }
  }).catch((err) => {
    res.json({
      success: false,
      message: "User not found"
    });
  });
}

export function validateUser({ body: { _id } }, res) {
  User.findById(_id).then((user) => {
    if (user) {
      res.json({
        success: true,
        _id: user._id
      });
    } else {
      res.json({
        success: false,
        message: 'User not logged in, redirecting to login page'
      });
    }
  }).catch(errHandler);
}

export function validateCookie({ cookies: { userId } }, res, next) {
  User.findById(userId).exec().then((user) => {
    if (user) {
      next();
    } else {
      res.status(401).json({
        message: 'User not logged in',
        hello: 'world',
        userId
      });
    }
  }).catch(errHandler);
}

