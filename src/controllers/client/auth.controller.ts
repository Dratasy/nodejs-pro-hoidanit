import { NextFunction, Request, Response } from 'express';
import { registerNewUser } from 'services/client/auth.service';
import { RegisterSchema, TRegisterSchema } from 'src/validation/register.schema';

const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session?.messages ?? [];

    res.render('client/auth/login', {
        messages
    })
}

const getRegisterPage = (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        fullName: "", username: "", password: "", confirmPassword: ""
    }
    res.render('client/auth/register', {
        errors, oldData
    })
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword } = req.body as TRegisterSchema;

    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.path[0]}: ${item.message}`);
        const oldData = {
            fullName, username, password, confirmPassword
        }

        return res.render(`client/auth/register`, {
            errors, oldData
        });
    }

    await registerNewUser(fullName, username, password);
    return res.redirect('/login')
}

const getSuccessRedirectPage = (req: Request, res: Response) => {
    const user = req.user as any;

    if (user?.role?.name === "ADMIN") {
        res.redirect('/admin');
    }
    else res.redirect('/');
}

const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

export {
    getLoginPage,
    getRegisterPage,
    postRegister,
    getSuccessRedirectPage,
    postLogout
}

