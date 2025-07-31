import { hashPassword } from "services/user.service";
import { prisma } from "./client"
import { ACCOUNT_TYPE } from "./constant";


const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countRole == 0) {
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
    }
    if (countUser == 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN"
            }
        })

        if (adminRole) {
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "hoidanit",
                        username: "hoidanit@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "admin",
                        username: "admin@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            })
        }

    }
    if (countRole != 0 && countUser != 0) {
        console.log("Database has been seeded");
    }

}

export default initDatabase;