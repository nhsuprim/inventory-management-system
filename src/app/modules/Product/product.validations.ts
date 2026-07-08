import { z } from "zod";

export const createProduct = z.object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.string().min(1, "Category ID is required"),
    sku: z.string().min(1, "SKU is required"),
    price: z.number().nonnegative("Price cannot be negative"),
    costPrice: z
        .number()
        .nonnegative("Cost price cannot be negative")
        .optional(),
    taxRate: z.number().nonnegative("Tax rate cannot be negative").optional(),
    stockQty: z
        .number()
        .nonnegative("Stock quantity cannot be negative")
        .optional(),
    reorderThreshold: z
        .number()
        .nonnegative("Reorder threshold cannot be negative")
        .optional(),
    unit: z.string().optional(),
    description: z.string().optional(),
});
export const productValidation = {
    createProduct,
};
