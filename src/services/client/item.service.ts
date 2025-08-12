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

const deleteProductInCart = async (cardDetailId: number, user: Express.User, sumCart: number) => {
    const currentCartDetail = await prisma.cartDetail.findUnique({
        where: {
            id: cardDetailId
        }
    })
    const quantity = currentCartDetail.quantity;

    await prisma.cartDetail.delete({
        where: {
            id: cardDetailId
        }
    })

    if (sumCart === 1) {
        await prisma.cart.delete({
            where: {
                userId: user.id
            }
        })
    } else {
        await prisma.cart.update({
            where: {
                userId: user.id
            },
            data: {
                sum: {
                    decrement: quantity
                }
            }
        })
    }
}

const updateCartDetailBeforeCheckout = async (data: { id: string, quantity: string }[], cartId: string) => {
    let quantity = 0;
    for (let i = 0; i < data.length; i++) {
        quantity += +data[i].quantity
        await prisma.cartDetail.update({
            where: {
                id: +data[i].id
            },
            data: {
                quantity: +data[i].quantity
            }
        })
    }

    //update cart sum
    await prisma.cart.update({
        where: {
            id: +cartId
        },
        data: {
            sum: quantity
        }
    })
}

const handlePlaceOrder = async (
    userId: number,
    receiverName: string,
    receiverAdress: string,
    receiverPhone: string,
    totalPrice: number
) => {
    try {
        //tao transaction
        await prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
                where: {
                    userId: userId,
                },
                include: {
                    cartDetails: true
                }
            })

            if (cart) {


                //create order
                const dataOrderDetail = cart?.cartDetails?.map((item) => ({
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId,
                })) ?? [];

                await tx.order.create({
                    data: {
                        receiverAddress: receiverAdress,
                        receiverName: receiverName,
                        receiverPhone: receiverPhone,
                        paymentMethod: "COD",
                        paymentStatus: "PAYMENT_UNPAID",
                        status: "pending",
                        totalPrice: totalPrice,
                        userId: userId,
                        orderDetails: {
                            create: dataOrderDetail
                        }
                    }
                })

                //remove cartDetail + cart
                await tx.cartDetail.deleteMany({
                    where: {
                        cartId: cart.id
                    }
                })

                await tx.cart.delete({
                    where: {
                        id: cart.id
                    }
                })

                //check product

                for (let i = 0; i < cart.cartDetails.length; i++) {
                    const productId = cart.cartDetails[i].productId;
                    const product = await tx.product.findUnique({
                        where: { id: productId }
                    })
                    if (!product || product.quantity < cart.cartDetails[i].quantity) {
                        throw new Error(`Sản phẩm ${product?.name} khong ton tai hoac khong du so luong`)
                    }

                    await tx.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            quantity: {
                                decrement: cart.cartDetails[i].quantity
                            },
                            sold: {
                                increment: cart.cartDetails[i].quantity
                            }
                        }
                    })
                }

            }
        })
        return "";
    } catch (error) {
        console.log(error);
        return error.message;
    }




}

const getOrderHistory = async (userId: number) => {
    return await prisma.order.findMany({
        where: {
            userId: userId
        },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    })
}

export {
    getProducts, getProductById, AddProductToCart, getProductInCart,
    deleteProductInCart, updateCartDetailBeforeCheckout, handlePlaceOrder,
    getOrderHistory
}