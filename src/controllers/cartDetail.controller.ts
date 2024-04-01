import { Request, Response } from "express"
import StringChecker, { NumberChecker } from "../classes/Checker.js";
import PrismaModel from "../classes/PrismaModel.js";
import ResponseCreator from "../classes/Response.js"
import { createModel } from "./response.controller.js";

const prisma = PrismaModel.getInstance().create();
const checker = new StringChecker();
const numberChecker = new NumberChecker();

const createCartDetail = async (req: Request, res: Response) => {
    const { productId, cartId, amount, price } = req.body;

    //check productId
    if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!cartId) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);
    if (!amount) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);
    if (!price) return ResponseCreator.create(400, createModel(400, 'Invalid price', price))?.send(res);

    //check is number and has special chars
    if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!numberChecker.scan(cartId) || !checker.scanSpaceAndChar(cartId)) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);
    if (!numberChecker.scan(amount) || !checker.scanSpaceAndChar(amount)) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);
    if (!numberChecker.scan(price) || !checker.scanSpaceAndChar(price)) return ResponseCreator.create(400, createModel(400, 'Invalid price', price))?.send(res);

    //check valid price & amount
    if (!numberChecker.scanPrice(price)) return ResponseCreator.create(400, createModel(400, 'Invalid price', price))?.send(res);
    if (!numberChecker.scanAmount(amount)) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);

    //check isExistProduct
    const isExistProduct = await prisma.products.findUnique({
        where: {
            product_id: productId,
        }
    })
    if (!isExistProduct) return ResponseCreator.create(400, createModel(404, 'Product not found', productId))?.send(res);


    //check isExistCart
    const isExistCart = await prisma.carts.findUnique({
        where: {
            cart_id: cartId,
        }
    })
    if (!isExistCart) return ResponseCreator.create(400, createModel(404, 'Cart not found', cartId))?.send(res);

    //create cartDetail
    const newCartDetail = await prisma.cartDetail.create({
        data: { product_id: productId, cart_id: cartId, amount, price }
    })

    return ResponseCreator.create(200, createModel(201, 'Create successfully!', newCartDetail))?.send(res);

}

const deleteCartDetail = async (req: Request, res: Response) => {
    const { productId, cartId } = req.body;

    //check productId
    if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!cartId) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);

    //check is number and has special chars
    if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!numberChecker.scan(cartId) || !checker.scanSpaceAndChar(cartId)) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);

    //check isExistProduct
    const isExistProduct = await prisma.products.findUnique({
        where: {
            product_id: productId,
        }
    })
    if (!isExistProduct) return ResponseCreator.create(400, createModel(404, 'Product not found', productId))?.send(res);


    //check isExistCart
    const isExistCart = await prisma.carts.findUnique({
        where: {
            cart_id: cartId,
        }
    })
    if (!isExistCart) return ResponseCreator.create(400, createModel(404, 'Cart not found', cartId))?.send(res);

    //create cartDetail
    const deletedCartDetail = await prisma.cartDetail.deleteMany({
        where: {
            cart_id: cartId,
            product_id: productId,
        }
    })

    return ResponseCreator.create(200, createModel(200, 'Delete successfully!', deletedCartDetail))?.send(res);

}

const updateAmountCartDetail = async (req: Request, res: Response) => {
    const { productId, cartId, amount } = req.body;

    //check productId
    if (!productId) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!cartId) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);
    if (!amount) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);

    //check is number and has special chars
    if (!numberChecker.scan(productId) || !checker.scanSpaceAndChar(productId)) return ResponseCreator.create(400, createModel(400, 'Invalid productId', productId))?.send(res);
    if (!numberChecker.scan(cartId) || !checker.scanSpaceAndChar(cartId)) return ResponseCreator.create(400, createModel(400, 'Invalid cartId', cartId))?.send(res);
    if (!numberChecker.scan(amount) || !checker.scanSpaceAndChar(amount)) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);

    //check valid price & amount
    if (!numberChecker.scanAmount(amount)) return ResponseCreator.create(400, createModel(400, 'Invalid amount', amount))?.send(res);

    //check isExistProduct
    const isExistProduct = await prisma.products.findUnique({
        where: {
            product_id: productId,
        }
    })
    if (!isExistProduct) return ResponseCreator.create(400, createModel(404, 'Product not found', productId))?.send(res);


    //check isExistCart
    const isExistCart = await prisma.carts.findUnique({
        where: {
            cart_id: cartId,
        }
    })
    if (!isExistCart) return ResponseCreator.create(400, createModel(404, 'Cart not found', cartId))?.send(res);

    //check isExistCartDetail
    const isExistCartDetail = await prisma.cartDetail.findMany({
        where: {
            cart_id: cartId,
            product_id: productId
        }
    })
    if (!isExistCartDetail) return ResponseCreator.create(400, createModel(404, 'Cart detail not found', null))?.send(res);

    //update cartDetail
    let newPrice = 0;

    let oldAmount = isExistCartDetail.reduce((acc, curVar) => {
        return acc + curVar.amount;
    }, 0)

    if (amount > oldAmount) {
        newPrice = isExistCartDetail.reduce((acc, curVar) => {
            return acc + curVar.price * amount;
        }, 0)
    } else {
        newPrice = isExistCartDetail.reduce((acc, curVar) => {
            return acc + curVar.price * amount;
        }, 0)
    }

    const updateCartDetail = await prisma.cartDetail.updateMany({
        data: { amount, price: newPrice },
        where: {
            cart_id: cartId,
            product_id: productId
        }
    })

    return ResponseCreator.create(200, createModel(201, 'Create successfully!', updateCartDetail))?.send(res);

}

export {
    createCartDetail,
    deleteCartDetail,
    updateAmountCartDetail
}