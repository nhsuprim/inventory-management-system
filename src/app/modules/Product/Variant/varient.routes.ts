import express, { Request, Response, NextFunction } from "express";
import { fileUploader } from "../../../helpers/fileUploaders";
import { variantValidation } from "./varient.validations";
import { variantControllers } from "./varient.controller";

const router = express.Router();

//parents route = /api/products/:id/variants

router.post(
    "/:id/variants",
    fileUploader.upload.any(),

    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = variantValidation.createVariant.parse(
                JSON.parse(req.body.data),
            );
            return variantControllers.createVariant(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.get("/:id/variants", variantControllers.getVariantsByProduct);

router.patch(
    "/:id/variants/:id",
    fileUploader.upload.any(),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body.data) {
                req.body = JSON.parse(req.body.data);
            }
            return variantControllers.updateVariant(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.delete("/variants/:id", variantControllers.deleteVariant);

export const variantRoutes = router;
