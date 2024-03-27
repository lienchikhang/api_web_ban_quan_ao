import { Request } from "express";

export interface IRequest extends Request {
    userId: number,
    role: string,
}

export interface IPayload {
    userId: number,
    role: string,
}