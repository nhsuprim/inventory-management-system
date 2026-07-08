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
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const fileUploaders_1 = require("../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const ApiError_1 = __importDefault(require("../../erros/ApiError"));
const createAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.admin.image = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData,
        });
        const createdAdminData = yield transactionClient.admin.create({
            data: {
                name: req.body.admin.name,
                email: req.body.admin.email,
                image: req.body.admin.image,
                contactNumber: req.body.admin.contactNumber,
                user: { connect: { id: user.id } },
            },
        });
        return createdAdminData;
    }));
    return result;
});
const createCaptain = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.captain.image = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.captain.email,
        password: hashedPassword,
        role: client_1.UserRole.CAPTAIN,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData,
        });
        const createCaptainData = yield transactionClient.captain.create({
            data: {
                name: req.body.captain.name,
                email: req.body.captain.email,
                image: req.body.captain.image,
                contactNumber: req.body.captain.contactNumber,
                user: { connect: { id: user.id } },
            },
        });
        return createCaptainData;
    }));
    return result;
});
const createPlayer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: { email: req.body.player.email },
    });
    if (existingUser) {
        throw new ApiError_1.default(500, "Email already exists");
    }
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
            if (uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url) {
                imageUrls.push(uploadToCloudinary.secure_url);
            }
        }
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    if (!req.body.player) {
        throw new Error("Player data is required");
    }
    const userData = {
        email: req.body.player.email,
        password: hashedPassword,
        role: client_1.UserRole.PLAYER,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData,
        });
        const createPlayerData = yield transactionClient.player.create({
            data: {
                name: req.body.player.name,
                email: req.body.player.email,
                images: imageUrls,
                contactNumber: req.body.player.contactNumber,
                address: req.body.player.address,
                age: req.body.player.age,
                battingOrder: req.body.player.battingOrder,
                bowlingType: req.body.player.bowlingType,
                auctionStatus: req.body.player.auctionStatus,
                transactionNumber: req.body.player.transactionNumber,
                user: { connect: { id: user.id } },
            },
        });
        return createPlayerData;
    }));
    return result;
});
const getAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    return "admin";
});
exports.userServices = {
    createAdmin,
    createCaptain,
    createPlayer,
    getAdmin,
};
