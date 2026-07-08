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
exports.adminService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const deleteCaptain = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.captain.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const captainDeletedData = yield transactionClient.captain.delete({
            where: {
                id,
            },
        });
        yield transactionClient.user.delete({
            where: {
                email: captainDeletedData.email,
            },
        });
        return captainDeletedData;
    }));
    return result;
});
const deletePlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.player.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const playerDeletedData = yield transactionClient.player.delete({
            where: {
                id,
            },
        });
        yield transactionClient.user.delete({
            where: {
                email: playerDeletedData.email,
            },
        });
        return playerDeletedData;
    }));
    return result;
});
const deleteTeam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.team.delete({
        where: { id },
    });
    return result;
});
const confirmPlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma_1.default.player.update({
        where: { id },
        data: { isConfirmed: true },
        include: {
            team: true,
        },
    });
    return player;
});
const requestPlayer = () => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma_1.default.player.findMany({
        where: {
            isConfirmed: false,
        },
        include: {
            team: true,
        },
    });
    return player;
});
const createSuperAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(payload.password, 12);
    const userData = {
        email: payload.email,
        password: hashedPassword,
        role: client_1.UserRole.SUPERADMIN,
    };
    const secretKey = "MPL_SECRET_KEY_FOR_SUPRER_ADMIN";
    if (payload.secretKey === secretKey) {
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionClient.user.create({
                data: userData,
            });
            const createdAdminData = yield transactionClient.admin.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    contactNumber: payload.contactNumber,
                    user: { connect: { id: user.id } },
                },
            });
            return createdAdminData;
        }));
        return result;
    }
});
exports.adminService = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
