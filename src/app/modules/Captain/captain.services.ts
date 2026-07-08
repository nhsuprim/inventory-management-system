import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploaders";
import { IFile } from "../../interface/file";
import prisma from "../../shared/prisma";

const createTeam = async (user: any, req: Request) => {
    const captainData = await prisma.captain.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });

    const file = req.file as IFile;

    // Upload file and set image URL
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.image = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.team.create({
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
    const captains = await prisma.captain.findMany({
        include: {
            team: true,
        },
    });
    return captains;
};

export const captainServices = {
    createTeam,
    getAllCaptains,
};
