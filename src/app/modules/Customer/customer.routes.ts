import express, { NextFunction, Request, Response } from "express";
import { customerControllers } from "./customer.controllers";

const router = express.Router();

router.post(
    "/create-category",
    (req: Request, res: Response, next: NextFunction) => {
        return customerControllers.createCustomer(req, res, next);
    },
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return customerControllers.getAllCustomers(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    return customerControllers.getSingleCustomer(req, res, next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    return customerControllers.deleteCustomer(req, res, next);
});

router.patch("/:id", (req: Request, res: Response, next: NextFunction) => {
    return customerControllers.updateCustomer(req, res, next);
});

export const customerRoutes = router;
