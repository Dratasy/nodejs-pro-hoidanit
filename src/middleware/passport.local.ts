import passport, { use } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { getUserSumCart, getUserWithRoleById, handleLogin } from "services/client/auth.service";
import { getUserById } from "services/user.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy(
        { usernameField: "username", passwordField: "password", passReqToCallback: true },
        function verify(req, username, password, callback) {
            const { session } = req as any;
            if (session?.messages?.length) {
                session.messages = [];
            }

            console.log(">>> check username/password: ", username, password);
            handleLogin(username, password, callback);
        }));

    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        const userInDb: any = await getUserWithRoleById(id);
        const sumCart = await getUserSumCart(id);


        callback(null, { ...userInDb, sumCart: sumCart });
    });
}



export default configPassportLocal;