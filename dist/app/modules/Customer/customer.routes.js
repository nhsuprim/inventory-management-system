"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controllers_1 = require("./customer.controllers");
const router = express_1.default.Router();
router.post("/create-category", (req, res, next) => {
    return customer_controllers_1.customerControllers.createCustomer(req, res, next);
});
router.get("/", (req, res, next) => {
    return customer_controllers_1.customerControllers.getAllCustomers(req, res, next);
});
router.get("/:id", (req, res, next) => {
    return customer_controllers_1.customerControllers.getSingleCustomer(req, res, next);
});
router.delete("/:id", (req, res, next) => {
    return customer_controllers_1.customerControllers.deleteCustomer(req, res, next);
});
router.patch("/:id", (req, res, next) => {
    return customer_controllers_1.customerControllers.updateCustomer(req, res, next);
});
exports.customerRoutes = router;
