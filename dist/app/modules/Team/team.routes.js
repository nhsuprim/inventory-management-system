"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const team_controllers_1 = require("./team.controllers");
const router = express_1.default.Router();
router.get("/", 
// auth("CAPTAIN"),
(req, res, next) => {
    return team_controllers_1.teamControllers.getAllTeam(res);
});
exports.teamRoutes = router;
