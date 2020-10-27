import express, { Router, } from 'express';
import * as controller from './auth.controller';
import authMiddleware from '../../middlewares/auth.middleware';
const router : Router = express.Router();

router.post('/sign-in', controller.signIn);

// authenticated routes
router.post('/generate-key-pair', [authMiddleware, controller.getKeyPair]);


export default router;