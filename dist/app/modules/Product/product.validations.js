"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = exports.createProduct = void 0;
const zod_1 = require("zod");
exports.createProduct = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    sku: zod_1.z.string().min(1, "SKU is required"),
    price: zod_1.z.number().nonnegative("Price cannot be negative"),
    costPrice: zod_1.z
        .number()
        .nonnegative("Cost price cannot be negative")
        .optional(),
    taxRate: zod_1.z.number().nonnegative("Tax rate cannot be negative").optional(),
    // stockQty: z
    //     .number()
    //     .nonnegative("Stock quantity cannot be negative")
    //     .optional(),
    reorderThreshold: zod_1.z
        .number()
        .nonnegative("Reorder threshold cannot be negative")
        .optional(),
    unit: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    categories: zod_1.z.array(zod_1.z.string()).nonempty(),
    variants: zod_1.z
        .array(zod_1.z.object({
        color: zod_1.z.string().optional(),
        sizes: zod_1.z.array(zod_1.z.object({
            size: zod_1.z.string().optional(),
            stock: zod_1.z.coerce.number(),
        })),
    }))
        .nonempty(),
});
exports.productValidation = {
    createProduct: exports.createProduct,
};
