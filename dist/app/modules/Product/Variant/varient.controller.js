"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantControllers = void 0;
const variant_services_1 = require("./variant.services");
const createVariant = async (req, res, next) => {
    try {
        const variant = await variant_services_1.variantService.createVarient(req);
        res.status(201).json({
            success: true,
            message: "Variant created successfully",
            data: variant,
        });
    }
    catch (error) {
        next(error);
    }
};
const getVariantsByProduct = async (req, res, next) => {
    try {
        const variants = await variant_services_1.variantService.getVariantsByProduct(req);
        res.status(200).json({
            success: true,
            message: "Variants retrieved successfully",
            data: variants,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateVariant = async (req, res, next) => {
    try {
        const variant = await variant_services_1.variantService.updateVariant(req);
        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: variant,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteVariant = async (req, res, next) => {
    try {
        const variant = await variant_services_1.variantService.deleteVariant(req);
        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            data: variant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.variantControllers = {
    createVariant,
    getVariantsByProduct,
    updateVariant,
    deleteVariant,
};
