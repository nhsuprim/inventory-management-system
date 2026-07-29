import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { categoryRoutes } from "../modules/Category/category.routes";
import { productRoutes } from "../modules/Product/product.routes";
import { variantRoutes } from "../modules/Product/Variant/varient.routes";
import { sizeRoutes } from "../modules/Product/Size/size.routes";
import { customerRoutes } from "../modules/Customer/customer.routes";

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
        path: "/product",
        route: variantRoutes,
    },
    {
        path: "/product",
        route: sizeRoutes,
    },

    {
        path: "/customer",
        route: customerRoutes,
    },
    {
        path: "/admin",
        route: adminRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
