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

export {
    createProduct, getProductList
}