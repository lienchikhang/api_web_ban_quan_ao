import { Request, Response } from "express"
import ResponseCreator from "../classes/Response.js"
import { createModel } from "./response.controller.js";
import StringChecker, { NumberChecker } from "../classes/Checker.js";
import _Model from "../classes/Model.js";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();

const getCates = async (req: Request, res: Response) => {
    try {
        const cates = await model.Categories.findAll({
            attributes: ['cate_id', 'cate_name'],
            where: {
                is_deleted: 0,
            }
        });

        return ResponseCreator.create(200, createModel(201, 'successfully!', cates))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

const createCate = async (req: Request, res: Response) => {
    try {
        const { cateName } = req.body;

        //checking syntax cateName
        if (!cateName || !checker.scan(cateName)) return ResponseCreator.create(400, createModel(400, 'cate is not correct!', cateName))?.send(res);

        //checking is exist
        const isExist = await model.Categories.findOne({
            where: {
                cate_name: cateName,
            }
        })

        if (isExist) return ResponseCreator.create(400, createModel(400, 'cate has already existed!', cateName))?.send(res);

        const newCate = await model.Categories.create({
            cate_name: cateName,
        })

        return ResponseCreator.create(200, createModel(201, 'successfully!', newCate))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

const updateCate = async (req: Request, res: Response) => {
    try {
        const { cateId, newCateName } = req.body;

        if (!newCateName || !cateId) return ResponseCreator.create(400, createModel(400, 'type or id is not correct!', { cateId, newCateName }))?.send(res);

        //check type id
        if (!numberChecker.scan(cateId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', cateId))?.send(res);

        //checking syntax typeName
        if (!checker.scan(newCateName)) return ResponseCreator.create(400, createModel(400, 'type is not correct!', newCateName))?.send(res);

        //checking is exist
        const isExist = await model.Categories.findOne({
            where: {
                cate_id: cateId,
            }
        })

        if (!isExist) return ResponseCreator.create(400, createModel(404, 'type not found!', cateId))?.send(res);

        const updatedCate = await model.Categories.update({ cate_name: newCateName }, {
            where: {
                cate_id: cateId,
            }
        })

        return ResponseCreator.create(200, createModel(201, 'created successfully!', updatedCate))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500);
    }
}

const deleteCate = async (req: Request, res: Response) => {
    try {
        const { cateId } = req.params;

        //check null
        if (!cateId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', cateId))?.send(res);

        //check cate id
        if (!numberChecker.scan(cateId) || !checker.scanSpaceAndChar(cateId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', cateId))?.send(res);

        const isExist = await model.Categories.findOne({
            where: {
                cate_id: cateId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'cate not found!', cateId))?.send(res);

        //delete
        const deletedType = await model.Categories.update({ is_deleted: true }, {
            where: {
                cate_id: cateId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'deleted successfully!', deletedType))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

const undoDeleteCate = async (req: Request, res: Response) => {
    try {
        const { cateId } = req.params;

        //check null
        if (!cateId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', cateId))?.send(res);

        //check cate id
        if (!numberChecker.scan(cateId) || !checker.scanSpaceAndChar(cateId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', cateId))?.send(res);

        const isExist = await model.Categories.findOne({
            where: {
                cate_id: cateId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'cate not found!', cateId))?.send(res);

        //delete
        const deletedCate = await model.Categories.update({ is_deleted: false }, {
            where: {
                cate_id: cateId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'undo successfully!', deletedCate))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

export {
    getCates,
    createCate,
    updateCate,
    deleteCate,
    undoDeleteCate
}