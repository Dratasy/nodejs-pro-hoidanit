
import { createUserApi, deleteUserByIdApi, getAllUsersApi, getUserByIdApi, loginAPI, postAddProductToCartAPI, updateUserByIdApi } from 'controllers/client/api.controller';
import { create } from 'domain';
import express, { Express } from 'express';
import { getUserById } from 'services/user.service';
import { checkValidJwt } from 'src/middleware/jwt.middleware.';


const router = express.Router();
const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCartAPI);

    router.get("/users", checkValidJwt, getAllUsersApi);
    router.get("/users/:id", getUserByIdApi);
    router.post("/users", createUserApi);
    router.put("/users/:id", updateUserByIdApi);
    router.delete("/users/:id", deleteUserByIdApi);

    router.post('/login', loginAPI);

    app.use("/api", router);

}
export default apiRoutes;
