import { Admin, Captain, Player, UserRole } from "@prisma/client";
import { fileUploader } from "../../helpers/fileUploaders";
import { IFile } from "../../interface/file";
import prisma from "../../shared/prisma";
import { Request } from "express";
import * as bcrypt from "bcrypt";
import ApiError from "../../erros/ApiError";

const createAdmin = async (req: Request): Promise<Admin> => {
    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.image = uploadToCloudinary?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData,
        });

        const createdAdminData = await transactionClient.admin.create({
            data: {
                name: req.body.admin.name,
                email: req.body.admin.email,
                image: req.body.admin.image,
                contactNumber: req.body.admin.contactNumber,
                user: { connect: { id: user.id } },
            },
        });

        return createdAdminData;
    });

    return result;
};

const createCaptain = async (req: Request): Promise<Captain> => {
    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.captain.image = uploadToCloudinary?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const userData = {
        email: req.body.captain.email,
        password: hashedPassword,
        role: UserRole.CAPTAIN,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData,
        });

        const createCaptainData = await transactionClient.captain.create({
            data: {
                name: req.body.captain.name,
                email: req.body.captain.email,
                image: req.body.captain.image,
                contactNumber: req.body.captain.contactNumber,
                user: { connect: { id: user.id } },
            },
        });

        return createCaptainData;
    });

    return result;
};

const createPlayer = async (req: Request) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: req.body.player.email },
    });
    if (existingUser) {
        throw new ApiError(500, "Email already exists");
    }
    const files = req.files as IFile[];

    const imageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            const uploadToCloudinary = await fileUploader.uploadToCloudinary(
                file
            );
            if (uploadToCloudinary?.secure_url) {
                imageUrls.push(uploadToCloudinary.secure_url);
            }
        }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    if (!req.body.player) {
        throw new Error("Player data is required");
    }

    const userData = {
        email: req.body.player.email,
        password: hashedPassword,
        role: UserRole.PLAYER,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData,
        });

        const createPlayerData = await transactionClient.player.create({
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
    });

    return result;
};
const changePassword = async (id: string, payload: any) => {
    // console.log(password);
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userInfo = await prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
        },
    });
    return userInfo;
};

const getAdmin = async () => {
    return "admin";
};

export const userServices = {
    createAdmin,
    createCaptain,
    createPlayer,
    getAdmin,
    changePassword,
};
