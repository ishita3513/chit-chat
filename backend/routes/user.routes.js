import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import getUsersForSideBar from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/",protectRoute,getUsersForSideBar);
export default userRoutes;