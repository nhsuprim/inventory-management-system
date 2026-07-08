"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_services_1 = require("./user.services");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.createAdmin(req);
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
});
const createCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.createCaptain(req);
        res.status(200).json({
            success: true,
            message: "Captain created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
});
const createPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.createPlayer(req);
        res.status(200).json({
            success: true,
            message: "Player created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
});
const getAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAdmin();
        res.status(200).json({
            success: true,
            message: "Admin retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
});
exports.userControllers = {
    createAdmin,
    createCaptain,
    createPlayer,
    getAdmin,
};
