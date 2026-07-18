import { Request } from "express";
import ApiError from "../../../erros/ApiError";
import prisma from "../../../shared/prisma";
import { IFile } from "../../../interface/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import { count } from "console";

const createVarient = async (req: Request) => {
    const productId = req.params.id;
    const color = req.body.color?.trim().toLowerCase();

    if (!productId || !color) {
        throw new ApiError(400, "Product ID and color are required");
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const existingVariant = await prisma.variant.findFirst({
        where: {
            productId: productId,
            color: color,
        },
    });

    if (existingVariant) {
        throw new ApiError(
            400,
            "Variant with this color already exists for the product",
        );
    }

    const files = (req.files as IFile[]) || [];
    let images: string[] | undefined;

    if (files.length > 0) {
        images = [];

        for (const file of files) {
            const upload = await fileUploader.uploadToCloudinary(file);
            if (upload?.secure_url) {
                images.push(upload.secure_url);
            }
        }
    }

    return prisma.variant.create({
        data: {
            productId,
            color,
            images: images ?? [],
        },
        include: { sizes: true },
    });
};

const getVariantsByProduct = async (req: Request) => {
    const productId = req.params.id;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { variants: { include: { sizes: true } } },
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return {
        count: product.variants.length,
        variants: product.variants,
    };
};
// const getVariantsByProduct = async (productId: string) => {
//     return prisma.variant.findMany({
//         where: { productId },
//         include: { sizes: true },
//     });
// };

//update variant
const updateVariant = async (req: Request) => {
    const variantId = req.params.id;
    const { color } = req.body;

    if (!variantId) {
        throw new ApiError(400, "Variant ID is required");
    }

    const existingVariant = await prisma.variant.findUnique({
        where: { id: variantId },
    });

    if (!existingVariant) {
        throw new ApiError(404, "Variant not found");
    }

    const normalizedColor =
        typeof color === "string" ? color.trim().toLowerCase() : undefined;

    if (normalizedColor !== undefined) {
        if (!normalizedColor) {
            throw new ApiError(400, "Color cannot be empty");
        }

        const duplicateVariant = await prisma.variant.findFirst({
            where: {
                color: normalizedColor,
                productId: existingVariant.productId,
                id: { not: variantId },
            },
        });
        if (duplicateVariant) {
            throw new ApiError(400, "Variant with this color already exists");
        }
    }

    const files = (req.files as IFile[]) || [];

    let images: string[] | undefined;

    if (files.length > 0) {
        images = [];
        for (const file of files) {
            const upload = await fileUploader.uploadToCloudinary(file);
            if (upload?.secure_url) {
                images.push(upload.secure_url);
            }
        }
    }

    const updatedVariant = await prisma.variant.update({
        where: { id: variantId },
        data: {
            ...(normalizedColor !== undefined && { color: normalizedColor }),
            ...(images !== undefined && { images }),
        },
        include: { sizes: true },
    });

    return updatedVariant;
};

//delete variant
const deleteVariant = async (req: Request) => {
    const variantId = req.params.id;

    if (!variantId) {
        throw new ApiError(400, "Variant ID is required");
    }

    const existingVariant = await prisma.variant.findUnique({
        where: { id: variantId },
    });

    if (!existingVariant) {
        throw new ApiError(404, "Variant not found");
    }

    const deletedVariant = await prisma.$transaction(async (tx) => {
        await tx.size.deleteMany({
            where: { variantId: variantId },
        });
        const deletedVariant = await tx.variant.delete({
            where: { id: variantId },
        });
        return deletedVariant;
    });

    return deletedVariant;
};

export const variantService = {
    createVarient,
    getVariantsByProduct,
    updateVariant,
    deleteVariant,
};
