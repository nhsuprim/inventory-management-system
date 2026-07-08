"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainValidation = void 0;
const zod_1 = require("zod");
const createTeam = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    balance: zod_1.z.number({
        required_error: "Balance is required",
    }),
});
exports.captainValidation = {
    createTeam,
};
