"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const fileUploaders_1 = require("../../helpers/fileUploaders");
const user_validation_1 = require("./user.validation");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/create-admin", 
// auth("ADMIN", "SUPERADMIN"),
fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return user_controllers_1.userControllers.createAdmin(req, res, next);
});
router.post("/create-captain", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createCaptain.parse(JSON.parse(req.body.data));
    return user_controllers_1.userControllers.createCaptain(req, res, next);
});
router.post("/create-player", 
// auth("ADMIN", "SUPERADMIN"),
fileUploaders_1.fileUploader.upload.array("files", 3), // Allow up to 3 files, adjust the number as needed
(req, res, next) => {
    try {
        req.body = user_validation_1.userValidation.createPlayer.parse(JSON.parse(req.body.data));
        return user_controllers_1.userControllers.createPlayer(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.get("/admin", 
// auth("ADMIN", "SUPERADMIN"),
user_controllers_1.userControllers.getAdmin);
exports.userRoutes = router;
