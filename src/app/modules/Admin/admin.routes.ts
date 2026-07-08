import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controllers";
import auth from "../../middleware/authMiddleware";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.delete(
    "/delete-captain/:id",
    auth(UserRole.ADMIN),
    adminController.deleteCaptain
);
router.get(
    "/request-player",
    // auth(UserRole.ADMIN),
    adminController.requestPlayer
);
router.delete(
    "/delete-player/:id",
    auth(UserRole.ADMIN),
    adminController.deletePlayer
);
router.delete(
    "/delete-team/:id",
    auth(UserRole.ADMIN),
    adminController.deleteTeam
);
router.patch(
    "/confirm-player/:id",
    auth(UserRole.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        return adminController.confirmPlayer(req, res, next);
    }
);

router.post("/super-admin", adminController.createSuperAdmin);

export const adminRoutes = router;
