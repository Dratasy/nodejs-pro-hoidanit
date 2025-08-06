import { prisma } from "config/client";


const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })
    return product;
}

const AddProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    });

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (cart) {
        //update
        //cap nhat sum gio hang
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })

        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })

        //cap nhat cart detail 
        //neu chua co -> tao moi, co roi -> cap nhat quantity
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                quantity: quantity,
                price: product.price,
                productId: productId,
                cartId: cart.id
            }

        })

    }
    else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            quantity: quantity,
                            price: product.price,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId
        }
    })

    if (cart) {
        const cartDetails = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return cartDetails;
    }

    return [];
}

export {
    getProducts, getProductById, AddProductToCart, getProductInCart
}