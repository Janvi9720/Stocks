import express from 'express';
import Survey from '../models/survey.js';

const router = express.Router();

// GET /:id
export const getSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const oneSurvey = await Survey.findById(id);
        res.status(200).json(oneSurvey);
    } catch (error) {
        res.status(404).json({ message: "An error has occurred fetching the survey." });
    }
}

// POST
export const addSurvey = async (req, res) => {
    try {
        const { response, comment, userId } = req.body;

        const user = await User.findById(req.userId);

        const newSurvey = new Survey({
            userId: user,
            response: response,
            comment: comment,
        });

        res.status(200).json(newSurvey);
    } catch (error) {
        res.status(404).json({ message: "An error has occurred creating survey." });
    }
}

export default router;
