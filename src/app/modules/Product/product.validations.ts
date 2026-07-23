import { z } from "zod";

export const createProduct = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    price: z.number().nonnegative("Price cannot be negative"),
    costPrice: z
        .number()
        .nonnegative("Cost price cannot be negative")
        .optional(),
    taxRate: z.number().nonnegative("Tax rate cannot be negative").optional(),
    // stockQty: z
    //     .number()
    //     .nonnegative("Stock quantity cannot be negative")
    //     .optional(),
    reorderThreshold: z
        .number()
        .nonnegative("Reorder threshold cannot be negative")
        .optional(),
    unit: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).nonempty(),

    variants: z
        .array(
            z.object({
                color: z.string().optional(),

                sizes: z.array(
                    z.object({
                        size: z.string().optional(),

                        stock: z.coerce.number(),
                    }),
                ),
            }),
        )
        .nonempty(),
});
export const productValidation = {
    createProduct,
};
