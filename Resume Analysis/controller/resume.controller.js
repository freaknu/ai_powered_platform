import Resume from "../Model/resume.model.js";
import calculateATS from "../utils/ats-check.js";
import extractResumeData from "../utils/resume-processor.js";

const jobTemplate = {
  title: "Full Stack Developer",
  skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  experience: 3,
  education: ["B.Tech", "BCA"],
};

export const uploadresume = async (req, res) => {
  try {
    const { resumetext, name, title } = req.body;

    const extractedData = await extractResumeData(resumetext);
    const resumeData = { name, title, ...extractedData };

    const atsResult = calculateATS(resumeData, jobTemplate);

    const resume = new Resume({
      ...resumeData,
      atsScore: atsResult.atsScore,
      matchedSkills: atsResult.matchedSkills,
      matchedEducation: atsResult.matchedEducation,
    });

    await resume.save();
    return res
      .status(200)
      .json({ message: "Resume Uploaded Successfully", resumeId: resume._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getresume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume Not Found" });

    return res.status(200).json({ resume });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
