import { Request } from "express";
import { IFile } from "../../interface/file";
import { fileUploader } from "../../helpers/fileUploaders";
import ApiError from "../../erros/ApiError";
import prisma from "../../shared/prisma";

const addProducts = async (req: Request) => {
    const {
        name,
        sku,
        categoryId,
        price,
        costPrice,
        taxRate,
        stockQty,
        reorderThreshold,
        unit,
        description,
    } = req.body;

    const files = req.files as IFile[];

    const imageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            const uploadToCloudinary =
                await fileUploader.uploadToCloudinary(file);
            if (uploadToCloudinary?.secure_url) {
                imageUrls.push(uploadToCloudinary.secure_url);
            }
        }
    }

    if (!name || !sku || !categoryId || price === undefined) {
        throw new ApiError(400, "name, sku, categoryId and price are required");
    }

    if (Number(price) < 0 || Number(costPrice) < 0) {
        throw new ApiError(400, "Price and cost price cannot be negative");
    }

    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new ApiError(
            400,
            "categoryId does not reference an existing category",
        );
    }

    // SKU must be unique — case-insensitive, same reasoning as category
    // names (Prisma's mode:"insensitive" is unreliable on this Mongo setup).
    const allSkus = await prisma.product.findMany({
        select: { id: true, sku: true },
    });
    const skuTaken = allSkus.find(
        (p) => p.sku.toLowerCase() === String(sku).trim().toLowerCase(),
    );
    if (skuTaken) {
        throw new ApiError(400, "A product with this SKU already exists");
    }

    const product = await prisma.product.create({
        data: {
            name: name.trim(),
            sku: sku.trim(),
            categoryId,
            price: Number(price),
            costPrice: Number(costPrice),
            taxRate: Number(taxRate) || 0,
            stockQty: Number(stockQty),
            reorderThreshold: Number(reorderThreshold),
            unit,
            images: imageUrls.length > 0 ? imageUrls : null,
            description,
        },
    });

    return product;
};

export const productServices = {
    addProducts,
};
