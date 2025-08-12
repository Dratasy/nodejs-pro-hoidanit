import { Request, Response } from 'express';
import { AddProductToCart, deleteProductInCart, getOrderHistory, getProductById, getProductInCart, handlePlaceOrder, updateCartDetailBeforeCheckout } from 'services/client/item.service';

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

    const cartId = cartDetails.length ? cartDetails[0].cartId : 0;

    return res.render(`client/product/cart`, {
        cartDetails,
        totalPrice,
        cartId
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

    const { cartId } = req.body;

    const currentCartDetail: { id: string, quantity: string }[]
        = req.body?.cartDetails ?? [];

    console.log('>>> currentCartDetail: ', currentCartDetail);

    await updateCartDetailBeforeCheckout(currentCartDetail, cartId);

    return res.redirect('/checkout');
}

const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

    const message = await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, +totalPrice);

    if (message) return res.redirect('/checkout');

    return res.redirect("/thanks");
}

const getThanksPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }

    return res.render(`client/product/thanks`);
}

const getOrderHistoryPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }

    const orders = await getOrderHistory(user.id);

    return res.render(`client/product/order.history.ejs`, {
        orders
    });
}

const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    if (!user) return res.redirect("/login");
    await AddProductToCart(+quantity, +id, user);
    return res.redirect(`/product/${id}`);
}

export {
    getProductPage, postAddProductToCart, getCartPage, postDeleteProductInCart,
    getCheckoutPage, postHandleCartToCheckout, postPlaceOrder, getThanksPage,
    getOrderHistoryPage, postAddToCartFromDetailPage
}