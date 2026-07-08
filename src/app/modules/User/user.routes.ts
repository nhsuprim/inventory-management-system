import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controllers";
import { fileUploader } from "../../helpers/fileUploaders";
import { userValidation } from "./user.validation";
import auth from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
    "/create-admin",
    // auth("ADMIN", "SUPERADMIN"),
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));

        return userControllers.createAdmin(req, res, next);
    }
);
router.post(
    "/create-captain",
    auth("ADMIN", "SUPERADMIN"),
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createCaptain.parse(
            JSON.parse(req.body.data)
        );

        return userControllers.createCaptain(req, res, next);
    }
);
router.post(
    "/create-player",
    // auth("ADMIN", "SUPERADMIN"),
    fileUploader.upload.array("files", 3), // Allow up to 3 files, adjust the number as needed
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = userValidation.createPlayer.parse(
                JSON.parse(req.body.data)
            );
            return userControllers.createPlayer(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);
router.patch(
    "/change-password/:id",
    auth("ADMIN", "SUPERADMIN"),
    userControllers.changePassword
);
router.get(
    "/admin",
    // auth("ADMIN", "SUPERADMIN"),
    userControllers.getAdmin
);

export const userRoutes = router;
