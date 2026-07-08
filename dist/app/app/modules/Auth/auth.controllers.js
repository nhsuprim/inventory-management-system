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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("./auth.services");
const http_status_1 = __importDefault(require("http-status"));
const logInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthService.logInUser(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
        });
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: result.accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const result = yield auth_services_1.AuthService.refreshToken(refreshToken);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Refresh token generated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield auth_services_1.AuthService.changePassword(user, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthService.forgetPassword(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password reset link sent successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization || "";
        const result = yield auth_services_1.AuthService.resetPassword(token, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password reset successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    logInUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
