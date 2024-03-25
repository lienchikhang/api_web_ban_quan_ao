import { Request, Response } from "express"
import { initModels } from '../models/init-models.js';
import sequelize from "../models/connect.model.js";

const model = initModels(sequelize);

const getProducts = async (req: Request, res: Response) => {
    const products = await model.Types.findAll();

    res.status(200).json({ status: 200, mess: 'successfully!', content: products });
}

export {
    getProducts
}