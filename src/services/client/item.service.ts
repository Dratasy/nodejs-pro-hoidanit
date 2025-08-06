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

export {
    getProducts, getProductById, AddProductToCart
}