import express from 'express';
import productRoute from './product.route.js';
import typeRoute from './type.route.js';

const rootRoute = express.Router();

rootRoute.use('/product', productRoute);
rootRoute.use('/type', typeRoute);

export default rootRoute;
