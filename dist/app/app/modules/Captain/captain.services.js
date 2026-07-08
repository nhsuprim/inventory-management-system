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
exports.captainServices = void 0;
const fileUploaders_1 = require("../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createTeam = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const captainData = yield prisma_1.default.captain.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const file = req.file;
    // Upload file and set image URL
    if (file) {
        const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.image = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const result = yield prisma_1.default.team.create({
        data: {
            name: req.body.name,
            image: req.body.image,
            balance: 2000,
            captainId: captainData.id,
        },
    });
    const allResult = {
        team: result,
        captain: captainData,
    };
    return allResult;
});
const getAllCaptains = () => __awaiter(void 0, void 0, void 0, function* () {
    const captains = yield prisma_1.default.captain.findMany({
        include: {
            team: true,
        },
    });
    return captains;
});
exports.captainServices = {
    createTeam,
    getAllCaptains,
};
