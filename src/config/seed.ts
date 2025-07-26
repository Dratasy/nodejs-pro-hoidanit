import { prisma } from "./client"


const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser == 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hoidanit@gmail.com",
                    password: "123456",
                    accountType: "admin"
                },
                {
                    username: "admin@gmail.com",
                    password: "123456",
                    accountType: "admin"
                }
            ]
        })
    } else if (countRole == 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    } else {
        console.log("Database has been seeded");
    }

}

export default initDatabase;