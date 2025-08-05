import { User, Role } from "prisma/prisma-client"

declare global {
    namespace Express {
        interface User extends User {
            role?: Role;
        }
    }
}