"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    admin: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
    }),
});
const createCaptain = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    captain: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
    }),
});
//updated zod module
const createPlayer = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    player: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        transactionNumber: zod_1.z.string({
            required_error: "transactionNumber is required",
        }),
        age: zod_1.z.number().optional(), // Optional field
        battingOrder: zod_1.z.number().optional(), // Optional field
        bowlingType: zod_1.z.enum(["NONE", "SPIN", "FAST", "MEDIUM"]).optional(),
        auctionStatus: zod_1.z.enum(["AVAILABLE", "SOLD"]),
    }),
});
exports.userValidation = {
    createAdmin,
    createCaptain,
    createPlayer,
};
