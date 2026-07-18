import { z } from "zod";

const createSize = z.object({
    size: z.string().trim().min(1, "Size is required"),
    stock: z.coerce.number().int("Stock must be an integer").nonnegative(
        "Stock cannot be negative",
    ).optional(),
});

const updateSize = z
    .object({
        size: z.string().trim().min(1, "Size cannot be empty").optional(),
        stock: z
            .coerce.number()
            .int("Stock must be an integer")
            .nonnegative("Stock cannot be negative")
            .optional(),
    })
    .refine((data) => data.size !== undefined || data.stock !== undefined, {
        message: "Provide a size or stock value to update",
    });

const updateStock = z.object({
    stock: z
        .coerce.number()
        .int("Stock must be an integer")
        .nonnegative("Stock cannot be negative"),
});

export const sizeValidation = {
    createSize,
    updateSize,
    updateStock,
};
