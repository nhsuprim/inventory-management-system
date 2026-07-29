"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantValidation = void 0;
const zod_1 = require("zod");
const createVariant = zod_1.z.object({
    color: zod_1.z.string().trim().min(1, "Color is required"),
});
const updateVariant = zod_1.z.object({
    color: zod_1.z.string().trim().min(1, "Color cannot be empty").optional(),
});
exports.variantValidation = {
    createVariant,
    updateVariant,
};
