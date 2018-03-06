import express from 'express';
const router = express.Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;
