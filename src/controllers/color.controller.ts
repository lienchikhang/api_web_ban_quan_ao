import { Request, Response } from "express";
import StringChecker, { NumberChecker } from "../classes/Checker.js";
import _Model from "../classes/Model.js";
import ResponseCreator from "../classes/Response.js";
import { createModel } from "./response.controller.js";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();

//::role::client & admin
const getColors = async (req: Request, res: Response) => {
    try {
        const color = await model.Colors.findAll({
            attributes: ['color_id', 'color_hex'],
            where: {
                is_deleted: 0,
            }
        });

        return ResponseCreator.create(200, createModel(201, 'Successfully!', color))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const createColor = async (req: Request, res: Response) => {
    try {
        const { colorHex } = req.body;

        //checking syntax cateName
        if (!colorHex) return ResponseCreator.create(400, createModel(400, 'Invalid color!', colorHex))?.send(res);

        //checking is exist
        const isExist = await model.Colors.findOne({
            where: {
                color_hex: colorHex,
            }
        })

        if (isExist) return ResponseCreator.create(400, createModel(400, 'Color has already existed!', colorHex))?.send(res);

        const newColor = await model.Colors.create({
            color_hex: colorHex,
        })

        return ResponseCreator.create(200, createModel(201, 'Successfully!', newColor))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const deleteColor = async (req: Request, res: Response) => {
    try {
        const { colorId } = req.params;

        //check null
        if (!colorId) return ResponseCreator.create(400, createModel(400, 'Invalid colorId!', colorId))?.send(res);

        //check cate id
        if (!numberChecker.scan(colorId) || !checker.scanSpaceAndChar(colorId)) return ResponseCreator.create(400, createModel(400, 'Invalid colorId!', colorId))?.send(res);

        const isExist = await model.Colors.findOne({
            where: {
                color_id: colorId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Color not found!', colorId))?.send(res);

        //delete
        const deletedColor = await model.Colors.update({ is_deleted: true }, {
            where: {
                color_id: colorId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Delete successfully!', deletedColor))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500);
    }
}

//::role::admin
const undoDeleteColor = async (req: Request, res: Response) => {
    try {
        const { colorId } = req.params;

        //check null
        if (!colorId) return ResponseCreator.create(400, createModel(400, 'Invalid colorId!', colorId))?.send(res);

        //check cate id
        if (!numberChecker.scan(colorId) || !checker.scanSpaceAndChar(colorId)) return ResponseCreator.create(400, createModel(400, 'Invalid colorId!', colorId))?.send(res);

        const isExist = await model.Colors.findOne({
            where: {
                color_id: colorId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Color not found!', colorId))?.send(res);

        //delete
        const deletedColor = await model.Colors.update({ is_deleted: false }, {
            where: {
                color_id: colorId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Undo successfully!', deletedColor))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

export {
    getColors,
    createColor,
    deleteColor,
    undoDeleteColor
}