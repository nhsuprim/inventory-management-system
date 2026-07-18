import { z } from "zod";

const createVariant = z.object({
    color: z.string().trim().min(1, "Color is required"),
});

const updateVariant = z.object({
    color: z.string().trim().min(1, "Color cannot be empty").optional(),
});

export const variantValidation = {
    createVariant,
    updateVariant,
};
