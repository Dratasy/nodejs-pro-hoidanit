import { prisma } from "config/client"

const userFilter = async (usernameInput: string) => {
    return prisma.user.findMany({
        where: {
            username: {
                contains: usernameInput
            }
        }
    })
}

// Yêu cầu 1: http://localhost:8080/products?minPrice=1000000
// Lấy ra tất cả sản phẩm có giá (price) tối thiểu là 1.000.000 (vnd)
const yeucau1 = async (minPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: minPrice
            }
        }
    })
}


// Yêu cầu 2: http://localhost:8080/products?maxPrice=15000000
// Lấy ra tất cả sản phẩm có giá (price) tối đa là 15.000.000 (vnd)
const yeucau2 = async (maxPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                lte: maxPrice
            }
        }
    })
}

// Yêu cầu 3: http://localhost:8080/products?factory=APPLE
// Lấy ra tất cả sản phẩm có hãng sản xuất = APPLE
const yeucau3 = async (factory: string) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                equals: factory
            }
        }
    })
}

// Yêu cầu 4: http://localhost:8080/products?factory=APPLE,DELL
// Lấy ra tất cả sản phẩm có hãng sản xuất = APPLE hoặc DELL . Truyền nhiều điều kiện,
// ngăn cách các giá trị bởi dấu phẩy (điều kiện IN)
const yeucau4 = async (factoryArray: string[]) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                in: factoryArray
            }
        }
    })
}


// Yêu cầu 5: http://localhost:8080/products?price=10-toi-15-trieu
// Lấy ra tất cả sản phẩm theo range (khoảng giá). 10 triệu <= price <= 15 triệu
const yeucau5 = async (min: number, max: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: min,
                lte: max
            }
        }
    })
}


// Yêu cầu 6: http://localhost:8080/products?price=10-toi-15-trieu,16-toi-20-trieu
// Lấy ra tất cả sản phẩm theo range (khoảng giá). 10 triệu <= price <= 15 triệu và
// 16 triệu <= price <= 20 triệu
const yeucau6 = async () => {
    return await prisma.product.findMany({
        where: {
            OR: [
                { price: { gte: 10000000, lte: 15000000 } },
                { price: { gte: 16000000, lte: 20000000 } }
            ]
        }
    })
}

// Yêu cầu 7: http://localhost:8080/products?sort=price,asc
// Lấy ra tất cả sản phẩm và sắp xếp theo giá tăng dần
const yeucau7 = async () => {
    return await prisma.product.findMany({
        orderBy: {
            price: "asc"
        }
    })
}


export {
    userFilter,
    yeucau1,
    yeucau2,
    yeucau3,
    yeucau4,
    yeucau5,
    yeucau6,
    yeucau7

}
