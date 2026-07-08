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
exports.adminController = void 0;
const admin_services_1 = require("./admin.services");
const http_status_1 = __importDefault(require("http-status"));
const deleteCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_services_1.adminService.deleteCaptain(id);
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
});
const deletePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_services_1.adminService.deletePlayer(id);
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
});
const deleteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_services_1.adminService.deleteTeam(id);
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
});
const confirmPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_services_1.adminService.confirmPlayer(id);
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
});
const requestPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_services_1.adminService.requestPlayer();
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
});
const createSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_services_1.adminService.createSuperAdmin(req.body);
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
});
exports.adminController = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
