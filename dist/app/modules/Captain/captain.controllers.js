"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const captain_services_1 = require("./captain.services");
const createTeam = async (req, res, next) => {
    const user = req.user;
    const result = await captain_services_1.captainServices.createTeam(user, req);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Team inserted successfully",
        data: result,
    });
};
const getAllCaptains = async (res) => {
    const result = await captain_services_1.captainServices.getAllCaptains();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All captain fetched successfully",
        data: result,
    });
};
exports.captainControllers = {
    createTeam,
    getAllCaptains,
};
