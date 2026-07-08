"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("./auth.services");
const http_status_1 = __importDefault(require("http-status"));
const logInUser = async (req, res, next) => {
    try {
        const result = await auth_services_1.AuthService.logInUser(req.body);
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
};
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const result = await auth_services_1.AuthService.refreshToken(refreshToken);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Refresh token generated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const changePassword = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await auth_services_1.AuthService.changePassword(user, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const forgetPassword = async (req, res, next) => {
    try {
        const result = await auth_services_1.AuthService.forgetPassword(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password reset link sent successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const token = req.headers.authorization || "";
        const result = await auth_services_1.AuthService.resetPassword(token, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Password reset successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AuthController = {
    logInUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
