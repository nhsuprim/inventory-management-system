import prisma from "../../shared/prisma";

const getAllTeam = async () => {
    const players = await prisma.team.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            captain: true,
            players: true,
        },
    });
    return players;
};

export const teamServices = {
    getAllTeam,
};
