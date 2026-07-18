import express, { Request, Response, NextFunction } from "express";
import { sizeValidation } from "./size.validation";
import { sizeControllers } from "./size.controllers";

const router = express.Router();

//parents route = /api/products/

router.post(
    "/variants/:id/sizes",
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = sizeValidation.createSize.parse(req.body);

            return sizeControllers.createSize(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    "/sizes/:id",
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = sizeValidation.updateSize.parse(req.body);
            return sizeControllers.updateSize(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    "/sizes/:id/stock",
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = sizeValidation.updateStock.parse(req.body);
            return sizeControllers.updateStock(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.delete("/sizes/:id", sizeControllers.deleteSize);

export const sizeRoutes = router;
