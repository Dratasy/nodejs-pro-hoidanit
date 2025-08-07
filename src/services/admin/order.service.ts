import { prisma } from "config/client";

const getOrderAdmin = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: true
        }
    });
    return orders;
}

const getOrderDetailAdmin = async (orderId: number) => {
    const orderDetail = await prisma.orderDetail.findMany({
        where: {
            orderId: orderId
        },
        include: {
            product: true
        }
    });
    
    return orderDetail;
}

export {
    getOrderAdmin,
    getOrderDetailAdmin
}