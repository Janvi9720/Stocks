import express from 'express';
import { getSurvey, addSurvey } from '../controllers/survey.js';
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', jwtCheck, jwtParse, getSurvey);
router.post('/', jwtCheck, jwtParse, addSurvey);

export default router;
