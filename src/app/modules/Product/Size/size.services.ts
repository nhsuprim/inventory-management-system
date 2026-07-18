import { Request } from "express";
import prisma from "../../../shared/prisma";
import ApiError from "../../../erros/ApiError";

const createSize = async (req: Request) => {
    const { size, stock } = req.body;

    const variantId = req.params.id;

    if (!variantId && !size && !stock) {
        throw new ApiError(400, "Variant ID, size and stock are required");
    }

    if (stock !== undefined && stock < 0)
        throw new ApiError(400, "Stock cannot be negative");

    const existingVariant = await prisma.variant.findUnique({
        where: { id: variantId },
    });

    if (!existingVariant) {
        throw new ApiError(404, "Variant not found");
    }

    return prisma.size.create({
        data: {
            variantId,
            size,
            stock: stock ?? 0,
        },
    });
};

//update size
const updateSize = async (req: Request) => {
    const { size, stock } = req.body;
    const sizeId = req.params.id;

    if (!sizeId && !size && stock === undefined) {
        throw new ApiError(400, "Size ID, size and stock are required");
    }

    if (stock !== undefined && stock < 0) {
        throw new ApiError(400, "Stock cannot be negative");
    }

    const existingSize = await prisma.size.findUnique({
        where: { id: sizeId },
    });

    if (!existingSize) {
        throw new ApiError(404, "Size not found");
    }

    return prisma.size.update({
        where: { id: sizeId },
        data: {
            size,
            stock: stock ?? existingSize.stock,
        },
    });
};

//update stock
const updateStock = async (req: Request) => {
    const { stock } = req.body;
    const sizeId = req.params.id;

    if (!sizeId && stock === undefined) {
        throw new ApiError(400, "Size ID and stock are required");
    }

    const existingSize = await prisma.size.findUnique({
        where: { id: sizeId },
    });

    if (!existingSize) {
        throw new ApiError(404, "Size not found");
    }

    if (stock !== undefined && stock < 0) {
        throw new ApiError(400, "Stock cannot be negative");
    }

    return prisma.size.update({
        where: { id: sizeId },
        data: {
            stock: stock ?? existingSize.stock,
        },
    });
};

const deleteSize = async (req: Request) => {
    const sizeId = req.params.id;

    if (!sizeId) {
        throw new ApiError(400, "Size ID is required");
    }

    const existingSize = await prisma.size.findUnique({
        where: { id: sizeId },
    });

    if (!existingSize) {
        throw new ApiError(404, "Size not found");
    }

    return prisma.size.delete({
        where: { id: sizeId },
    });
};

export const sizeService = {
    createSize,
    updateSize,
    updateStock,
    deleteSize,
};
