import { Request, Response } from "express"
import _Model from "../classes/Model.js";
import StringChecker, { NumberChecker, ObjectChecker } from "../classes/Checker.js";
import ResponseCreator from "../classes/Response.js";
import { createModel } from "./response.controller.js";
import { Op } from 'sequelize'
import { parse } from "dotenv";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();
const objectChecker = new ObjectChecker();

//::role::client && admin
const getProducts = async (req: Request, res: Response) => {
    try {
        let { pageSize = 5, lastRecord = 0 } = req.query;

        if (!numberChecker.scan(lastRecord)) return;

        lastRecord = parseInt(lastRecord as string);
        pageSize = parseInt(pageSize as string);

        const products = await model.Products.findAll({
            attributes: ['product_id', 'product_name', 'product_desc'],
            include: [{
                model: model.Prices,
                attributes: ['price_num'],
                as: 'price'
            }, {
                model: model.Images,
                attributes: ['img_url'],
                as: 'Images'
            }],
            where: {
                [Op.and]: {
                    is_deleted: 0,
                    product_id: {
                        [Op.gt]: lastRecord
                    }
                }
            },
            limit: pageSize,
        });

        return ResponseCreator.create(200, createModel(200, 'Successfully!', { productList: products, lastRecord: products[products.length - 1].product_id }))?.send(res);
    } catch (error) {
        console.log('err:: ', error);
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::client && admin
const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        const product = await model.Products.findByPk(productId, {
            attributes: ['product_id', 'product_name', 'product_desc'],
            include: [{
                model: model.Types,
                attributes: ['type_name'],
                as: 'type'
            }, {
                model: model.Categories,
                attributes: ['cate_name'],
                as: 'cate'
            }, {
                model: model.Prices,
                attributes: ['price_num'],
                as: 'price'
            }, 'Images'],
        });

        if (!product) return ResponseCreator.create(400, createModel(404, 'Product not found', productId));

        return ResponseCreator.create(200, createModel(200, 'Successfully!', product))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const createProduct = async (req: Request, res: Response) => {
    try {
        const { productName, productDesc, typeId, cateId, priceId } = req.body;

        //checking syntax productName
        if (!productName || !checker.scanSpaceAndChar(productName)) return ResponseCreator.create(400, createModel(400, 'Invalid productName!', productName))?.send(res);

        //checking syntax productDesc
        if (!productDesc || !checker.hasSpecialChar(productDesc)) return ResponseCreator.create(400, createModel(400, 'Invalid productDesc!', productDesc))?.send(res);

        //checking syntax typeId
        if (!typeId || !numberChecker.scan(typeId) || !checker.scanSpaceAndChar(typeId)) return ResponseCreator.create(400, createModel(400, 'Invalid typeId!', typeId))?.send(res);

        //checking syntax cateId
        if (!cateId || !numberChecker.scan(cateId) || !checker.scanSpaceAndChar(cateId)) return ResponseCreator.create(400, createModel(400, 'Invalid cateId!', cateId))?.send(res);

        //checking syntax priceId
        if (!priceId || !numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'Invalid priceId!', priceId))?.send(res);

        //check exist product name
        const doesNameExist = productName && await model.Products.findOne({
            where: {
                product_name: productName,
            }
        })
        if (doesNameExist) return ResponseCreator.create(400, createModel(400, 'Product has already existed!', productName))?.send(res);
        //check typeId exists
        const isTypeExist = await model.Types.findByPk(typeId);
        if (!isTypeExist) return ResponseCreator.create(400, createModel(404, 'Type not found!', typeId))?.send(res);

        //check cateId exists
        const isCateExist = await model.Categories.findByPk(cateId);
        if (!isCateExist) return ResponseCreator.create(400, createModel(404, 'Cate not found!', cateId))?.send(res);

        //check priceId exists
        const isPriceExist = await model.Prices.findByPk(priceId);
        if (!isPriceExist) return ResponseCreator.create(400, createModel(404, 'Price not found!', priceId))?.send(res);

        const newProduct = await model.Products.create({
            product_name: productName,
            product_desc: productDesc,
            price_id: priceId,
            cate_id: cateId,
            type_id: typeId,
        })

        return ResponseCreator.create(200, createModel(201, 'Successfully!', newProduct))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { productName, productDesc, typeId, cateId, priceId } = req.body;
        console.log('body:: ', req.body);

        //check productId
        if (!productId || !numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        //check hasData
        if (objectChecker.isEmptyObject(req.body)) return ResponseCreator.create(200, createModel(200, 'There is nothing to update!', ''))?.send(res);

        //checking is exist
        const isExist = await model.Products.findOne({
            where: {
                product_id: productId,
            }
        })

        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Product not found!', productId))?.send(res);

        //checking syntax productName
        if (productName && !checker.scanSpaceAndChar(productName)) return ResponseCreator.create(400, createModel(400, 'Invalid productName!', productName))?.send(res);

        //checking syntax productDesc
        if (productDesc && !checker.scanSpaceAndChar(productDesc)) return ResponseCreator.create(400, createModel(400, 'Invalid productDesc!', productDesc))?.send(res);

        //checking syntax typeId
        if (typeId && !numberChecker.scan(typeId) || !checker.scanSpaceAndChar(typeId)) return ResponseCreator.create(400, createModel(400, 'Invalid typeId!', typeId))?.send(res);

        //checking syntax cateId
        if (cateId && !numberChecker.scan(cateId) || !checker.scanSpaceAndChar(cateId)) return ResponseCreator.create(400, createModel(400, 'Invalid cateId!', cateId))?.send(res);

        //checking syntax priceId
        if (priceId && !numberChecker.scan(priceId) || !checker.scanSpaceAndChar(priceId)) return ResponseCreator.create(400, createModel(400, 'Invalid priceId!', priceId))?.send(res);

        //check exist product name
        const doesNameExist = productName && await model.Products.findOne({
            where: {
                product_name: productName,
            }
        })

        if (doesNameExist) return ResponseCreator.create(400, createModel(400, 'Product name has already existed!', productName))?.send(res);

        //check typeId exists
        if (typeId) {
            const isTypeExist = await model.Types.findByPk(typeId);
            if (!isTypeExist) return ResponseCreator.create(400, createModel(404, 'Type not found!', typeId))?.send(res);
        }

        //check cateId exists
        if (cateId) {
            const isCateExist = await model.Categories.findByPk(cateId);
            if (!isCateExist) return ResponseCreator.create(400, createModel(404, 'Cate not found!', cateId))?.send(res);
        }

        //check priceId exists
        if (priceId) {
            const isPriceExist = await model.Prices.findByPk(priceId);
            if (!isPriceExist) return ResponseCreator.create(400, createModel(404, 'Price not found!', priceId))?.send(res);
        }

        let updatedProduct = productName && await model.Products.update({ product_name: productName }, {
            where: {
                product_id: productId,
            }
        })

        updatedProduct = productDesc && await model.Products.update({ product_desc: productDesc }, {
            where: {
                product_id: productId,
            }
        })

        updatedProduct = typeId && await model.Products.update({ type_id: typeId }, {
            where: {
                product_id: productId,
            }
        })

        updatedProduct = cateId && await model.Products.update({ cate_id: cateId }, {
            where: {
                product_id: productId,
            }
        })

        updatedProduct = priceId && await model.Products.update({ price_id: priceId }, {
            where: {
                product_id: productId,
            }
        })

        if (!updatedProduct) return ResponseCreator.create(200, createModel(200, 'There is nothing to update!', ''))?.send(res);

        return ResponseCreator.create(200, createModel(201, 'Update successfully!', updatedProduct))?.send(res);

    } catch (error) {
        console.log('err:: ', error);
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        //check null
        if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        //check cate id
        if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        const isExist = await model.Products.findOne({
            where: {
                product_id: productId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Product not found!', productId))?.send(res);

        //delete
        const deletedProduct = await model.Products.update({ is_deleted: true }, {
            where: {
                product_id: productId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Delete successfully!', deletedProduct))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

//::role::admin
const undoDeleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        //check null
        if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        //check cate id
        if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId!', productId))?.send(res);

        const isExist = await model.Products.findOne({
            where: {
                product_id: productId,
            }
        })

        //check exist
        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Product not found!', productId))?.send(res);

        //delete
        const deletedCate = await model.Products.update({ is_deleted: false }, {
            where: {
                product_id: productId,
            }
        })

        return ResponseCreator.create(200, createModel(200, 'Undo successfully!', deletedCate))?.send(res);
    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    undoDeleteProduct
}
