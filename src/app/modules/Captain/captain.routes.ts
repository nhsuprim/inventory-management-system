import express, { NextFunction, Request, Response } from "express";
import { captainControllers } from "./captain.controllers";
import auth from "../../middleware/authMiddleware";
import { fileUploader } from "../../helpers/fileUploaders";
import { captainValidation } from "./captain.validation";

const router = express.Router();

router.post(
    "/create-team",
    auth("CAPTAIN"),
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = captainValidation.createTeam.parse(
            JSON.parse(req.body.data)
        );

        return captainControllers.createTeam(req, res, next);
    }
);

router.get(
    "/",
    // auth("CAPTAIN"),
    (req: Request, res: Response, next: NextFunction) => {
        return captainControllers.getAllCaptains(res);
    }
);

export const captainRoutes = router;
