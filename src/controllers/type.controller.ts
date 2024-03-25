import { Response, Request } from "express";
import sequelize from "../models/connect.model.js";
import { initModels } from "../models/init-models.js";
import ResponseCreator from "../classes/Response.js";
import { createModel } from "./response.controller.js";
import StringChecker, { NumberChecker } from "../classes/Checker.js";

const model = initModels(sequelize);
const checker = new StringChecker();
const numberChecker = new NumberChecker();

const getTypes = async (req: Request, res: Response) => {
    try {
        const types = await model.Types.findAll({
            attributes: ['type_id', 'type_name'],
            where: {
                is_deleted: 0,
            }
        });

        return ResponseCreator.create(200, createModel(201, 'successfully!', types))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

const createType = async (req: Request, res: Response) => {
    try {
        const { typeName } = req.body;

        //checking syntax typeName
        if (!typeName || !checker.scan(typeName)) return ResponseCreator.create(400, createModel(400, 'type is not correct!', typeName))?.send(res);

        //checking is exist
        const isExist = await model.Types.findOne({
            where: {
                type_name: typeName,
            }
        })

        if (isExist) return ResponseCreator.create(400, createModel(400, 'type has already existed!', typeName))?.send(res);

        const newType = await model.Types.create({
            type_name: typeName,
        })

        return ResponseCreator.create(200, createModel(201, 'successfully!', newType))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }

}

const updateType = async (req: Request, res: Response) => {
    try {
        const { typeId, newTypeName } = req.body;

        if (!newTypeName || !typeId) return ResponseCreator.create(400, createModel(400, 'type or id is not correct!', { typeId, newTypeName }))?.send(res);

        //check type id
        if (!numberChecker.scan(typeId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', typeId))?.send(res);

        //checking syntax typeName
        if (!checker.scan(newTypeName)) return ResponseCreator.create(400, createModel(400, 'type is not correct!', newTypeName))?.send(res);

        //checking is exist
        const isExist = await model.Types.findOne({
            where: {
                type_id: typeId,
            }
        })

        if (!isExist) return ResponseCreator.create(400, createModel(404, 'type not found!', typeId))?.send(res);

        const updatedType = await model.Types.update({ type_name: newTypeName }, {
            where: {
                type_id: typeId,
            }
        })

        return ResponseCreator.create(200, createModel(201, 'created successfully!', updatedType));

    } catch (error) {
        return ResponseCreator.create(500);
    }

}

const deleteType = async (req: Request, res: Response) => {
    try {
        const { typeId } = req.params;

        //check null
        if (!typeId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', typeId))?.send(res);

        //check type id
        if (!numberChecker.scan(typeId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', typeId))?.send(res);

        const isExist = await model.Types.findOne({
            where: {
                type_id: typeId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'type not found!', typeId))?.send(res);

        //delete
        const deletedType = await model.Types.update({ is_deleted: true }, {
            where: {
                type_id: typeId,
            }
        })

        console.log(deletedType)

        return ResponseCreator.create(200, createModel(200, 'deleted successfully!', deletedType))?.send(res);


    } catch (error) {
        return ResponseCreator.create(500);
    }
}

const undoDeleteType = async (req: Request, res: Response) => {
    try {
        const { typeId } = req.params;

        //check null
        if (!typeId) return ResponseCreator.create(400, createModel(400, 'id is not correct!', typeId))?.send(res);

        //check type id
        if (!numberChecker.scan(typeId)) return ResponseCreator.create(400, createModel(400, 'id is not correct!', typeId))?.send(res);

        const isExist = await model.Types.findOne({
            where: {
                type_id: typeId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'type not found!', typeId))?.send(res);

        //delete
        const deletedType = await model.Types.update({ is_deleted: false }, {
            where: {
                type_id: typeId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'undo successfully!', deletedType))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500);
    }
}

export {
    getTypes,
    createType,
    updateType,
    deleteType,
    undoDeleteType
}