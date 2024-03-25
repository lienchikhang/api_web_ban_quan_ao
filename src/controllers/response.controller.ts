import { IResponse } from "../interfaces/response.interface.js"

const createModel = (status: number, mess: string, content: any): IResponse => {
    return {
        status,
        mess,
        content,
    }
}


export {
    createModel,
}