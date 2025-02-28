const extractResumeData = async (resumeText) => {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "AWS",
    "Docker",
    "SQL",
  ];
  const educationDegrees = ["B.Tech", "M.Tech", "BCA", "MCA", "BE", "ME"];

  const extractedSkills = skills.filter((skill) => resumeText.includes(skill));

  const extractedEducation = educationDegrees.filter((degree) =>
    resumeText.includes(degree)
  );

  const experienceYears = (resumeText.match(/\d+ years/g) || []).map((e) =>
    parseInt(e)
  );

  const experience = [
    {
      company: "Unknown",
      title: "Various Roles",
      years: experienceYears.reduce((a, b) => a + b, 0) || 0,
    },
  ];

  return {
    skills: extractedSkills,
    education: extractedEducation.map((degree) => ({
      degree,
      field: "N/A",
      year: 2020,
    })),
    experience,
  };
};

export default extractResumeData;
