import { z } from "zod";

const phone = z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(30, "Phone number must be at most 30 characters");

const email = z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional();

const createCustomer = z.object({
    name: z.string().trim().min(1, "Customer name is required"),
    phone,
    email,
    address: z.string().trim().optional(),
});

const updateCustomer = z
    .object({
        name: z.string().trim().min(1, "Customer name cannot be empty").optional(),
        phone: phone.optional(),
        email,
        address: z.string().trim().optional(),
    })
    .refine(
        (data) =>
            data.name !== undefined ||
            data.phone !== undefined ||
            data.email !== undefined ||
            data.address !== undefined,
        { message: "Provide at least one customer field to update" },
    );

export const customerValidation = {
    createCustomer,
    updateCustomer,
};
