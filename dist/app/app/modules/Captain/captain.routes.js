"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainRoutes = void 0;
const express_1 = __importDefault(require("express"));
const captain_controllers_1 = require("./captain.controllers");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const fileUploaders_1 = require("../../helpers/fileUploaders");
const captain_validation_1 = require("./captain.validation");
const router = express_1.default.Router();
router.post("/create-team", (0, authMiddleware_1.default)("CAPTAIN"), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = captain_validation_1.captainValidation.createTeam.parse(JSON.parse(req.body.data));
    return captain_controllers_1.captainControllers.createTeam(req, res, next);
});
router.get("/", 
// auth("CAPTAIN"),
(req, res, next) => {
    return captain_controllers_1.captainControllers.getAllCaptains(res);
});
exports.captainRoutes = router;
