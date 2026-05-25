// export const personalInfo = {
//   name: "Rupesh Khadaka",
//   role: "Cybersecurity Researcher & ML Engineer",
//   email: "russellkshetri@gmail.com",
//   phone: "+977 9866555315",
//   location: "Kathmandu, Nepal",
//   availability: "Available for freelance",
//   aboutText1:
//     "I'm Rupesh Khadaka, a young malware researcher with a deep curiosity for how things work beneath the surface—especially when it comes to code and systems. My focus lies in reverse engineering, exploit analysis, and detection evasion techniques, where I constantly seek to uncover hidden threats and develop smarter ways to defend against them.",
//   aboutText2:
//     "Alongside my work in cybersecurity, I'm building my expertise as a machine learning engineer. I explore how machine learning models can be used for malware detection, behavioral analysis, and proactive threat mitigation. This intersection of AI and security drives much of my current research and learning.",
//   aboutText3:
//     "I have a strong foundation as a cybersecurity professional with hands-on experience in ethical hacking, penetration testing, and participating in CTF (Capture The Flag) competitions. These experiences sharpened my problem-solving skills and deepened my understanding of real-world attack vectors.",
// };

// export const stats = [
//   { value: "5+",   label: "Years Experience" },
//   { value: "50+",  label: "Projects Completed" },
//   { value: "100+", label: "Security Audits" },
//   { value: "25+",  label: "CTF Competitions" },
// ];

// export const experience = [
//   {
//     year: "2022 – Present",
//     title: "Malware Researcher & ML Engineer",
//     company: "Independent Research",
//     desc: "Focused on reverse engineering, exploit analysis, and machine learning applications in cybersecurity for threat detection and mitigation.",
//   },
//   {
//     year: "2019 – Present",
//     title: "Full-Stack Developer & System Analyst",
//     company: "Freelance",
//     desc: "Designed, built, and maintained scalable systems with focus on performance, security, and user experience. Specialized in both frontend and backend development.",
//   },
//   {
//     year: "2021 – 2022",
//     title: "Quality Assurance Specialist",
//     company: "Contract",
//     desc: "Gained practical skills in test planning, performance validation, and bug tracking, enhancing attention to detail and system reliability.",
//   },
//   {
//     year: "2020 – Present",
//     title: "Digital Marketing & Content Creator",
//     company: "Self-Employed",
//     desc: "Created engaging bilingual content, educational posts, and technical videos while contributing to SEO strategy and brand promotion.",
//   },
// ];

// export const projects = [
//   {
//     title: "Advanced Malware Detection System",
//     desc: "Machine learning-based malware detection system using behavioral analysis and static analysis techniques.",
//     tech: ["Python", "TensorFlow", "Scikit-learn", "Yara"],
//     color: "#00ff88",
//   },
//   {
//     title: "Penetration Testing Framework",
//     desc: "Comprehensive penetration testing framework with automated vulnerability scanning and reporting.",
//     tech: ["Python", "Bash", "Nmap", "Metasploit"],
//     color: "#00aaff",
//   },
//   {
//     title: "Secure E-Commerce Platform",
//     desc: "Full-stack e-commerce platform with advanced security features and payment integration.",
//     tech: ["JavaScript", "Node.js", "React", "MongoDB"],
//     color: "#aa88ff",
//   },
//   {
//     title: "Network Traffic Analyzer",
//     desc: "Real-time network traffic analysis tool with anomaly detection and security monitoring.",
//     tech: ["Python", "Wireshark", "Scapy", "Flask"],
//     color: "#00ff88",
//   },
//   {
//     title: "Cryptocurrency Portfolio Tracker",
//     desc: "Full-stack cryptocurrency portfolio management with real-time price tracking and analytics.",
//     tech: ["PHP", "MySQL", "JavaScript", "Chart.js"],
//     color: "#00aaff",
//   },
//   {
//     title: "Reverse Engineering Toolkit",
//     desc: "Collection of tools for malware reverse engineering, binary analysis, and exploit development.",
//     tech: ["Python", "C++", "Assembly", "IDA Pro"],
//     color: "#aa88ff",
//   },
//   {
//     title: "Advanced Nmap Scanner",
//     desc: "Custom Nmap automation tool with advanced scanning techniques and vulnerability detection.",
//     tech: ["Python", "Nmap", "XML Parsing", "SQLite"],
//     color: "#00ff88",
//   },
//   {
//     title: "MSF Payload Generator",
//     desc: "Automated payload generation and deployment system using Metasploit Framework and MSFvenom.",
//     tech: ["Metasploit", "MSFvenom", "Ruby", "Bash"],
//     color: "#00aaff",
//   },
//   {
//     title: "Wireshark Traffic Analyzer",
//     desc: "Advanced network packet analysis tool with automated threat detection and protocol analysis.",
//     tech: ["Wireshark", "Python", "Scapy", "TShark"],
//     color: "#aa88ff",
//   },
// ];

// export const researchPapers = [
//   {
//     id: "01",
//     status: "Published",
//     title: "Malware Classification Using ML (Extra Tree and Logistic Regression)",
//     authors: "Rupesh Khadaka",
//     desc: "Advanced machine learning approach for malware classification utilizing Extra Tree and Logistic Regression algorithms to enhance detection accuracy and reduce false positives.",
//     tags: ["Machine Learning", "Malware Detection", "Extra Tree", "Logistic Regression", "Cybersecurity"],
//   },
//   {
//     id: "02",
//     status: "Published",
//     title:
//       "Multi-Layered Cyber Defense: Combining AI-Based Malware Classification, Server Monitoring, and Penetration Testing",
//     authors: "Rupesh Khadaka, Prajwal Rai, Bibek Gautam",
//     desc: "Comprehensive study integrating malware classification techniques with server monitoring systems and penetration testing methodologies using advanced machine learning algorithms.",
//     tags: ["Server Monitoring", "Penetration Testing", "Malware Classification", "ML Algorithms"],
//   },
//   {
//     id: "03",
//     status: "Under Review",
//     title: "Cybersecurity and Cognitive Threat Detection in Smart Healthcare Systems",
//     authors: "Rupesh Khadaka, Prajwal Rai",
//     desc: "Novel approach to cybersecurity in smart healthcare systems incorporating cognitive threat detection mechanisms to protect sensitive medical data in IoT-enabled environments.",
//     tags: ["Smart Healthcare", "Cognitive Threat Detection", "IoT Security", "Medical Data Protection"],
//   },
//   {
//     id: "04",
//     status: "Under Review",
//     title: "AI-Driven Threat Intelligence for Proactive Cyber Defense using Federated Learning",
//     authors: "Rupesh Khadaka, Prajwal Rai, Nikhil Raut",
//     desc: "Advanced reinforcement learning framework combined with federated learning techniques for proactive cyber defense, enabling distributed threat intelligence sharing.",
//     tags: ["Reinforcement Learning", "Federated Learning", "Threat Intelligence", "Proactive Defense", "AI Security"],
//   },
// ];

// // Define the interface for Type Safety
// export interface SkillCategory {
//   category: string;
//   skills: string[];
//   icon: string;
// }

// export const skillsCategories: SkillCategory[] = [
//   {
//     category: "Cybersecurity & Ethical Hacking",
//     skills: ["Penetration Testing", "Malware Analysis", "Network Security"],
//     icon: "🛡",
//   },
//   {
//     category: "Penetration Testing Tools",
//     skills: ["Nmap", "Metasploit Framework", "Wireshark", "Burp Suite"],
//     icon: "⚔",
//   },
//   {
//     category: "Exploitation & Analysis",
//     skills: ["Hydra", "Hashcat", "John the Ripper", "MSFvenom"],
//     icon: "💀",
//   },
//   {
//     category: "Operating Systems & Environments",
//     skills: ["Kali Linux", "Parrot Security OS", "BlackArch Linux", "WSL2 & Ubuntu"],
//     icon: "🐧",
//   },
//   {
//     category: "Machine Learning & AI Security",
//     skills: ["TensorFlow", "Scikit-learn", "PyTorch", "YARA Rules"],
//     icon: "🧠",
//   },
//   {
//     category: "Programming Languages",
//     skills: ["Python", "JavaScript", "PHP", "C++"],
//     icon: "💻",
//   },
//   {
//     category: "Web Application Security",
//     skills: ["OWASP Top 10", "SQL Injection", "XSS & CSRF", "Directory Traversal"],
//     icon: "🔒",
//   },
//   {
//     category: "Advanced Hacking Tools",
//     skills: ["Aircrack-ng", "Nikto", "Gobuster", "SQLmap"],
//     icon: "🔧",
//   },
//   {
//     category: "Web Development",
//     skills: ["React", "Node.js", "MySQL", "MongoDB"],
//     icon: "🌐",
//   },
// ];
/**
 * PERSONAL INFORMATION
 */
export const personalInfo = {
  name: "Rupesh Khadaka",
  role: "Cybersecurity Researcher & ML Engineer",
  email: "russellkshetri@gmail.com",
  phone: "+977 9866555315",
  location: "Bhaktapur, Nepal",
  availability: "Available for freelance",
  certifications: ["CRTOM", "CISSP (Diploma)", "ISO 27001 ISMS", "NIS2"],
  aboutText1:
    "Results-driven Cybersecurity Specialist and Certified Ethical Hacker with 3.5+ years of experience in VAPT, red team operations, and secure application development.",
  aboutText2:
    "Holds advanced certifications including CRTOM, CISSP (Diploma), ISO 27001 ISMS, and NIS2, with expertise in identifying vulnerabilities, simulating attacks, and strengthening system security.",
  aboutText3:
    "Experienced in AI-driven cybersecurity research, malware analysis, and multi-layered defense systems. Focused on building secure, scalable, and resilient digital solutions as a Cybersecurity Educator and Full-Stack Developer.",
};

/**
 * GALLERY IMAGES
 */
export const galleryImages = [
  "/images/picture1.jpg",
  "/images/picture2.jpg",
  "/images/picture3.jpg",
  "/images/picture4.jpg",
  "/images/picture5.jfif",
  "/images/picture6.jpg",
  "/images/picture7.jfif",
  "/images/picture8.jfif",
  "/images/picture9.jfif",
  "/images/picture10.jpg",
];

/**
 * STATS
 */
export const stats = [
  { value: "3.5+",  label: "Years Experience" },
  { value: "10+",   label: "Projects Completed" },
  { value: "100+",  label: "Security Audits" },
  { value: "25+",   label: "CTF Competitions" },
];

/**
 * EXPERIENCE
 */
export const experience = [
  {
    year: "2022 – 2025",
    title: "System Analyst",
    company: "Mero Online Learning Pvt. Ltd.",
    desc: "Designed and implemented learning management systems (LMS). Conducted system analysis, UI prototyping, and automated admission workflows.",
  },
  {
    year: "Project-Based",
    title: "VAPT Auditor & Security Consultant",
    company: "Padmashree College Pvt. Ltd.",
    desc: "Conducted comprehensive network and web penetration testing. Delivered actionable mitigation strategies and maintained infrastructure compliance.",
  },
  {
    year: "Project-Based",
    title: "Full-Stack Developer & SOC Team",
    company: "Munal IT Solution",
    desc: "Developed 10+ secure applications including QR-based dining systems, hotel management, and admission portals. Performed VAPT and security hardening.",
  },
  {
    year: "Instructor Role",
    title: "Ethical Hacking & Cyber Security Tutor",
    company: "Clouds Nepal Web",
    desc: "Mentored students in VAPT methodologies, secure coding, and penetration testing tools like Nmap, Metasploit, and Burp Suite.",
  },
];

/**
 * PROJECTS
 */
export const projects = [
  { title: "Advanced Malware Detection System", desc: "ML-based malware detection using behavioral and static analysis.", tech: ["Python", "TensorFlow", "Scikit-learn", "Yara"], color: "#00ff88" },
  { title: "Penetration Testing Framework", desc: "Automated vulnerability scanning and reporting framework.", tech: ["Python", "Bash", "Nmap", "Metasploit"], color: "#00aaff" },
  { title: "Secure E-Commerce Platform", desc: "E-commerce with 2FA, session management, and payment integration.", tech: ["React", "Node.js", "MongoDB"], color: "#aa88ff" },
  { title: "Network Traffic Analyzer", desc: "Real-time anomaly detection and security monitoring.", tech: ["Python", "Wireshark", "Scapy", "Flask"], color: "#00ff88" },
  { title: "Reverse Engineering Toolkit", desc: "Custom tools for binary analysis and exploit development.", tech: ["Python", "C++", "Assembly", "IDA Pro"], color: "#aa88ff" },
];

/**
 * RESEARCH PAPERS
 */
export const researchPapers = [
  {
    id: "01",
    status: "Published",
    title: "AI-Driven Threat Intelligence for Proactive Cyber Defense using Federated Learning",
    authors: "Rupesh Khadaka, Prajwal Rai, Nikhil Raut",
    desc: "Advanced reinforcement learning framework combined with federated learning techniques for proactive cyber defense, enabling distributed threat intelligence sharing.",
    tags: ["Reinforcement Learning", "Federated Learning", "Threat Intelligence", "Proactive Defense", "AI Security"],
    link: "https://www.researchgate.net/publication/404137332_AI-Driven_Threat_Intelligence_for_Proactive_Cyber_Defense_Using_Federated_Learning"
  },
  
  {
    id: "02",
    status: "Published",
    title: "Multi-Layered Cyber Defense: Combining AI-Based Malware Classification, Server Monitoring, and Penetration Testing",
    authors: "Rupesh Khadaka et al.",
    desc: "Integrating malware detection, server monitoring, and penetration testing.",
    tags: ["Cyber Defense", "Pen-Testing"],
    link: "https://www.researchgate.net/publication/403967912_Multi-Layered_Cyber_Defense_Combining_AI-Based_Malware_Classification_Server_Monitoring_and_Penetration_Testing"
  },
   {
    id: "03",
    status: "Published",
    title: "Malware Classification Using ML (Extra Tree and Logistic Regression)",
    authors: "Rupesh Khadaka",
    desc: "Advanced machine learning approach for malware classification.",
    tags: ["ML", "Malware Detection", "Cybersecurity"],
    link: "https://www.researchgate.net/publication/YOUR_LINK_HERE" 
  },
  {
    id: "04",
    status: "Under Review",
    title: "Cybersecurity and Cognitive Threat Detection in Smart Healthcare Systems",
    authors: "Rupesh Khadaka, Prajwal Rai",
    desc: "Novel approach to cybersecurity in smart healthcare systems incorporating cognitive threat detection mechanisms to protect sensitive medical data in IoT-enabled environments.",
    tags: ["Smart Healthcare", "Cognitive Threat Detection", "IoT Security", "Medical Data Protection"],
    link: "https://www.researchgate.net/publication/YOUR_LINK_HERE"
  },
 
  
];
/**
 * SKILLS & EXPERTISE
 */
export interface SkillCategory {
  category: string;
  skills: string[];
  icon: string;
}

export const skillsCategories: SkillCategory[] = [
  { category: "Cybersecurity & VAPT", skills: ["Penetration Testing", "Red Teaming", "OSINT", "Vulnerability Assessment"], icon: "" },
  { category: "AI & Machine Learning", skills: ["TensorFlow", "YOLOv8", "Deep Learning", "Federated Learning"], icon: "" },
  { category: "Exploitation Tools", skills: ["Metasploit", "SQLmap", "Burp Suite", "Hydra"], icon: "" },
  { category: "Programming", skills: ["Python", "JavaScript", "PHP", "C++", "Bash"], icon: "" },
  { category: "Network & Forensics", skills: ["Wireshark", "Nmap", "Volatility", "Autopsy"], icon: "" },
  { category: "Web Security", skills: ["OWASP Top 10", "SQL Injection", "XSS", "Secure Auth"], icon: "" },
  {
    category: "Web Development",
    skills: ["React", "Node.js", "MySQL", "MongoDB"],
    icon: " ",
  },
   {
    category: "Operating Systems & Environments",
    skills: ["Kali Linux", "Parrot Security OS", "BlackArch Linux", "WSL2 & Ubuntu"],
    icon: " ",
  },

];