import { z } from "zod";

const createAdmin = z.object({
    password: z.string({
        required_error: "Password is required",
    }),
    admin: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }),
    }),
});
const createCaptain = z.object({
    password: z.string({
        required_error: "Password is required",
    }),
    captain: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }),
    }),
});
//updated zod module

const createPlayer = z.object({
    password: z.string({
        required_error: "Password is required",
    }),
    player: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required",
        }),
        address: z.string({
            required_error: "Address is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }),
        transactionNumber: z.string({
            required_error: "transactionNumber is required",
        }),
        age: z.number().optional(), // Optional field
        battingOrder: z.number().optional(), // Optional field
        bowlingType: z.enum(["NONE", "SPIN", "FAST", "MEDIUM"]).optional(),
        auctionStatus: z.enum(["AVAILABLE", "SOLD"]),
    }),
});

export const userValidation = {
    createAdmin,
    createCaptain,
    createPlayer,
};
