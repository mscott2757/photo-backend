import express from 'express';
const router = express.Router();

import {
  createUser,
  getUsers,
  deleteUser
} from '../controllers/users';

router.route('/')
  .post(createUser)
  .get(getUsers);

router.route('/:user_id')
  .delete(deleteUser);

module.exports = router;
