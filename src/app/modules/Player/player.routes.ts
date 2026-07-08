import express, { NextFunction, Request, Response } from "express";
import { playerControllers } from "./player.controller";
import auth from "../../middleware/authMiddleware";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
    "/",
    // auth("CAPTAIN"),
    (req: Request, res: Response, next: NextFunction) => {
        return playerControllers.getAllPlayers(res);
    }
);

router.get(
    "/request",
    // auth("CAPTAIN"),
    (req: Request, res: Response, next: NextFunction) => {
        return playerControllers.getAllRequest(res);
    }
);

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    return playerControllers.getPlayerById(res, req, next);
});

router.patch(
    "/sold/:id",
    auth(UserRole.ADMIN),
    (req: Request, res: Response) => {
        return playerControllers.soldPlayer(req, res);
    }
);
router.patch(
    "/remove/:id",
    auth(UserRole.ADMIN),
    (req: Request, res: Response) => {
        return playerControllers.removeTeamPlayer(req, res);
    }
);

export const playerRoutes = router;
