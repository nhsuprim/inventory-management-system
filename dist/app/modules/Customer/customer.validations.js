"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = require("zod");
const phone = zod_1.z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(30, "Phone number must be at most 30 characters");
const email = zod_1.z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional();
const createCustomer = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Customer name is required"),
    phone,
    email,
    address: zod_1.z.string().trim().optional(),
});
const updateCustomer = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Customer name cannot be empty").optional(),
    phone: phone.optional(),
    email,
    address: zod_1.z.string().trim().optional(),
})
    .refine((data) => data.name !== undefined ||
    data.phone !== undefined ||
    data.email !== undefined ||
    data.address !== undefined, { message: "Provide at least one customer field to update" });
exports.customerValidation = {
    createCustomer,
    updateCustomer,
};
