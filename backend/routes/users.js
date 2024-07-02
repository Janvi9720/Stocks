import express from "express";
const router = express.Router();

import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { registerUser, loginUser, getUserList, getUserInfo, updateUserName, updateUserPassword, removeUser } from "../controllers/users.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userlist", jwtCheck, jwtParse, getUserList);
router.get("/userinfo/", jwtCheck, jwtParse, getUserInfo);
router.patch("/username", jwtCheck, jwtParse, updateUserName);
router.patch("/password", jwtCheck, jwtParse, updateUserPassword);
router.delete("/removeuser/:id", jwtCheck, jwtParse, removeUser);

export default router;
