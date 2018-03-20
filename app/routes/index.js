import express from 'express';
const router = express.Router();
import { login, validateUser, validateCookie } from '../controllers/users';

router.route('/login').post(login);
router.route('/validate').post(validateUser);
//router.use(validateCookie);

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));

module.exports = router;
