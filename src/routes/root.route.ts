import express from 'express';
import productRoute from './product.route.js';

const rootRouter = express.Router();

rootRouter.use('/product', productRoute);

export default rootRouter;
