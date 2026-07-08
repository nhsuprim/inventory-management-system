"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const player_services_1 = require("./player.services");
const getAllPlayers = async (res) => {
    const result = await player_services_1.playerServices.getAllPlayers();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
};
const getAllRequest = async (res) => {
    const result = await player_services_1.playerServices.getAllRequest();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
};
const getPlayerById = async (res, req, next) => {
    try {
        const id = req.params.id;
        const result = await player_services_1.playerServices.getPlayerById(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "player fetched successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};
const soldPlayer = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await player_services_1.playerServices.soldPlayer(id, data);
        return res.status(http_status_1.default.OK).json({
            success: true,
            message: "Player updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};
const removeTeamPlayer = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await player_services_1.playerServices.removeTeamPlayer(id);
        return res.status(http_status_1.default.OK).json({
            success: true,
            message: "Player removed from team successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};
exports.playerControllers = {
    getAllPlayers,
    soldPlayer,
    getPlayerById,
    removeTeamPlayer,
    getAllRequest,
};
