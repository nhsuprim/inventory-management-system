"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainServices = void 0;
const fileUploaders_1 = require("../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createTeam = async (user, req) => {
    const captainData = await prisma_1.default.captain.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const file = req.file;
    // Upload file and set image URL
    if (file) {
        const uploadToCloudinary = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.image = uploadToCloudinary?.secure_url;
    }
    const result = await prisma_1.default.team.create({
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
};
const getAllCaptains = async () => {
    const captains = await prisma_1.default.captain.findMany({
        include: {
            team: true,
        },
    });
    return captains;
};
exports.captainServices = {
    createTeam,
    getAllCaptains,
};
