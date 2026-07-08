import express, { NextFunction, Request, Response } from "express";
import { categoryController } from "./category.controllers";

const router = express.Router();

router.post(
    "/create-category",
    (req: Request, res: Response, next: NextFunction) => {
        return categoryController.createCategory(req, res, next);
    },
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return categoryController.getAllCategories(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    return categoryController.getCategoryById(req, res, next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    return categoryController.deleteCategory(req, res, next);
});

router.patch("/:id", (req: Request, res: Response, next: NextFunction) => {
    return categoryController.updateCategory(req, res, next);
});

export const categoryRoutes = router;
