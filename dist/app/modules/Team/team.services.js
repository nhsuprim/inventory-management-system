"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getAllTeam = async () => {
    const players = await prisma_1.default.team.findMany({
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
exports.teamServices = {
    getAllTeam,
};
