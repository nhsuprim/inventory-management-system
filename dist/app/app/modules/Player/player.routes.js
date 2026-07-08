"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("./player.controller");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", 
// auth("CAPTAIN"),
(req, res, next) => {
    return player_controller_1.playerControllers.getAllPlayers(res);
});
router.get("/request", 
// auth("CAPTAIN"),
(req, res, next) => {
    return player_controller_1.playerControllers.getAllRequest(res);
});
router.get("/:id", (req, res, next) => {
    return player_controller_1.playerControllers.getPlayerById(res, req, next);
});
router.patch("/sold/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), (req, res) => {
    return player_controller_1.playerControllers.soldPlayer(req, res);
});
router.patch("/remove/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), (req, res) => {
    return player_controller_1.playerControllers.removeTeamPlayer(req, res);
});
exports.playerRoutes = router;
