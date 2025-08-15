import { AddProductToCart } from "services/client/item.service";
import { Request, Response } from 'express'
import exp from "constants";
import { handleDeleteUserById, handleGetAllUser, handleGetUserById, handleUpdateUserById } from "services/client/api.service";
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

export {
    postAddProductToCartAPI, getAllUsersApi,
    getUserByIdApi,
    createUserApi,
    updateUserByIdApi,
    deleteUserByIdApi
}