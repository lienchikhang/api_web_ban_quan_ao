import jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/auth.interface.js';

const secretTokenKey = '123-123-123-123'
const secretRefreshTokenKey = '456-456-456-456'


const verifyToken = (token: string): jwt.VerifyErrors | null => {
    try {
        jwt.verify(token, secretTokenKey);
        return null;
    } catch (error) {
        return error as jwt.VerifyErrors;
    }
}

const decodeToken = (token: string) => {
    return jwt.decode(token) as IPayload;
}

const createToken = (payload: IPayload): string => {
    return jwt.sign(payload, secretTokenKey, {
        expiresIn: '15s'
    });
}

const createRefreshToken = (payload: IPayload): string => {
    return jwt.sign(payload, secretRefreshTokenKey, {
        expiresIn: '30d',
    });
}

const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, secretRefreshTokenKey, err => err);
}

export {
    verifyToken,
    createToken,
    decodeToken,
    createRefreshToken,
    verifyRefreshToken,
}