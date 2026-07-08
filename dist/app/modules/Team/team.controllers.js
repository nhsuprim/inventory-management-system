"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const team_services_1 = require("./team.services");
const getAllTeam = async (res) => {
    const result = await team_services_1.teamServices.getAllTeam();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All team fetched successfully",
        data: result,
    });
};
exports.teamControllers = {
    getAllTeam,
};
