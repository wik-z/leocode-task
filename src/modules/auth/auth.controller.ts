import { Request, Response } from 'express';
import { generateKeyPairSync } from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

type SignInRequest = {
    email: string,
    password: string 
}

export function signIn (req: Request, res: Response): Response<any> {
    const { email, password }: SignInRequest = req.body;

    if (!email || !password) {
        return res.sendStatus(400);
    }

    const user = User.firstWhere({ email, password });

    if (!user) {
        return res.sendStatus(401);
    }

    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

    return res.json({ authToken: token });
}

export function getKeyPair(req: Request, res: Response): Response<any> {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', { 
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: process.env.RSA_PRIVATEKEY_PASSPHRASE
        }
        
    });

    req.user.pubKey = publicKey;
    req.user.save(); // save the user model in the database

    return res.json({ pubKey: publicKey, privKey: privateKey });
}