import { AddProductToCart } from "services/client/item.service";
import { Request, Response } from 'express'
import exp from "constants";
import { handleGetAllUser, handleGetUserById } from "services/client/api.service";

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


export {
    postAddProductToCartAPI, getAllUsersApi,
    getUserByIdApi
}