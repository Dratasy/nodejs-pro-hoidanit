import { AddProductToCart } from "services/client/item.service";
import { Request, Response } from 'express'
import exp from "constants";
import { handleDeleteUserById, handleGetAllUser, handleGetUserById, handleUpdateUserById, handleUserLogin } from "services/client/api.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";
import { registerNewUser } from "services/client/auth.service";

const postAddProductToCartAPI = async (req: Request, res: Response) => {
    const { quantity, productId } = req.body;
    const user = req.user;
    const currentSum = req?.user?.sumCart ?? 0;
    const newSum = currentSum + (+quantity);
    await AddProductToCart(+quantity, +productId, user);

    res.status(200).json({
        data: newSum
    })
}

const getAllUsersApi = async (req: Request, res: Response) => {
    const users = await handleGetAllUser();
    const user = req.user;
    console.log(">>> check user: ", user);

    res.status(200).json({
        data: users
    })
}

const getUserByIdApi = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await handleGetUserById(+id);
    res.status(200).json({
        data: user
    })
}

const createUserApi = async (req: Request, res: Response) => {
    const { fullName, username, password } = req.body as TRegisterSchema;

    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.path[0]}: ${item.message}`);

        res.status(400).json({
            errors: errors
        })
        return;
    }

    await registerNewUser(fullName, username, password);

    res.status(201).json({
        data: "create user succeed"
    })
}

const updateUserByIdApi = async (req: Request, res: Response) => {
    const { fullName, address, phone } = req.body;
    const { id } = req.params;


    await handleUpdateUserById(+id, fullName, address, phone);

    res.status(200).json({
        data: "update user succeed"
    })
}

const deleteUserByIdApi = async (req: Request, res: Response) => {

    const { id } = req.params;


    await handleDeleteUserById(+id);

    res.status(200).json({
        data: "delete user succeed"
    })
}

const loginAPI = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const access_token = await handleUserLogin(username, password);
        res.status(200).json({
            data: {
                access_token
            }
        })
    } catch (error) {
        res.status(401).json({
            data: null,
            message: error.message
        })
    }

}



export {
    postAddProductToCartAPI, getAllUsersApi,
    getUserByIdApi,
    createUserApi,
    updateUserByIdApi,
    deleteUserByIdApi,
    loginAPI
}