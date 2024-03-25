import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.get('/', getProducts);

export default productRoute;