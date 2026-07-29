"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantService = void 0;
const ApiError_1 = __importDefault(require("../../../erros/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const createVarient = async (req) => {
    const productId = req.params.id;
    const color = req.body.color?.trim().toLowerCase();
    if (!productId || !color) {
        throw new ApiError_1.default(400, "Product ID and color are required");
    }
    const product = await prisma_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        throw new ApiError_1.default(404, "Product not found");
    }
    const existingVariant = await prisma_1.default.variant.findFirst({
        where: {
            productId: productId,
            color: color,
        },
    });
    if (existingVariant) {
        throw new ApiError_1.default(400, "Variant with this color already exists for the product");
    }
    const files = req.files || [];
    let images;
    if (files.length > 0) {
        images = [];
        for (const file of files) {
            const upload = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
            if (upload?.secure_url) {
                images.push(upload.secure_url);
            }
        }
    }
    return prisma_1.default.variant.create({
        data: {
            productId,
            color,
            images: images ?? [],
        },
        include: { sizes: true },
    });
};
const getVariantsByProduct = async (req) => {
    const productId = req.params.id;
    if (!productId) {
        throw new ApiError_1.default(400, "Product ID is required");
    }
    const product = await prisma_1.default.product.findUnique({
        where: { id: productId },
        include: { variants: { include: { sizes: true } } },
    });
    if (!product) {
        throw new ApiError_1.default(404, "Product not found");
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
const updateVariant = async (req) => {
    const variantId = req.params.id;
    const { color } = req.body;
    if (!variantId) {
        throw new ApiError_1.default(400, "Variant ID is required");
    }
    const existingVariant = await prisma_1.default.variant.findUnique({
        where: { id: variantId },
    });
    if (!existingVariant) {
        throw new ApiError_1.default(404, "Variant not found");
    }
    const normalizedColor = typeof color === "string" ? color.trim().toLowerCase() : undefined;
    if (normalizedColor !== undefined) {
        if (!normalizedColor) {
            throw new ApiError_1.default(400, "Color cannot be empty");
        }
        const duplicateVariant = await prisma_1.default.variant.findFirst({
            where: {
                color: normalizedColor,
                productId: existingVariant.productId,
                id: { not: variantId },
            },
        });
        if (duplicateVariant) {
            throw new ApiError_1.default(400, "Variant with this color already exists");
        }
    }
    const files = req.files || [];
    let images;
    if (files.length > 0) {
        images = [];
        for (const file of files) {
            const upload = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
            if (upload?.secure_url) {
                images.push(upload.secure_url);
            }
        }
    }
    const updatedVariant = await prisma_1.default.variant.update({
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
const deleteVariant = async (req) => {
    const variantId = req.params.id;
    if (!variantId) {
        throw new ApiError_1.default(400, "Variant ID is required");
    }
    const existingVariant = await prisma_1.default.variant.findUnique({
        where: { id: variantId },
    });
    if (!existingVariant) {
        throw new ApiError_1.default(404, "Variant not found");
    }
    const deletedVariant = await prisma_1.default.$transaction(async (tx) => {
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
exports.variantService = {
    createVarient,
    getVariantsByProduct,
    updateVariant,
    deleteVariant,
};
