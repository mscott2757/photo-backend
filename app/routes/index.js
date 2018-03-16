import express from 'express';
const router = express.Router();
import { login, validateCookie } from '../controllers/users';

router.route('/login').post(login);
router.use(validateCookie);

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));

module.exports = router;
