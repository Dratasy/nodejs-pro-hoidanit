import passport, { use } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { handleLogin } from "services/client/auth.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy(
        { usernameField: "username", passwordField: "password", passReqToCallback: true },
        function verify(req, username, password, callback) {
            const { session } = req as any;
            if (session?.messages?.length) {
                session.messages = [];
            }

            console.log(">>>> check username/password: ", username, password);
            handleLogin(username, password, callback);
        }));
    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            return cb(null, {
                id: user.id,
                username: user.username
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}



export default configPassportLocal;