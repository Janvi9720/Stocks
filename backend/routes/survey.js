import express from 'express';

import { getSurvey, addSurvey } from '../controllers/survey.js';

const router = express.Router();

router.get('/:id', getSurvey);
router.post('/', addSurvey);

export default router;
