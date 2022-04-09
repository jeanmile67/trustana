import express from 'express';
import requestController from '../controller/requestController.js';

export const router = express.Router();

router.get('/request', requestController);
