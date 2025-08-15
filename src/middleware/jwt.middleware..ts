import { NextFunction, Request, Response } from "express";

const checkValidJwt = async (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)

    next();

}

export { checkValidJwt }