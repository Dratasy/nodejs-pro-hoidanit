import { Request, Response } from 'express';
import { AddProductToCart, deleteProductInCart, getProductById, getProductInCart, handlePlaceOrder, updateCartDetailBeforeCheckout } from 'services/client/item.service';

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

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.redirect('/login');
    }
    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.quantity * +item.price)
        ?.reduce((a, b) => a + b, 0);


    return res.render(`client/product/cart`, {
        cartDetails,
        totalPrice
    });
}


const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await deleteProductInCart(+id, user, user.sumCart);
    }
    else return res.redirect('/login');

    return res.redirect('/cart');
}

const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.redirect('/login');
    }
    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.quantity * +item.price)
        ?.reduce((a, b) => a + b, 0);


    return res.render(`client/product/checkout`, {
        cartDetails,
        totalPrice
    });
}

const postHandleCartToCheckout = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }

    const currentCartDetail: { id: string, quantity: string }[]
        = req.body?.cartDetails ?? [];

    console.log('>>> currentCartDetail: ', currentCartDetail);

    await updateCartDetailBeforeCheckout(currentCartDetail);

    return res.redirect('/checkout');
}

const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

    await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, +totalPrice);
    return res.redirect("/thanks");
}

const getThanksPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }

    return res.render(`client/product/thanks`);
}

export {
    getProductPage, postAddProductToCart, getCartPage, postDeleteProductInCart,
    getCheckoutPage, postHandleCartToCheckout, postPlaceOrder, getThanksPage
}