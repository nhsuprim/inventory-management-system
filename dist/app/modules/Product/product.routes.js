"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("./product.controllers");
const fileUploaders_1 = require("../../helpers/fileUploaders");
const product_validations_1 = require("./product.validations");
const router = express_1.default.Router();
router.post("/", 
// auth(UserRole.ADMIN, UserRole.SUPERADMIN),
// fileUploader.upload.single("file"),
// fileUploader.upload.array("files", 10),
fileUploaders_1.fileUploader.upload.any(), 
// Route handler
(req, res, next) => {
    try {
        req.body = product_validations_1.productValidation.createProduct.parse(JSON.parse(req.body.data));
        return product_controllers_1.productControllers.addProduct(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.get("/", product_controllers_1.productControllers.getAllProducts);
router.get("/:id", product_controllers_1.productControllers.getProductById);
router.patch("/:id", fileUploaders_1.fileUploader.upload.any(), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        return product_controllers_1.productControllers.updateProduct(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.productRoutes = router;
