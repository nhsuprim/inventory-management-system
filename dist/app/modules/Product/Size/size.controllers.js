"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeControllers = void 0;
const size_services_1 = require("./size.services");
const createSize = async (req, res, next) => {
    try {
        const size = await size_services_1.sizeService.createSize(req);
        res.status(201).json({
            success: true,
            message: "Size created successfully",
            data: size,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateSize = async (req, res, next) => {
    try {
        const size = await size_services_1.sizeService.updateSize(req);
        res.status(200).json({
            success: true,
            message: "Size updated successfully",
            data: size,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateStock = async (req, res, next) => {
    try {
        const size = await size_services_1.sizeService.updateStock(req);
        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: size,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteSize = async (req, res, next) => {
    try {
        const size = await size_services_1.sizeService.deleteSize(req);
        res.status(200).json({
            success: true,
            message: "Size deleted successfully",
            data: size,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sizeControllers = {
    createSize,
    updateSize,
    updateStock,
    deleteSize,
};
