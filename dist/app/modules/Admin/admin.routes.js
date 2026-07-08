"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin.controllers");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.delete("/delete-captain/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), admin_controllers_1.adminController.deleteCaptain);
router.get("/request-player", 
// auth(UserRole.ADMIN),
admin_controllers_1.adminController.requestPlayer);
router.delete("/delete-player/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), admin_controllers_1.adminController.deletePlayer);
router.delete("/delete-team/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), admin_controllers_1.adminController.deleteTeam);
router.patch("/confirm-player/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), (req, res, next) => {
    return admin_controllers_1.adminController.confirmPlayer(req, res, next);
});
router.post("/super-admin", admin_controllers_1.adminController.createSuperAdmin);
exports.adminRoutes = router;
