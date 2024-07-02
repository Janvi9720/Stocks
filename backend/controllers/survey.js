import express from "express";
import Survey from "../models/survey.js";
import User from "../models/user.js";

const router = express.Router();

// GET
export const getSurvey = async (req, res) => {
  try {
    const userId = req.params.id !== "undefined" ? req.params.id : req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const survey = await Survey.findOne({ userId: userId });
    res.status(200).json(survey);
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred fetching the survey." });
  }
};

// POST
export const addSurvey = async (req, res) => {
  try {
    const { response, comment } = req.body;
    const user = await User.findById(req.userId);
    const newSurvey = new Survey({
      userId: user,
      response: response,
      comment: comment,
    });
    await newSurvey.save();
    res.status(200).json(newSurvey);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "An error has occurred creating survey." });
  }
};

export default router;
