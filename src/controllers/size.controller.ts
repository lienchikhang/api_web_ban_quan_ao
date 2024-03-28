import { Request, Response } from "express";
import StringChecker, { NumberChecker } from "../classes/Checker.js";
import _Model from "../classes/Model.js";
import ResponseCreator from "../classes/Response.js";
import { createModel } from "./response.controller.js";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();

//::role::client & admin
const getSize = async (req: Request, res: Response) => {
    try {
        const size = await model.Sizes.findAll({
            attributes: ['size_id', 'cate_num'],
            where: {
                is_deleted: 0,
            }
        });

        return ResponseCreator.create(200, createModel(201, 'Successfully!', size))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const createSize = async (req: Request, res: Response) => {
    try {
        const { sizeNum } = req.body;

        //checking syntax cateName
        if (!sizeNum || !numberChecker.scan(sizeNum)) return ResponseCreator.create(400, createModel(400, 'Invalid size!', sizeNum))?.send(res);

        //checking is exist
        const isExist = await model.Sizes.findOne({
            where: {
                size_num: sizeNum,
            }
        })

        if (isExist) return ResponseCreator.create(400, createModel(400, 'Size has already existed!', sizeNum))?.send(res);

        const newCate = await model.Sizes.create({
            size_num: sizeNum,
        })

        return ResponseCreator.create(200, createModel(201, 'Successfully!', newCate))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const deleteSize = async (req: Request, res: Response) => {
    try {
        const { sizeId } = req.params;

        //check null
        if (!sizeId) return ResponseCreator.create(400, createModel(400, 'Invalid sizeId!', sizeId))?.send(res);

        //check cate id
        if (!numberChecker.scan(sizeId) || !checker.scanSpaceAndChar(sizeId)) return ResponseCreator.create(400, createModel(400, 'Invalid sizeId!', sizeId))?.send(res);

        const isExist = await model.Sizes.findOne({
            where: {
                size_id: sizeId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Size not found!', sizeId))?.send(res);

        //delete
        const deletedSize = await model.Sizes.update({ is_deleted: true }, {
            where: {
                size_id: sizeId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Delete successfully!', deletedSize))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::admin
const undoDeleteSize = async (req: Request, res: Response) => {
    try {
        const { sizeId } = req.params;

        //check null
        if (!sizeId) return ResponseCreator.create(400, createModel(400, 'Invalid sizeId!', sizeId))?.send(res);

        //check cate id
        if (!numberChecker.scan(sizeId) || !checker.scanSpaceAndChar(sizeId)) return ResponseCreator.create(400, createModel(400, 'Invalid sizeId!', sizeId))?.send(res);

        const isExist = await model.Sizes.findOne({
            where: {
                size_id: sizeId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Size not found!', sizeId))?.send(res);

        //delete
        const deletedSize = await model.Sizes.update({ is_deleted: false }, {
            where: {
                size_id: sizeId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Undo successfully!', deletedSize))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

export {
    getSize,
    createSize,
    deleteSize,
    undoDeleteSize
}