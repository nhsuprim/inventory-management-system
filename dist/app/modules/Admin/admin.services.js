"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const deleteCaptain = async (id) => {
    await prisma_1.default.captain.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = await prisma_1.default.$transaction(async (transactionClient) => {
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
const deletePlayer = async (id) => {
    await prisma_1.default.player.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = await prisma_1.default.$transaction(async (transactionClient) => {
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
const deleteTeam = async (id) => {
    const result = await prisma_1.default.team.delete({
        where: { id },
    });
    return result;
};
const confirmPlayer = async (id) => {
    const player = await prisma_1.default.player.update({
        where: { id },
        data: { isConfirmed: true },
        include: {
            team: true,
        },
    });
    return player;
};
const requestPlayer = async () => {
    const player = await prisma_1.default.player.findMany({
        where: {
            isConfirmed: false,
        },
        include: {
            team: true,
        },
    });
    return player;
};
const createSuperAdmin = async (payload) => {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userData = {
        email: payload.email,
        password: hashedPassword,
        role: client_1.UserRole.SUPERADMIN,
    };
    const secretKey = "MPL_SECRET_KEY_FOR_SUPRER_ADMIN";
    if (payload.secretKey === secretKey) {
        const result = await prisma_1.default.$transaction(async (transactionClient) => {
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
exports.adminService = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
