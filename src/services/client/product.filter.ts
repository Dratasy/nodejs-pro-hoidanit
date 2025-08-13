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
export { userFilter }
