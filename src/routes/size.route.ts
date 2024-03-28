import { Router } from 'express';
import { createSize, deleteSize, getSize, undoDeleteSize } from '../controllers/size.controller.js';

const sizeRoute = Router();

sizeRoute.get('/get-sizes', getSize);
sizeRoute.post('/add-size', createSize);
sizeRoute.delete('/delete-size/:sizeId', deleteSize);
sizeRoute.put('/recover-size/:sizeId', undoDeleteSize);

export default sizeRoute;