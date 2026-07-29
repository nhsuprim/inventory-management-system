"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const fileUploaders_1 = require("../../helpers/fileUploaders");
const ApiError_1 = __importDefault(require("../../erros/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addProducts = async (req) => {
    const { name, sku, price, costPrice, taxRate, reorderThreshold, unit, description, categories, variants, } = req.body;
    const files = req.files;
    const thumbnailFile = files.find((file) => file.fieldname === "thumbnail");
    console.log("Thumbnail", thumbnailFile);
    let thumbnailImage = "";
    if (thumbnailFile) {
        const uploaded = await fileUploaders_1.fileUploader.uploadToCloudinary(thumbnailFile);
        thumbnailImage = uploaded?.secure_url || "";
    }
    // ✅ variant wise image upload
    const variantImageUrls = await Promise.all(variants.map(async (_, index) => {
        const variantFiles = files.filter((file) => file.fieldname === `files_${index}`);
        const uploadedUrls = [];
        for (const file of variantFiles) {
            const uploaded = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
            if (uploaded?.secure_url) {
                uploadedUrls.push(uploaded.secure_url);
            }
        }
        return uploadedUrls;
    }));
    if (!name || !sku || price === undefined) {
        throw new ApiError_1.default(400, "name, sku and price are required");
    }
    if (Number(price) < 0 || Number(costPrice) < 0) {
        throw new ApiError_1.default(400, "Price and cost price cannot be negative");
    }
    const categoryIds = categories;
    const existingCategories = await prisma_1.default.category.findMany({
        where: { id: { in: categoryIds } },
    });
    if (existingCategories.length !== categoryIds.length) {
        throw new ApiError_1.default(400, "categoryIds do not reference existing categories");
    }
    // SKU must be unique — case-insensitive, same reasoning as category
    const allSkus = await prisma_1.default.product.findMany({
        select: { id: true, sku: true },
    });
    const skuTaken = allSkus.find((p) => p.sku.toLowerCase() === String(sku).trim().toLowerCase());
    if (skuTaken) {
        throw new ApiError_1.default(400, "A product with this SKU already exists");
    }
    const product = await prisma_1.default.product.create({
        data: {
            name: name.trim(),
            sku: sku.trim(),
            price: Number(price),
            costPrice: Number(costPrice),
            taxRate: Number(taxRate) || 0,
            reorderThreshold: Number(reorderThreshold),
            unit,
            thumbnailImage: thumbnailImage,
            description,
            categories: {
                create: categories.map((categoryId) => ({
                    category: {
                        connect: {
                            id: categoryId,
                        },
                    },
                })),
            },
            variants: {
                create: variants.map((variant, index) => ({
                    color: variant.color || "default",
                    // ✅ each variant own images
                    images: variantImageUrls[index] || [],
                    sizes: {
                        create: variant.sizes.map((size) => ({
                            size: size.size || "default",
                            stock: parseInt(size.stock),
                        })),
                    },
                })),
            },
        },
        include: {
            variants: {
                include: {
                    sizes: true,
                },
            },
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });
    return product;
};
const getAllProducts = async () => {
    const products = await prisma_1.default.product.findMany({
        include: {
            variants: {
                include: {
                    sizes: true,
                },
            },
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });
    return products;
};
const getProductById = async (req) => {
    const { id } = req.params;
    const product = await prisma_1.default.product.findUnique({
        where: { id },
        include: {
            variants: {
                include: {
                    sizes: true,
                },
            },
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });
    return product;
};
//update product
// const updateProduct = async (req: Request) => {
//     const { id } = req.params;
//     console.log(req.body);
//     const existingProduct = await prisma.product.findUnique({
//         where: { id },
//         include: { variants: { include: { sizes: true } } },
//     });
//     if (!existingProduct) {
//         throw new ApiError(404, "Product not found");
//     }
//     // Shob field ekhon ekta "data" key-r bhitore ashbe, JSON string hishebe.
//     let payload: any;
//     if (req.body.data) {
//         try {
//             payload = JSON.parse(req.body.data);
//         } catch {
//             throw new ApiError(400, "data must be a valid JSON string");
//         }
//     } else {
//         payload = req.body;
//     }
//     const {
//         name,
//         sku,
//         price,
//         costPrice,
//         taxRate,
//         stockQty,
//         reorderThreshold,
//         unit,
//         description,
//         status,
//         categories,
//         variants,
//     } = payload;
//     // if (categories !== undefined && !Array.isArray(categories)) {
//     //     throw new ApiError(400, "categories must be an array");
//     // }
//     // if (variants !== undefined && !Array.isArray(variants)) {
//     //     throw new ApiError(400, "variants must be an array");
//     // }
//     const files = (req.files as IFile[]) || [];
//     // ---------- validations ----------
//     if (price !== undefined && Number(price) < 0) {
//         throw new ApiError(400, "Price cannot be negative");
//     }
//     if (costPrice !== undefined && Number(costPrice) < 0) {
//         throw new ApiError(400, "Cost price cannot be negative");
//     }
//     if (sku !== undefined) {
//         const allSkus = await prisma.product.findMany({
//             select: { id: true, sku: true },
//         });
//         const skuTaken = allSkus.find(
//             (p) =>
//                 p.id !== id &&
//                 p.sku.toLowerCase() === String(sku).trim().toLowerCase(),
//         );
//         if (skuTaken)
//             throw new ApiError(400, "A product with this SKU already exists");
//     }
//     if (categories !== undefined) {
//         const existingCategories = await prisma.category.findMany({
//             where: { id: { in: categories } },
//         });
//         if (existingCategories.length !== categories.length) {
//             throw new ApiError(
//                 400,
//                 "categoryIds do not reference existing categories",
//             );
//         }
//     }
//     // ---------- thumbnail replace (only if a new file sent) ----------
//     let thumbnailImage: string | undefined = undefined;
//     const thumbnailFile = files.find((f) => f.fieldname === "thumbnail");
//     if (thumbnailFile) {
//         const uploaded = await fileUploader.uploadToCloudinary(thumbnailFile);
//         thumbnailImage = uploaded?.secure_url;
//     }
//     // ---------- variant images, index-matched to variants array ----------
//     const variantImageUrls: (string[] | undefined)[] = variants
//         ? await Promise.all(
//               variants.map(async (_: any, index: number) => {
//                   const variantFiles = files.filter(
//                       (f) => f.fieldname === `files_${index}`,
//                   );
//                   if (variantFiles.length === 0) return undefined;
//                   const uploaded: string[] = [];
//                   for (const file of variantFiles) {
//                       const res = await fileUploader.uploadToCloudinary(file);
//                       if (res?.secure_url) uploaded.push(res.secure_url);
//                   }
//                   return uploaded;
//               }),
//           )
//         : [];
//     // ---------- everything atomically ----------
//     const result = await prisma.$transaction(
//         async (tx) => {
//             await tx.product.update({
//                 where: { id },
//                 data: {
//                     ...(name !== undefined && { name: name.trim() }),
//                     ...(sku !== undefined && { sku: sku.trim() }),
//                     ...(price !== undefined && { price: Number(price) }),
//                     ...(costPrice !== undefined && {
//                         costPrice: Number(costPrice),
//                     }),
//                     ...(taxRate !== undefined && { taxRate: Number(taxRate) }),
//                     ...(stockQty !== undefined && {
//                         stockQty: Number(stockQty),
//                     }),
//                     ...(reorderThreshold !== undefined && {
//                         reorderThreshold: Number(reorderThreshold),
//                     }),
//                     ...(unit !== undefined && { unit }),
//                     ...(description !== undefined && { description }),
//                     ...(status !== undefined && { status }),
//                     ...(thumbnailImage !== undefined && { thumbnailImage }),
//                 },
//             });
//             if (categories !== undefined) {
//                 await tx.productCategory.deleteMany({
//                     where: { productId: id },
//                 });
//                 await tx.productCategory.createMany({
//                     data: categories.map((categoryId: string) => ({
//                         productId: id,
//                         categoryId,
//                     })),
//                 });
//             }
//             if (variants !== undefined) {
//                 for (let index = 0; index < variants.length; index++) {
//                     const v = variants[index];
//                     const newImages = variantImageUrls[index];
//                     if (v.id) {
//                         const existingVariant = existingProduct.variants.find(
//                             (ev) => ev.id === v.id,
//                         );
//                         if (!existingVariant) {
//                             throw new ApiError(
//                                 400,
//                                 `Variant with id ${v.id} not found on this product`,
//                             );
//                         }
//                         await tx.variant.update({
//                             where: { id: v.id },
//                             data: {
//                                 ...(v.color !== undefined && {
//                                     color: v.color,
//                                 }),
//                                 ...(newImages !== undefined && {
//                                     images: newImages,
//                                 }),
//                             },
//                         });
//                         for (const s of v.sizes || []) {
//                             if (s.stock !== undefined && Number(s.stock) < 0) {
//                                 throw new ApiError(
//                                     400,
//                                     `Stock cannot be negative (variant "${v.color || existingVariant.color}", size "${s.size}")`,
//                                 );
//                             }
//                             if (s.id) {
//                                 const existingSize = existingVariant.sizes.find(
//                                     (es) => es.id === s.id,
//                                 );
//                                 if (!existingSize) {
//                                     throw new ApiError(
//                                         400,
//                                         `Size with id ${s.id} not found on variant ${v.id}`,
//                                     );
//                                 }
//                                 await tx.size.update({
//                                     where: { id: s.id },
//                                     data: {
//                                         ...(s.size !== undefined && {
//                                             size: s.size,
//                                         }),
//                                         ...(s.stock !== undefined && {
//                                             stock: Number(s.stock),
//                                         }),
//                                     },
//                                 });
//                             } else {
//                                 if (!s.size)
//                                     throw new ApiError(
//                                         400,
//                                         "New size entries require a size label",
//                                     );
//                                 await tx.size.create({
//                                     data: {
//                                         variantId: v.id,
//                                         size: s.size,
//                                         stock: Number(s.stock) || 0,
//                                     },
//                                 });
//                             }
//                         }
//                     } else {
//                         if (!v.color)
//                             throw new ApiError(
//                                 400,
//                                 "Each new variant requires a color",
//                             );
//                         await tx.variant.create({
//                             data: {
//                                 productId: id,
//                                 color: v.color,
//                                 images: newImages || [],
//                                 sizes: {
//                                     create: (v.sizes || []).map((s: any) => {
//                                         if (!s.size)
//                                             throw new ApiError(
//                                                 400,
//                                                 `Variant "${v.color}" has a size entry without a size label`,
//                                             );
//                                         if (
//                                             s.stock !== undefined &&
//                                             Number(s.stock) < 0
//                                         ) {
//                                             throw new ApiError(
//                                                 400,
//                                                 `Stock cannot be negative (variant "${v.color}", size "${s.size}")`,
//                                             );
//                                         }
//                                         return {
//                                             size: s.size,
//                                             stock: Number(s.stock) || 0,
//                                         };
//                                     }),
//                                 },
//                             },
//                         });
//                     }
//                 }
//             }
//             return tx.product.findUnique({
//                 where: { id },
//                 include: {
//                     variants: { include: { sizes: true } },
//                     categories: { include: { category: true } },
//                 },
//             });
//         },
//         {
//             timeout: 15000, // 5000ms (default) theke 15 second kore dilam
//             maxWait: 10000, // transaction shuru howar age max koto wait korbe
//         },
//     );
//     return result;
// };
const updateProduct = async (req) => {
    const { id } = req.params;
    const existing = await prisma_1.default.product.findUnique({ where: { id } });
    if (!existing)
        throw new ApiError_1.default(404, "Product not found");
    const { name, sku, price, costPrice, taxRate, reorderThreshold, unit, description, status, categories, } = req.body;
    if (price !== undefined && Number(price) < 0)
        throw new ApiError_1.default(400, "Price cannot be negative");
    if (costPrice !== undefined && Number(costPrice) < 0)
        throw new ApiError_1.default(400, "Cost price cannot be negative");
    if (sku !== undefined) {
        const allSkus = await prisma_1.default.product.findMany({
            select: { id: true, sku: true },
        });
        if (allSkus.some((p) => p.id !== id &&
            p.sku.toLowerCase() === String(sku).trim().toLowerCase())) {
            throw new ApiError_1.default(400, "A product with this SKU already exists");
        }
    }
    let thumbnailImage;
    const files = req.files || [];
    const thumbnailFile = files.find((f) => f.fieldname === "thumbnail");
    if (thumbnailFile) {
        const uploaded = await fileUploaders_1.fileUploader.uploadToCloudinary(thumbnailFile);
        thumbnailImage = uploaded?.secure_url;
    }
    let categoryIds;
    if (categories !== undefined) {
        categoryIds =
            typeof categories === "string"
                ? JSON.parse(categories)
                : categories;
        const found = await prisma_1.default.category.findMany({
            where: { id: { in: categoryIds } },
        });
        if (found.length !== categoryIds.length)
            throw new ApiError_1.default(400, "categoryIds do not reference existing categories");
    }
    return prisma_1.default.$transaction(async (tx) => {
        await tx.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(sku !== undefined && { sku: sku.trim() }),
                ...(price !== undefined && { price: Number(price) }),
                ...(costPrice !== undefined && {
                    costPrice: Number(costPrice),
                }),
                ...(taxRate !== undefined && { taxRate: Number(taxRate) }),
                ...(reorderThreshold !== undefined && {
                    reorderThreshold: Number(reorderThreshold),
                }),
                ...(unit !== undefined && { unit }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
                ...(thumbnailImage !== undefined && { thumbnailImage }),
            },
        });
        if (categoryIds !== undefined) {
            await tx.productCategory.deleteMany({ where: { productId: id } });
            await tx.productCategory.createMany({
                data: categoryIds.map((categoryId) => ({
                    productId: id,
                    categoryId,
                })),
            });
        }
        return tx.product.findUnique({
            where: { id },
            include: {
                categories: { include: { category: true } },
                variants: { include: { sizes: true } },
            },
        });
    });
};
exports.productServices = {
    addProducts,
    getAllProducts,
    updateProduct,
    getProductById,
};
