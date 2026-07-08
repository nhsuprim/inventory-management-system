import { Secret } from "jsonwebtoken";
import prisma from "../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

const deleteCaptain = async (id: string) => {
    await prisma.captain.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const captainDeletedData = await transactionClient.captain.delete({
            where: {
                id,
            },
        });
        await transactionClient.user.delete({
            where: {
                email: captainDeletedData.email,
            },
        });
        return captainDeletedData;
    });
    return result;
};

const deletePlayer = async (id: string) => {
    await prisma.player.findUniqueOrThrow({
        where: {
            id,
        },
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const playerDeletedData = await transactionClient.player.delete({
            where: {
                id,
            },
        });
        await transactionClient.user.delete({
            where: {
                email: playerDeletedData.email,
            },
        });
        return playerDeletedData;
    });
    return result;
};

const deleteTeam = async (id: string) => {
    const result = await prisma.team.delete({
        where: { id },
    });
    return result;
};

const confirmPlayer = async (id: any) => {
    const player = await prisma.player.update({
        where: { id },
        data: { isConfirmed: true },
        include: {
            team: true,
        },
    });
    return player;
};
const requestPlayer = async () => {
    const player = await prisma.player.findMany({
        where: {
            isConfirmed: false,
        },
        include: {
            team: true,
        },
    });
    return player;
};

const createSuperAdmin = async (payload: any) => {
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const userData = {
        email: payload.email,
        password: hashedPassword,
        role: UserRole.SUPERADMIN,
    };

    const secretKey = "MPL_SECRET_KEY_FOR_SUPRER_ADMIN";

    if (payload.secretKey === secretKey) {
        const result = await prisma.$transaction(async (transactionClient) => {
            const user = await transactionClient.user.create({
                data: userData,
            });

            const createdAdminData = await transactionClient.admin.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    contactNumber: payload.contactNumber,
                    user: { connect: { id: user.id } },
                },
            });

            return createdAdminData;
        });

        return result;
    }
};

export const adminService = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
