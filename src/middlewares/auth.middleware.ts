import { NextFunction, Request, RequestHandler, Response } from "express"
import ResponseCreator from "../classes/Response.js"
import { createModel } from "../controllers/response.controller.js"
import { decodeToken, verifyToken, } from "../controllers/jwt.controller.js"
import { IPayload, IRequest } from "../interfaces/auth.interface.js"

const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //get token
        const token = req.headers.token?.toString().split(' ')[1];

        //checking token isEmpty
        if (!token) return ResponseCreator.create(400, createModel(401, 'Invalid token!', ''))?.send(res);

        //verify
        const error = verifyToken(token);

        if (error?.name == 'TokenExpiredError') {
            return ResponseCreator.create(400, createModel(401, 'Token has expired!', error?.name))?.send(res);
        }

        if (error?.name == 'JsonWebTokenError') {
            return ResponseCreator.create(400, createModel(401, 'Invalid token!', error?.name))?.send(res);
        }

        //decode
        const payload = decodeToken(token);
        return next();

    } catch (error) {
        ResponseCreator.create(500)?.send(res);
    }
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    //get token
    const token = req.headers.token?.toString().split(' ')[1];

    //check token
    if (!token) return ResponseCreator.create(400, createModel(401, 'Invalid token!', ''))?.send(res);

    //decode token
    const payload = decodeToken(token);

    //authorize
    if (payload.role != 'admin') return ResponseCreator.create(400, createModel(401, 'No permission', ''))?.send(res);
    return next();
}

const verifyClient = async (req: Request, res: Response, next: NextFunction) => {
    //get token
    //check token
    //verify token
    //if jwttokenerror => return
    //if token expired => next
}

export {
    authenticated,
    verifyAdmin,
}