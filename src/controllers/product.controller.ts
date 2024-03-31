import { Request, Response } from "express"
import _Model from "../classes/Model.js";
import StringChecker, { NumberChecker, ObjectChecker } from "../classes/Checker.js";
import ResponseCreator from "../classes/Response.js";
import { createModel } from "./response.controller.js";
import { Op, WhereOptions } from 'sequelize'
import { parse } from "dotenv";
import { ICondition, IIncludeCondition, IProduct, IProductType } from "../interfaces/product.interface.js";
import { ProductsAttributes } from "../models/Products.js";
import PrismaModel from "../classes/PrismaModel.js";

const model = _Model.getInstance().init();
const checker = new StringChecker();
const numberChecker = new NumberChecker();
const objectChecker = new ObjectChecker();
const prisma = PrismaModel.getInstance().create();


//::role::client && admin
const getProducts = async (req: Request, res: Response) => {
    try {
        let { pageSize = 5, lastRecord = 0, size, color } = req.query;
        let products: Array<IProduct>;
        console.log({ pageSize, lastRecord, size, color })

        //check lastRecord is number
        if (!numberChecker.scan(lastRecord)) return ResponseCreator.create(400, createModel(400, 'Invalid next record', lastRecord))?.send(res);

        //check size is a string and doesnt have special char
        if (!checker.scanSpaceAndChar(size as string)) return ResponseCreator.create(400, createModel(400, 'Invalid size', size))?.send(res);

        //check color
        if (!checker.scanSpaceAndChar(color as string)) return ResponseCreator.create(400, createModel(400, 'Invalid color', color))?.send(res);

        lastRecord = parseInt(lastRecord as string);
        pageSize = parseInt(pageSize as string);

        //base mapping
        const includes = [{
            model: model.Prices,
            attributes: ['price_num'],
            as: 'price'
        }, {
            model: model.Images,
            attributes: ['img_url'],
            as: 'Images'
        }] as Array<IIncludeCondition>;

        //if has size condition => add to base mapping
        if (size) {
            includes.push({
                model: model.Sizes,
                attributes: ['size_key'],
                as: 'size_id_Sizes',
                where: {
                    size_key: size.toString().toUpperCase()
                }
            })
        }

        //if has color condition => add to base mapping
        if (color) {
            includes.push({
                model: model.Colors,
                attributes: ['color_name'],
                as: 'color_id_Colors',
                where: {
                    color_name: color.toString().toUpperCase()
                }
            })
        }

        products = await model.Products.findAll({
            attributes: ['product_id', 'product_name', 'product_desc'],
            include: includes,
            where: {
                [Op.and]: [
                    { is_deleted: 0 },
                    {
                        product_id: {
                            [Op.gt]: lastRecord
                        }
                    },
                ]
            },
            limit: pageSize,
        });

        const testProduct = await prisma.products.findMany({
            select: {
                product_id: true,
                product_name: true,
                product_desc: true,
                Prices: {
                    select: {
                        price_num: true,
                    }
                },
                Images: {
                    select: {
                        img_url: true,
                    }
                },
            },
            where: {
                AND: {
                    is_deleted: false,
                    product_id: {
                        gt: lastRecord,
                    }
                }
            },
            take: pageSize,
        });

        return ResponseCreator.create(200, createModel(200, 'Successfully!', { productList: testProduct, lastRecord: products[products.length - 1]?.product_id }))?.send(res);

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

        let product = await model.Products.findByPk(productId, {
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
            }, {
                model: model.Images,
                attributes: ['img_url'],
                as: 'Images'
            }, {
                model: model.Product_Size,
                attributes: ['size_id'],
                include: [{
                    model: model.Sizes,
                    attributes: ['size_key'],
                    as: 'size'
                }],
                as: 'Product_Sizes'
            }, {
                model: model.Product_Color,
                attributes: ['color_id'],
                include: [{
                    model: model.Colors,
                    attributes: ['color_hex', 'color_name'],
                    as: 'color'
                }],
                as: 'Product_Colors'
            }],
        });

        let finalProduct = convertProduct(product as IProduct);

        if (!product) return ResponseCreator.create(400, createModel(404, 'Product not found', productId))?.send(res);

        return ResponseCreator.create(200, createModel(200, 'Successfully!', finalProduct))?.send(res);
    } catch (error) {
        console.log('err:: ', error)
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

const convertProduct = (product: IProduct) => {
    return {
        product_id: product.product_id,
        product_name: product.product_name,
        product_desc: product.product_desc,
        type: product.type ? product.type.type_name : null,
        cate: product.cate ? product.cate.cate_name : null,
        price: product.price ? product.price.price_num : null,
        images: product.Images ? product.Images.map(image => image.img_url) : [],
        sizes: product.Product_Sizes ? product.Product_Sizes.map(size => ({
            size_id: size.size_id,
            size_key: size.size ? size.size.size_key : null
        })) : [],
        colors: product.Product_Colors ? product.Product_Colors.map(color => ({
            color_id: color.color_id,
            color_hex: color.color ? color.color.color_hex : null,
            color_name: color.color ? color.color.color_name : null
        })) : []
    };
}

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    undoDeleteProduct
}
