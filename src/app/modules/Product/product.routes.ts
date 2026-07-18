import express, { Request, Response, NextFunction } from "express";
import { productControllers } from "./product.controllers";
import { fileUploader } from "../../helpers/fileUploaders";
import { productValidation } from "./product.validations";

const router = express.Router();

router.post(
    "/",

    // auth(UserRole.ADMIN, UserRole.SUPERADMIN),
    // fileUploader.upload.single("file"),
    // fileUploader.upload.array("files", 10),
    fileUploader.upload.any(),

    // Route handler
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = productValidation.createProduct.parse(
                JSON.parse(req.body.data),
            );

            return productControllers.addProduct(req, res, next);
        } catch (error) {
            next(error);
        }
    },
);

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);

router.patch("/:id", fileUploader.upload.any(), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }

        return productControllers.updateProduct(req, res, next);
    } catch (error) {
        next(error);
    }
});

export const productRoutes = router;
