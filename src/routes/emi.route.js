import express, { Router } from 'express';
import { calculateEMIHandler, getAllLoans, getLoanById } from '../service/emi.service.js';
const emiRouter = express.Router();

emiRouter.post('/api/calculate-emi', calculateEMIHandler);
emiRouter.get('/api/emis', getAllLoans);
emiRouter.get('/api/emi/:id', getLoanById);

export default emiRouter;
