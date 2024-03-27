import express from 'express';
import productRoute from './product.route.js';
import typeRoute from './type.route.js';
import categoryRoute from './category.route.js';
import priceRoute from './price.route.js';
import authRoute from './auth.route.js';

const rootRoute = express.Router();

rootRoute.use('/auth', authRoute);
rootRoute.use('/product', productRoute);
rootRoute.use('/type', typeRoute);
rootRoute.use('/category', categoryRoute);
rootRoute.use('/price', priceRoute);

export default rootRoute;
