import { Request, Response } from "express"
import ResponseCreator from "../classes/Response.js"
import _Model from "../classes/Model.js";
import { createModel } from "./response.controller.js";
import StringChecker from "../classes/Checker.js";
import { hashSync, compareSync } from 'bcrypt';
import { createRefreshToken, createToken } from "./jwt.controller.js";
import { IRequest } from "../interfaces/auth.interface.js";


const model = _Model.getInstance().init();
const checker = new StringChecker();

const register = async (req: Request, res: Response) => {
    try {
        //get data
        const { email, password } = req.body;

        //check data is empty
        if (!email || !password) return ResponseCreator.create(400, createModel(400, 'Email or password cannot be empty', { email, password }))?.send(res);

        //check email type
        if (!checker.scanEmail(email)) return ResponseCreator.create(400, createModel(400, 'Invalid email!', email))?.send(res);

        //check isExist
        const isExist = await model.Users.findOne({
            where: {
                email,
            }
        })

        if (isExist) return ResponseCreator.create(400, createModel(400, 'Email has already existed!', email))?.send(res);

        //encrypt password
        const encryptPass = hashSync(password, 5);

        //create newUser
        await model.Users.create({
            email,
            pass_word: encryptPass,
        })

        return ResponseCreator.create(200, createModel(201, 'Register successfully!', ''))?.send(res);

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        //get data
        const { email, password } = req.body;

        //check data
        if (!email || !password) return ResponseCreator.create(400, createModel(400, 'Invalid email or password!', { email, password }))?.send(res);

        //check valid email
        if (!checker.scanEmail(email)) return ResponseCreator.create(400, createModel(400, 'Invalid email!', email))?.send(res);

        //check exist
        const isExist = await model.Users.findOne({
            where: {
                email,
            }
        })

        if (!isExist) return ResponseCreator.create(400, createModel(404, 'Email not found!', email))?.send(res);

        //check password
        if (isExist.dataValues.pass_word) {
            const isValidPassword = compareSync(password, isExist.dataValues.pass_word);
            if (!isValidPassword) return ResponseCreator.create(400, createModel(400, 'Email or password is not correct!', { email, password }))?.send(res);
        }


        //create accessToken & refreshToken
        if (isExist.dataValues.user_id && isExist.dataValues.user_role) {
            const accessToken = createToken({
                userId: isExist.dataValues.user_id,
                role: isExist.dataValues.user_role,
            })

            const refreshToken = createRefreshToken({
                userId: isExist.dataValues.user_id,
                role: isExist.dataValues.user_role,
            })

            //save refreshToken into database
            await model.Users.update({ refresh_token: refreshToken }, {
                where: {
                    user_id: isExist.dataValues.user_id
                }
            })

            //return accessToken
            return ResponseCreator.create(200, createModel(201, 'Login successfully!', accessToken))?.send(res);
        }

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

const loginFacebook = (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

const loginGoogle = (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ResponseCreator.create(500)?.send(res);
    }
}

const test = (req: Request, res: Response) => {
    return res.status(200).send('successfully')
}
export {
    register,
    login,
    loginFacebook,
    loginGoogle,
    test
}