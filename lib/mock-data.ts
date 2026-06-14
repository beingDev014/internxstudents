export const internships = [
  {
    id: "ds-01",
    title: "Data Science Internship",
    domain: "Data Science",
    duration: "6 Months",
    stipend: "$1500/mo",
    color: "from-blue-500 to-cyan-500",
    description: "Work on real-world predictive models and big data analytics pipelines.",
    tags: ["Python", "TensorFlow", "SQL", "Pandas"],
  },
  {
    id: "ai-01",
    title: "Artificial Intelligence",
    domain: "AI/ML",
    duration: "4 Months",
    stipend: "$1800/mo",
    color: "from-purple-500 to-indigo-500",
    description: "Develop generative AI models and integrate natural language processing.",
    tags: ["PyTorch", "LLMs", "OpenAI", "FastAPI"],
  },
  {
    id: "web-01",
    title: "Full Stack Web Development",
    domain: "Web Dev",
    duration: "3 Months",
    stipend: "$1200/mo",
    color: "from-pink-500 to-rose-500",
    description: "Build highly scalable and interactive web applications from scratch.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "cy-01",
    title: "Cyber Security Analyst",
    domain: "Cyber Security",
    duration: "6 Months",
    stipend: "$1600/mo",
    color: "from-emerald-500 to-teal-500",
    description: "Perform penetration testing and secure enterprise architectures.",
    tags: ["Kali Linux", "Networks", "Ethical Hacking"],
  },
];

export const mockApplications = [
  { id: "APP-001", name: "Alex Mercer", email: "alex.m@example.com", domain: "Data Science", status: "Pending", date: "Oct 12, 2026" },
  { id: "APP-002", name: "Sarah Connor", email: "sarah.c@example.com", domain: "AI/ML", status: "Approved", date: "Oct 11, 2026" },
  { id: "APP-003", name: "James Holden", email: "james.h@example.com", domain: "Web Dev", status: "Rejected", date: "Oct 10, 2026" },
  { id: "APP-004", name: "Ellen Ripley", email: "ellen.r@example.com", domain: "Cyber Security", status: "Pending", date: "Oct 09, 2026" },
];

export const mockTasks = [
  { id: "T-01", studentName: "Sarah Connor", taskTitle: "Build a Neural Net from Scratch", domain: "AI/ML", status: "Submitted" },
  { id: "T-02", studentName: "Alex Mercer", taskTitle: "EDA on Retail Dataset", domain: "Data Science", status: "Graded" },
];

export const mockCertificates = [
  { id: "CERT-9921", studentName: "John Doe", domain: "Web Dev", issuedDate: "Sep 20, 2026", status: "Verified" },
  { id: "CERT-9922", studentName: "Jane Smith", domain: "Data Science", issuedDate: "Aug 15, 2026", status: "Verified" },
];
