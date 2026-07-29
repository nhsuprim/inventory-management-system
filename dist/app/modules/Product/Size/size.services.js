"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../erros/ApiError"));
const createSize = async (req) => {
    const { size, stock } = req.body;
    const variantId = req.params.id;
    if (!variantId && !size && !stock) {
        throw new ApiError_1.default(400, "Variant ID, size and stock are required");
    }
    if (stock !== undefined && stock < 0)
        throw new ApiError_1.default(400, "Stock cannot be negative");
    const existingVariant = await prisma_1.default.variant.findUnique({
        where: { id: variantId },
    });
    if (!existingVariant) {
        throw new ApiError_1.default(404, "Variant not found");
    }
    return prisma_1.default.size.create({
        data: {
            variantId,
            size,
            stock: stock ?? 0,
        },
    });
};
//update size
const updateSize = async (req) => {
    const { size, stock } = req.body;
    const sizeId = req.params.id;
    if (!sizeId && !size && stock === undefined) {
        throw new ApiError_1.default(400, "Size ID, size and stock are required");
    }
    if (stock !== undefined && stock < 0) {
        throw new ApiError_1.default(400, "Stock cannot be negative");
    }
    const existingSize = await prisma_1.default.size.findUnique({
        where: { id: sizeId },
    });
    if (!existingSize) {
        throw new ApiError_1.default(404, "Size not found");
    }
    return prisma_1.default.size.update({
        where: { id: sizeId },
        data: {
            size,
            stock: stock ?? existingSize.stock,
        },
    });
};
//update stock
const updateStock = async (req) => {
    const { stock } = req.body;
    const sizeId = req.params.id;
    if (!sizeId && stock === undefined) {
        throw new ApiError_1.default(400, "Size ID and stock are required");
    }
    const existingSize = await prisma_1.default.size.findUnique({
        where: { id: sizeId },
    });
    if (!existingSize) {
        throw new ApiError_1.default(404, "Size not found");
    }
    if (stock !== undefined && stock < 0) {
        throw new ApiError_1.default(400, "Stock cannot be negative");
    }
    return prisma_1.default.size.update({
        where: { id: sizeId },
        data: {
            stock: stock ?? existingSize.stock,
        },
    });
};
const deleteSize = async (req) => {
    const sizeId = req.params.id;
    if (!sizeId) {
        throw new ApiError_1.default(400, "Size ID is required");
    }
    const existingSize = await prisma_1.default.size.findUnique({
        where: { id: sizeId },
    });
    if (!existingSize) {
        throw new ApiError_1.default(404, "Size not found");
    }
    return prisma_1.default.size.delete({
        where: { id: sizeId },
    });
};
exports.sizeService = {
    createSize,
    updateSize,
    updateStock,
    deleteSize,
};
