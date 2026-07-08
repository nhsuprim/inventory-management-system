import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.services";
import httpStatus from "http-status";

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.logInUser(req.body);

        const { refreshToken } = result;

        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
        });

        res.status(httpStatus.OK).json({
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: result.accessToken,
                
            },
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { refreshToken } = req.cookies;
        const result = await AuthService.refreshToken(refreshToken);

        res.status(httpStatus.OK).json({
            success: true,
            message: "Refresh token generated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        const result = await AuthService.changePassword(user, req.body);

        res.status(httpStatus.OK).json({
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const forgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await AuthService.forgetPassword(req.body);

        res.status(httpStatus.OK).json({
            success: true,
            message: "Password reset link sent successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization || "";
        const result = await AuthService.resetPassword(token, req.body);

        res.status(httpStatus.OK).json({
            success: true,
            message: "Password reset successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    logInUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};

