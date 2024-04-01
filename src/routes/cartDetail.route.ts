import { Router } from "express";
import { createCartDetail } from "../controllers/cartDetail.controller.js";

const cartDetailRoute = Router();


cartDetailRoute.post('/create', createCartDetail)


export default cartDetailRoute;