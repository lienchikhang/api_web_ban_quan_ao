import { Request, Response } from "express"
import ResponseCreator from "../classes/Response.js"
import _Model from "../classes/Model.js";
import { createModel } from "./response.controller.js";
import StringChecker, { NumberChecker } from "../classes/Checker.js";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();

//::role::admin
const getPrices = async (req: Request, res: Response) => {
    try {
        const prices = await model.Prices.findAll({
            attributes: ['price_id', 'price_num'],
            where: {
                is_deleted: 0,
            }
        });

        return ResponseCreator.create(200, createModel(201, 'successfully!', prices))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::client
const getPriceById = async (req: Request, res: Response) => {
    try {
        const { priceId } = req.params;

        if (!priceId) return ResponseCreator.create(400, createModel(400, 'Id is not correct!', priceId))?.send(res);

        if (!numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'Id is not correct!', priceId))?.send(res);

        const price = await model.Prices.findByPk(priceId, {
            attributes: ['price_id', 'price_num']
        });

        if (!price) return ResponseCreator.create(400, createModel(404, 'price not found', priceId));

        return ResponseCreator.create(200, createModel(200, 'successfully!', price))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::client
const createPrice = async (req: Request, res: Response) => {
    try {
        const { priceNum } = req.body;

        //checking syntax priceNum
        if (!priceNum || !numberChecker.scan(priceNum) || !checker.scanSpaceAndChar(priceNum)) return ResponseCreator.create(400, createModel(400, 'price is not correct!', priceNum))?.send(res);

        const newPrice = await model.Prices.create({
            price_num: priceNum,
        })

        return ResponseCreator.create(200, createModel(201, 'successfully!', newPrice))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::admin
const updatePrice = async (req: Request, res: Response) => {
    try {
        const { priceId, newPriceNum } = req.body;

        if (!newPriceNum || !priceId) return ResponseCreator.create(400, createModel(400, 'type or id is not correct!', { priceId, newPriceNum }))?.send(res);

        //check price id
        if (!numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', priceId))?.send(res);

        //check newPriceNum
        if (!numberChecker.scan(newPriceNum) || !checker.scanSpaceAndChar(newPriceNum)) return ResponseCreator.create(400, createModel(400, 'price is not correct!', newPriceNum))?.send(res);

        //checking is exist
        const isExist = await model.Prices.findOne({
            where: {
                price_id: priceId,
            }
        })

        if (!isExist) return ResponseCreator.create(400, createModel(404, 'price not found!', priceId))?.send(res);

        const updatedCate = await model.Prices.update({ price_num: newPriceNum }, {
            where: {
                price_id: priceId,
            }
        })

        return ResponseCreator.create(200, createModel(201, 'updated successfully!', updatedCate))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::admin
const deletePrice = async (req: Request, res: Response) => {
    try {
        const { priceId } = req.params;

        //check null
        if (!priceId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', priceId))?.send(res);

        //check cate id
        if (!numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', priceId))?.send(res);

        const isExist = await model.Prices.findOne({
            where: {
                price_id: priceId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'price not found!', priceId))?.send(res);

        //delete
        const deletedType = await model.Prices.update({ is_deleted: true }, {
            where: {
                price_id: priceId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'deleted successfully!', deletedType))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::admin
const undoDeletePrice = async (req: Request, res: Response) => {
    try {
        const { priceId } = req.params;

        //check null
        if (!priceId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', priceId))?.send(res);

        //check cate id
        if (!numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', priceId))?.send(res);

        const isExist = await model.Prices.findOne({
            where: {
                price_id: priceId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'price not found!', priceId))?.send(res);

        //delete
        const deletedCate = await model.Prices.update({ is_deleted: false }, {
            where: {
                price_id: priceId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'undo successfully!', deletedCate))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

export {
    getPrices,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice,
    undoDeletePrice
}