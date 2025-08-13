import { prisma } from 'config/client';
import { TOTAL_ITEMS_PER_PAGE } from 'config/constant';


const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string
) => {
    const newProduct = await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image && { image: image })
        }
    });

    return newProduct;
}

const getProductList = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
    return products;
}

const countTotalProductPages = async () => {
    const totalProducts = await prisma.product.count();
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalPages = Math.ceil(totalProducts / pageSize);
    return totalPages;
}

const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: {
            id: id
        }

    })

}

const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })
    return product;
}

const updateProductById = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string
) => {
    await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image && { image: image })
        }
    })

}

export {
    createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById,
    countTotalProductPages
}