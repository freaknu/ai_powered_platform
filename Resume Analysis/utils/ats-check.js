const calculateATS = (resume, jobTemplate) => {
  const resumeSkills = resume.skills.map((skill) => skill.toLowerCase());
  const jobSkills = jobTemplate.skills.map((skill) => skill.toLowerCase());

  const matchedSkills = resumeSkills.filter((skill) =>
    jobSkills.includes(skill)
  );
  const skillScore = (matchedSkills.length / jobSkills.length) * 100;

  const resumeExperienceYears = resume.experience.reduce(
    (total, exp) => total + exp.years,
    0
  );
  const experienceScore =
    resumeExperienceYears >= jobTemplate.experience
      ? 100
      : (resumeExperienceYears / jobTemplate.experience) * 100;

  const resumeEducation = resume.education.map((edu) =>
    edu.degree.toLowerCase()
  );
  const matchedEducation = resumeEducation.filter((edu) =>
    jobTemplate.education.map((e) => e.toLowerCase()).includes(edu)
  );
  const educationScore = matchedEducation.length > 0 ? 100 : 0;

  const atsScore =
    skillScore * 0.5 + experienceScore * 0.3 + educationScore * 0.2;

  return {
    atsScore: atsScore.toFixed(2),
    matchedSkills,
    matchedEducation,
  };
};

export default calculateATS;
