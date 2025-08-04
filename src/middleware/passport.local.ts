import passport, { use } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { handleLogin } from "services/client/auth.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, function verify(username, password, callback) {
        console.log(">>>> check username/password: ", username, password);
        handleLogin(username, password, callback);
    }));
}



export default configPassportLocal;