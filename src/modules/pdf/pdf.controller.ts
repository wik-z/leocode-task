import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';

export function encrypt(req: Request, res: Response): Response<any> {
    req.user.load(); // load the model fully from the database

    const pubKey = req.user.pubKey;

    // if the user doesn't have the public key assigned to them, abort
    if (!pubKey) {
        return res.sendStatus(403);
    }

    const pathToFile: string = path.resolve(__dirname + '../../../../assets/sample.pdf');
    fs.readFile(pathToFile, (err, data) => {
        if (err) {
            return res.sendStatus(500);
        }

        const encryptedContent = CryptoJS.AES.encrypt(data.toString(), pubKey);

        res.type('application/octet-stream')
            .set('Content-disposition: attachment; filename=sample.pdf.encrypted')
            .send(encryptedContent.toString());
        });
}
    
