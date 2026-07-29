"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const team_routes_1 = require("../modules/Team/team.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const category_routes_1 = require("../modules/Category/category.routes");
const product_routes_1 = require("../modules/Product/product.routes");
const varient_routes_1 = require("../modules/Product/Variant/varient.routes");
const size_routes_1 = require("../modules/Product/Size/size.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/category",
        route: category_routes_1.categoryRoutes,
    },
    {
        path: "/product",
        route: product_routes_1.productRoutes,
    },
    {
        path: "/product",
        route: varient_routes_1.variantRoutes,
    },
    {
        path: "/product",
        route: size_routes_1.sizeRoutes,
    },
    {
        path: "/team",
        route: team_routes_1.teamRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
