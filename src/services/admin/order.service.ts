import { prisma } from "config/client";
import { TOTAL_ITEMS_PER_PAGE } from "config/constant";

const getOrderAdmin = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize;
    const orders = await prisma.order.findMany({
        skip: skip,
        take: pageSize,
        include: {
            user: true
        }
    });
    return orders;
}


const countTotalOrderPages = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.order.count();

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
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
    getOrderDetailAdmin,
    countTotalOrderPages
}