"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeValidation = void 0;
const zod_1 = require("zod");
const createSize = zod_1.z.object({
    size: zod_1.z.string().trim().min(1, "Size is required"),
    stock: zod_1.z.coerce.number().int("Stock must be an integer").nonnegative("Stock cannot be negative").optional(),
});
const updateSize = zod_1.z
    .object({
    size: zod_1.z.string().trim().min(1, "Size cannot be empty").optional(),
    stock: zod_1.z
        .coerce.number()
        .int("Stock must be an integer")
        .nonnegative("Stock cannot be negative")
        .optional(),
})
    .refine((data) => data.size !== undefined || data.stock !== undefined, {
    message: "Provide a size or stock value to update",
});
const updateStock = zod_1.z.object({
    stock: zod_1.z
        .coerce.number()
        .int("Stock must be an integer")
        .nonnegative("Stock cannot be negative"),
});
exports.sizeValidation = {
    createSize,
    updateSize,
    updateStock,
};
