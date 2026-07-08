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
exports.playerControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const player_services_1 = require("./player.services");
const getAllPlayers = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_services_1.playerServices.getAllPlayers();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
});
const getAllRequest = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_services_1.playerServices.getAllRequest();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
});
const getPlayerById = (res, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield player_services_1.playerServices.getPlayerById(id);
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
});
const soldPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield player_services_1.playerServices.soldPlayer(id, data);
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
});
const removeTeamPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield player_services_1.playerServices.removeTeamPlayer(id);
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
});
exports.playerControllers = {
    getAllPlayers,
    soldPlayer,
    getPlayerById,
    removeTeamPlayer,
    getAllRequest,
};
