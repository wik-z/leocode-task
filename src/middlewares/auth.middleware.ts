import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserData } from '../models/User';

export default function authMiddleware(req: Request, res: Response, next: NextFunction): (Response<any> | void) {
    // read the "Authorization" header
    const authorization: string = req.get('Authorization');

    // if "Authorization" is empty, user is clearly not allowed in
    if (!authorization) {
        return res.sendStatus(401);
    }
    
    // JWT token is kept in Authorization header in a form of "Bearer [TOKEN]"
    // therefore we need to split it and read the latter part
    const splitAuthorization: Array<string> = authorization.split(' ');
    
    if (splitAuthorization.length !== 2) {
        return res.sendStatus(401);
    }

    // read the token
    const authToken = splitAuthorization[1];

    let payload;
    try {
        // verify the JWT token and extract the information from it
        payload = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET) as UserData;
    } catch (e) {
        // if something went wrong, do not authorize
        return res.sendStatus(401);
    }
    
    // create a new User instance based on the infromation in JWT
    req.user = new User(payload);

    next();
}