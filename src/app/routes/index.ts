import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { playerRoutes } from "../modules/Player/player.routes";
import { teamRoutes } from "../modules/Team/team.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { categoryRoutes } from "../modules/Category/category.routes";
import { productRoutes } from "../modules/Product/product.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/category",
        route: categoryRoutes,
    },
    {
        path: "/product",
        route: productRoutes,
    },
    {
        path: "/team",
        route: teamRoutes,
    },
    {
        path: "/admin",
        route: adminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
