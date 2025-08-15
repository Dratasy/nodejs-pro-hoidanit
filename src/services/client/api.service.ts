import { prisma } from "config/client"
import { comparePassword } from "services/user.service";
import jwt from "jsonwebtoken";

const handleGetAllUser = async () => {
    return await prisma.user.findMany();
}

const handleGetUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    });
}

const handleUpdateUserById = async (id: number, fullName: string, address: string, phone: string) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            fullName: fullName,
            address: address,
            phone: phone
        }
    })
}

const handleDeleteUserById = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id: id
        }
    })
}

const handleUserLogin = async (username: string, password: string) => {
    //check user exist in database
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (!user) {
        throw new Error(`Username: ${username} not found`)

    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Password incorrect")
    }

    //co user login -> dinh nghia access token
    const payload = {
        id: 1,
        name: "Hoidanit"
    }
    const access_token = jwt.sign(payload, "eric", {
        expiresIn: "1d"
    })
    return access_token;
}

export {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleUserLogin
}