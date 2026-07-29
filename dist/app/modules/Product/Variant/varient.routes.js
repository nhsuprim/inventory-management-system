"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const varient_validations_1 = require("./varient.validations");
const varient_controller_1 = require("./varient.controller");
const router = express_1.default.Router();
//parents route = /api/products/:id/variants
router.post("/:id/variants", fileUploaders_1.fileUploader.upload.any(), (req, res, next) => {
    try {
        req.body = varient_validations_1.variantValidation.createVariant.parse(JSON.parse(req.body.data));
        return varient_controller_1.variantControllers.createVariant(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.get("/:id/variants", varient_controller_1.variantControllers.getVariantsByProduct);
router.patch("/:id/variants/:id", fileUploaders_1.fileUploader.upload.any(), (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        return varient_controller_1.variantControllers.updateVariant(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/variants/:id", varient_controller_1.variantControllers.deleteVariant);
exports.variantRoutes = router;
