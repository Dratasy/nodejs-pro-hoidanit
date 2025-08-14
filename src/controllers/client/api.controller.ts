import { AddProductToCart } from "services/client/item.service";
import { Request, Response } from 'express'
import exp from "constants";

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


export {
    postAddProductToCartAPI
}