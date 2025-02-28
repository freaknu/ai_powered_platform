import express from "express";
import { createUser, login, profile } from "../controller/user.controller.js";

const route = express.Router();
route.post("/signup", createUser);
route.post("/signin", login);
route.get("/profile", profile);

export default route;
