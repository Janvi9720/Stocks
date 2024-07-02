import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import PurchasedStock from "../models/purchased_stock.js";
import Transaction from "../models/transaction.js";
import ActionLog from "../models/action_log.js";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

// remove first transaction after a certain amount to keep logs clean
async function clearFirstLog(res, userId) {
  try {
    const countLogs = await ActionLog.find({ userId: userId }).countDocuments();
    if (countLogs > 20) {
      await ActionLog.findOneAndDelete(
        { userId: userId },
        { sort: { loggedAt: 1 } }
      );
    }
  } catch (error) {
    res.status(400).json({ message: "Failure to cleanup logs!" });
  }
}

export const registerUser = async (req, res) => {
  try {
    const bodyParams = req.body;
    const useAuthId = bodyParams.auth0Id
    const existingUser = await User.findOne({ auth0Id: useAuthId });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.", data: {
          result: {
            _id: existingUser._id,
            auth0Id: existingUser.auth0Id,
            name: existingUser.name,
            email: existingUser.email,
            image: existingUser.image,
            coins: existingUser.coins,
            userType: existingUser.userType,
          }
        }
      });
    }
    const { auth0Id, username, email, image, userType } = req.body;

    // const salt = await bcrypt.genSalt(12);
    // const passwordHashed = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      auth0Id: auth0Id,
      name: username,
      email: email,
      image: image,
      coins: 100000,
      userType: userType,
    });

    const registerLog = new ActionLog({
      userId: createdUser._id,
      logAction: "REGISTER",
    });
    await registerLog.save();
    clearFirstLog(res, createdUser._id);

    const userResponse = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      image: createdUser.image,
      coins: createdUser.coins,
      userType: userType,
    };

    res.status(201).json({ result: userResponse });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid login credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      jwtSecret,
      { expiresIn: "120m" }
    );

    const loginLog = new ActionLog({
      userId: existingUser._id,
      logAction: "LOGIN",
    });
    await loginLog.save();
    clearFirstLog(res, existingUser._id);

    const userResponse = {
      _id: existingUser._id,
      auth0Id: existingUser.auth0Id,
      name: existingUser.name,
      email: existingUser.email,
      image: existingUser.image,
      coins: existingUser.coins,
      userType: existingUser.userType,
    };

    res.status(200).json({ result: userResponse, token: token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

export const getUserList = async (req, res) => {
  try {
    const userData = await User.find();
    const userList = userData.map((user) => {
      const { _id, auth0Id, email, name, coins, image, userType } = user;
      return { _id, auth0Id, email, name, coins, image, userType };
    });

    res.status(200).json(userList);
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred fetching the user requested." });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    // const userData = await User.findOne({ auth0Id:req.auth0Id });

    const userResponse = {
      _id: userData._id,
      auth0Id: userData.auth0Id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
      coins: userData.coins,
      userType: userData.userType,
    };

    res.status(200).json(userResponse);
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred fetching the user requested." });
  }
};

export const updateUserName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(404).send(`No user with id: ${req.userId}`);
    }

    const userData = await User.findById(req.userId);

    if (userData.userType === "admin") {
      return res
        .status(400)
        .send({ message: "Not allowed to modify admin account!" });
    }

    await User.findByIdAndUpdate(req.userId, {
      name: `${firstName} ${lastName}`,
    });
    const updatedUser = await User.findById(req.userId);

    const userResponse = {
      name: updatedUser.name,
      email: updatedUser.email,
      coins: updatedUser.coins,
      userType: updatedUser.userType,
    };

    res.status(200).json(userResponse);
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred updating your username." });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, newPasswordConfirmed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(404).send(`No user with id: ${req.userId}`);
    }

    const userData = await User.findById(req.userId);

    if (userData.userType === "admin") {
      return res
        .status(400)
        .send({ message: "Not allowed to modify admin account!" });
    }

    if (newPassword !== newPasswordConfirmed) {
      return res.status(400).json({ message: "Passwords do not match!." });
    }

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      userData.password
    );

    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid old password!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.userId, { password: passwordHashed });
    res.status(200).json({ message: "Password successfully updated!" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred updating your username." });
  }
};

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id !== "undefined" ? req.params.id : req.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user with id: ${userId}`);
    }

    const userData = await User.findById(userId);

    // if (userData.userType === "admin") {
    //   return res
    //     .status(400)
    //     .send({ message: "Not allowed to modify admin account!" });
    // }

    await ActionLog.deleteMany({ userId: userId });
    await Transaction.deleteMany({ userId: userId });
    await PurchasedStock.deleteMany({ userId: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User successfully deleted!" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "An error has occurred removing the user." });
  }
};

export default router;
