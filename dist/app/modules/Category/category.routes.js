"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controllers_1 = require("./category.controllers");
const router = express_1.default.Router();
router.post("/create-category", (req, res, next) => {
    return category_controllers_1.categoryController.createCategory(req, res, next);
});
router.get("/", (req, res, next) => {
    return category_controllers_1.categoryController.getAllCategories(req, res, next);
});
router.get("/:id", (req, res, next) => {
    return category_controllers_1.categoryController.getCategoryById(req, res, next);
});
router.delete("/:id", (req, res, next) => {
    return category_controllers_1.categoryController.deleteCategory(req, res, next);
});
router.patch("/:id", (req, res, next) => {
    return category_controllers_1.categoryController.updateCategory(req, res, next);
});
exports.categoryRoutes = router;
