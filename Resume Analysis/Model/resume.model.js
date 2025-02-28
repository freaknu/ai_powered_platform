import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  title: String,
  skills: [String],
  experience: [
    {
      company: String,
      title: String,
      years: Number,
    },
  ],
  education: [
    {
      degree: String,
      field: String,
      year: Number,
    },
  ],
  atsScore: Number,
  matchedSkills: [String],
  matchedEducation: [String],
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
