import { Request } from 'express';
import User from "./models/User";

// adds the user model to the request
declare module 'express' {
    export interface Request {
        user?: User
    }
}