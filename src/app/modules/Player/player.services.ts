import { PlayerStatus } from "@prisma/client";
import ApiError from "../../erros/ApiError";
import prisma from "../../shared/prisma";

const getAllPlayers = async () => {
    const players = await prisma.player.findMany({
        where: {
            isConfirmed: true,
        },
        include: {
            team: true,
        },
    });
    return players;
};
const getAllRequest = async () => {
    const players = await prisma.player.findMany({
        where: {
            isConfirmed: false,
        },
        include: {
            team: true,
        },
    });
    return players;
};

const soldPlayer = async (id: any, payload: any) => {
    const { teamId, auctionStatus, playerCost } = payload;

    // Start a transaction
    const result = await prisma.$transaction(async (transactionClient) => {
        let newBalance: number | null = null;
        let teamData = null;

        if (playerCost && auctionStatus) {
            teamData = await transactionClient.team.findUniqueOrThrow({
                where: { id: teamId },
                include: { players: true },
            });

            const TeamBalance = await teamData.balance!;
            const TeamPlayers = await teamData.players.length;

            if (playerCost > TeamBalance) {
                throw new Error("Insufficient balance");
            }

            if (TeamPlayers == 10) {
                throw new Error(
                    "You have reached the maximum amount of players"
                );
            }

            newBalance = teamData.balance! - playerCost;

            const remainPlayers = 10 - teamData.players.length;

            if (remainPlayers > 1) {
                const etc = newBalance / (9 - teamData.players.length);

                const remainingtk = etc >= 100;

                if (!remainingtk) {
                    throw new Error(
                        "you can not buy this player with this amount"
                    );
                }
            }

            await transactionClient.team.update({
                where: { id: teamId },
                data: { balance: newBalance },
            });
        }

        const updatedData: any = {
            auctionStatus,
            team: {
                connect: { id: teamId },
            },
            playerCost,
        };

        // Update the player within the transaction
        const updatedPlayer = await transactionClient.player.update({
            where: { id },
            data: updatedData,
        });

        // Return the updated player and team data
        return {
            player: updatedPlayer,
            team: teamData,
        };
    });

    return result;
};

const removeTeamPlayer = async (id: any) => {
    const playerInfo = await prisma.player.findUniqueOrThrow({
        where: { id },
        include: {
            team: true,
        },
    });

    const playerTeamBlanc = playerInfo.team!.balance;
    const playerCost = playerInfo.playerCost;
    const newBalance = playerTeamBlanc! + playerCost!;
    console.log(newBalance);

    await prisma.player.update({
        where: { id: playerInfo.id },
        data: {
            team: {
                disconnect: true, // This will remove the player from the team
            },
            auctionStatus: PlayerStatus.AVAILABLE,
            playerCost: 0,
        },
    });

    await prisma.team.update({
        where: { id: playerInfo.team!.id },
        data: {
            players: {
                disconnect: { id: playerInfo.id }, // This will remove the player from the team
            },
            balance: newBalance,
        },
    });

    return playerInfo;
};

const getPlayerById = async (id: any) => {
    const player = await prisma.player.findUnique({
        where: { id },
        include: {
            team: true,
        },
    });
    return player;
};

export const playerServices = {
    getAllPlayers,
    soldPlayer,
    getPlayerById,
    removeTeamPlayer,
    getAllRequest
};
