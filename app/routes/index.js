import express from 'express';
const router = express.Router();
import { login } from '../controllers/users';

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));

router.route('/login').post(login);

module.exports = router;
