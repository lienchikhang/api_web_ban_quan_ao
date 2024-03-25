import { Response } from "express";
import { IResponse } from "../interfaces/response.interface.js";

class ConcreteResponse implements IResponse {
    status: number;
    mess;
    content;

    constructor({ status, mess, content }: IResponse) {
        this.status = status;
        this.mess = mess;
        this.content = content;
    }

    send(res: Response) {
        return res.status(this.status).json({
            status: this.status,
            mess: this.mess,
            content: this.content,
        })
    }
}

class ResponseInternalError extends ConcreteResponse {
    constructor() {
        super({
            status: 500,
            mess: 'Internal Server Error',
            content: 'error'
        })
    }
}

class ResponseError extends ConcreteResponse {
    constructor(status: number, mess: string, content: any) {
        super({
            status,
            mess,
            content,
        })
    }
}

class ResponseSuccess extends ConcreteResponse {
    constructor(status: number, mess: string, content: any) {
        super({
            status,
            mess,
            content,
        })
    }
}

class ResponseCreator {
    static create(type: number, object?: IResponse) {
        switch (type) {
            case 200: {
                if (object)
                    return new ResponseSuccess(object.status, object.mess, object.content);
                else
                    throw new SyntaxError('object cannot be empty')
            }
            case 400: {
                if (object)
                    return new ResponseError(object.status, object.mess, object.content);
                else
                    throw new SyntaxError('object cannot be empty')
            }
            case 500: {
                return new ResponseInternalError();
            }
        }
    }
}

export default ResponseCreator;