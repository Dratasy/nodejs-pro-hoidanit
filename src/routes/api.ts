
import { createUserApi, getAllUsersApi, getUserByIdApi, postAddProductToCartAPI } from 'controllers/client/api.controller';
import { create } from 'domain';
import express, { Express } from 'express';
import { getUserById } from 'services/user.service';


const router = express.Router();
const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCartAPI);

    router.get("/users", getAllUsersApi);
    router.get("/users/:id", getUserByIdApi);
    router.post("/users", createUserApi);

    app.use("/api", router);

}
export default apiRoutes;
