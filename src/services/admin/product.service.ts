import { prisma } from 'config/client';


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

const getProductList = async () => {
    const products = await prisma.product.findMany();
    return products;
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
    createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById
}