import { prisma } from "./client"


const initDatabase = async () => {
    const countUser = await prisma.user.count();
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
    } else {
        console.log("Database has been seeded");
    }

}

export default initDatabase;