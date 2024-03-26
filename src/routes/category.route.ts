import { Router } from "express";
import { createCate, deleteCate, getCates, undoDeleteCates, updateCate } from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get('/get-cates', getCates);
categoryRoute.post('/add-cate', createCate);
categoryRoute.put('/update-cate', updateCate);
categoryRoute.delete('/delete-cate/:cateId', deleteCate);
categoryRoute.put('/recover-cate/:cateId', undoDeleteCates);

export default categoryRoute;