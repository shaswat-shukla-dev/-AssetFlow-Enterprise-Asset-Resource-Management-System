import prisma from "../config/database.js";

export const findUserByEmail = async (email) => {

    return prisma.user.findUnique({
        where: {
            email
        },
        include: {
            role: true
        }
    });

};

export const createUser = async (data) => {

    return prisma.user.create({
        data
    });

};