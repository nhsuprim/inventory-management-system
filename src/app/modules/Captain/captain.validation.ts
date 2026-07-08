import { z } from "zod";

const createTeam = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    balance: z.number({
        required_error: "Balance is required",
    }),
});

export const captainValidation = {
    createTeam,
};
