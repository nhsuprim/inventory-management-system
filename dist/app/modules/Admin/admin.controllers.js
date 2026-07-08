"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_services_1 = require("./admin.services");
const http_status_1 = __importDefault(require("http-status"));
const deleteCaptain = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await admin_services_1.adminService.deleteCaptain(id);
        res.status(200).json({
            success: true,
            message: "Captain deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deletePlayer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await admin_services_1.adminService.deletePlayer(id);
        res.status(200).json({
            success: true,
            message: "Player deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteTeam = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await admin_services_1.adminService.deleteTeam(id);
        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const confirmPlayer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await admin_services_1.adminService.confirmPlayer(id);
        return res.status(http_status_1.default.OK).json({
            success: true,
            message: "Player confirmed successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const requestPlayer = async (req, res, next) => {
    try {
        const result = await admin_services_1.adminService.requestPlayer();
        return res.status(http_status_1.default.OK).json({
            success: true,
            message: "Player fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const createSuperAdmin = async (req, res) => {
    try {
        const result = await admin_services_1.adminService.createSuperAdmin(req.body);
        res.status(200).json({
            success: true,
            message: "Super admin created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.adminController = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
