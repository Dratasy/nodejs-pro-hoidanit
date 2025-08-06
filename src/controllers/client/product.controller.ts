import { Request, Response } from 'express';
import { AddProductToCart, getProductById } from 'services/client/item.service';

const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render(`client/product/detail.ejs`, {
        product: product
    });
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await AddProductToCart(1, +id, user);
    }
    else res.redirect('/login');

    return res.redirect('/');
}

const getCartPage = (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.redirect('/login');
    }

    return res.render(`client/product/cart`);
}


export {
    getProductPage, postAddProductToCart, getCartPage
}