import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: email
        }
    });
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (fullName: string, username: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {
            name: "USER"
        }
    })

    await prisma.user.create({
        data: {
            fullName: fullName,
            username: username,
            password: newPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: userRole?.id
        }
    });
}

export {
    isEmailExist,
    registerNewUser
}