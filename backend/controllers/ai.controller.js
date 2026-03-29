import Application from "../models/application.model.js";
import {
  buildColdEmailPrompt,
  buildFollowUpPrompt,
  buildInterviewQuestionsPrompt,
  buildResumeFeedbackPrompt,
} from "../utils/promptBuilder.js";
import { callAI } from "../services/ai.services.js";

export const generateColdEmail = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await Application.findOne({
      _id: applicationId,
      userId: req.user._id,
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const prompt = buildColdEmailPrompt(application);
    const result = await callAI(prompt, 0.7);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateFollowUp = async (req, res) => {
    try {
        const { applicationId } = req.body;
        const application = await Application.findOne({
            _id: applicationId,
            userId: req.user._id,
        });
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        const prompt = buildFollowUpPrompt(application);
        const result = await callAI(prompt, 0.6);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 export const generateQuestions = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const application = await Application.findOne({
      _id: applicationId,
      userId: req.user._id,
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const prompt = buildInterviewQuestionsPrompt(application);
    const result = await callAI(prompt, 0.5);  
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateResumeFeedback = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        message: "Both resumeText and jobDescription are required",
      });
    }
    const prompt = buildResumeFeedbackPrompt(resumeText, jobDescription);
    const result = await callAI(prompt, 0.4);  
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};