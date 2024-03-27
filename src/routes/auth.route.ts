import { Router } from "express";
import { login, loginFacebook, loginGoogle, register, test } from "../controllers/auth.controller.js";
import { authenticated } from "../middlewares/auth.middleware.js";
import { IRequest } from '../interfaces/auth.interface.js';

const authRoute = Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/loginFacebook', loginFacebook);
authRoute.post('/loginGoogle', loginGoogle);
authRoute.post('/test', authenticated, test);

export default authRoute;