import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.service";

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

    if (userRole) {
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
    else {
        throw new Error("User role khong ton tai");
    }

}


const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    });
    return user;
}

const getUserSumCart = async (id: string) => {
    const card = await prisma.cart.findUnique({
        where: {
            userId: +id
        }
    })
    return card?.sum ?? 0;
}

const handleLogin = async (username: string, password: string, callback: any) => {
    //check user exist in database
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (!user) {
        // throw new Error(`Username: ${username} not found`)
        return callback(null, false, { message: `Username/password invalid` });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        // throw new Error("Password incorrect")
        return callback(null, false, { message: "Username/password invalid" });
    }
    return callback(null, user);
}

export {
    isEmailExist,
    registerNewUser,
    handleLogin,
    getUserWithRoleById,
    getUserSumCart
}