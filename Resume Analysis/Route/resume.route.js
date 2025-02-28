import express from "express";
import { uploadresume, getresume } from "../controller/resume.controller.js";

const router = express.Router();

router.post("/upload-resume", uploadresume);
router.get("/get-resume-analysis/:id", getresume);

export default router;
