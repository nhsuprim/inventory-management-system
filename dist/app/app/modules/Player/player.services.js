"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield prisma_1.default.player.findMany({
        where: {
            isConfirmed: true,
        },
        include: {
            team: true,
        },
    });
    return players;
});
const getAllRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield prisma_1.default.player.findMany({
        where: {
            isConfirmed: false,
        },
        include: {
            team: true,
        },
    });
    return players;
});
const soldPlayer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId, auctionStatus, playerCost } = payload;
    // Start a transaction
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        let newBalance = null;
        let teamData = null;
        if (playerCost && auctionStatus) {
            teamData = yield transactionClient.team.findUniqueOrThrow({
                where: { id: teamId },
                include: { players: true },
            });
            const TeamBalance = yield teamData.balance;
            const TeamPlayers = yield teamData.players.length;
            if (playerCost > TeamBalance) {
                throw new Error("Insufficient balance");
            }
            if (TeamPlayers == 10) {
                throw new Error("You have reached the maximum amount of players");
            }
            newBalance = teamData.balance - playerCost;
            const remainPlayers = 10 - teamData.players.length;
            if (remainPlayers > 1) {
                const etc = newBalance / (9 - teamData.players.length);
                const remainingtk = etc >= 100;
                if (!remainingtk) {
                    throw new Error("you can not buy this player with this amount");
                }
            }
            yield transactionClient.team.update({
                where: { id: teamId },
                data: { balance: newBalance },
            });
        }
        const updatedData = {
            auctionStatus,
            team: {
                connect: { id: teamId },
            },
            playerCost,
        };
        // Update the player within the transaction
        const updatedPlayer = yield transactionClient.player.update({
            where: { id },
            data: updatedData,
        });
        // Return the updated player and team data
        return {
            player: updatedPlayer,
            team: teamData,
        };
    }));
    return result;
});
const removeTeamPlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const playerInfo = yield prisma_1.default.player.findUniqueOrThrow({
        where: { id },
        include: {
            team: true,
        },
    });
    const playerTeamBlanc = playerInfo.team.balance;
    const playerCost = playerInfo.playerCost;
    const newBalance = playerTeamBlanc + playerCost;
    console.log(newBalance);
    yield prisma_1.default.player.update({
        where: { id: playerInfo.id },
        data: {
            team: {
                disconnect: true, // This will remove the player from the team
            },
            auctionStatus: client_1.PlayerStatus.AVAILABLE,
            playerCost: 0,
        },
    });
    yield prisma_1.default.team.update({
        where: { id: playerInfo.team.id },
        data: {
            players: {
                disconnect: { id: playerInfo.id }, // This will remove the player from the team
            },
            balance: newBalance,
        },
    });
    return playerInfo;
});
const getPlayerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma_1.default.player.findUnique({
        where: { id },
        include: {
            team: true,
        },
    });
    return player;
});
exports.playerServices = {
    getAllPlayers,
    soldPlayer,
    getPlayerById,
    removeTeamPlayer,
    getAllRequest
};
