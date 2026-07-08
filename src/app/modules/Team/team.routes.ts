import express, { NextFunction, Request, Response } from "express";
import { teamControllers } from "./team.controllers";

const router = express.Router();

router.get(
    "/",
    // auth("CAPTAIN"),
    (req: Request, res: Response, next: NextFunction) => {
        return teamControllers.getAllTeam(res);
    }
);

export const teamRoutes = router;
