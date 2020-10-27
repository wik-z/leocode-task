import express, { Router, Request, Response } from 'express';
import authRouter from './modules/auth/auth.routes';
import pdfRouter from './modules/pdf/pdf.routes';
const router: Router = express.Router();

// health check route
router.get('/health-check', (req: Request, res: Response): Response<any> => res.sendStatus(200));

// application routers
router.use(authRouter);
router.use(pdfRouter);


export default router;