import express from 'express';
import { getSurvey, addSurvey } from '../controllers/survey.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/',auth, getSurvey);
router.post('/',auth, addSurvey);

export default router;
