import express from "express";
import {
  generateColdEmail,
  generateFollowUp,
  generateQuestions,
  generateResumeFeedback,
} from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/cold-email", generateColdEmail);
router.post("/followup", generateFollowUp);
router.post("/questions", generateQuestions);
router.post("/resume-feedback", generateResumeFeedback);

export default router;