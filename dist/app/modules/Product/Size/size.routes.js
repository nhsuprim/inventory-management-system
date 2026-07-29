"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const size_validation_1 = require("./size.validation");
const size_controllers_1 = require("./size.controllers");
const router = express_1.default.Router();
//parents route = /api/products/
router.post("/variants/:id/sizes", (req, res, next) => {
    try {
        req.body = size_validation_1.sizeValidation.createSize.parse(req.body);
        return size_controllers_1.sizeControllers.createSize(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.patch("/sizes/:id", (req, res, next) => {
    try {
        req.body = size_validation_1.sizeValidation.updateSize.parse(req.body);
        return size_controllers_1.sizeControllers.updateSize(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.patch("/sizes/:id/stock", (req, res, next) => {
    try {
        req.body = size_validation_1.sizeValidation.updateStock.parse(req.body);
        return size_controllers_1.sizeControllers.updateStock(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/sizes/:id", size_controllers_1.sizeControllers.deleteSize);
exports.sizeRoutes = router;
