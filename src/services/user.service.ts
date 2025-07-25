import getConnection from 'config/database';
import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from 'config/client';

const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string) => {

    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType: ""
        }
    });

    return newUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const handleDeleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: +id
        }
    })

    return deletedUser;

}

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        }
    });
    return user;
}

const updateUserById = async (id: string, fullName: string, email: string, address: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType: ""
        }
    })

    return updatedUser;
}

export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    getUserById,
    updateUserById
};