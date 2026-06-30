import { FaReact, FaNodeJs, FaPython, FaFigma, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiPytorch,
  SiTensorflow,
  SiDocker,
  SiGit,
} from "react-icons/si";

export const personal = {
  name: "Saad Abs",
  title: "Digital Transformation & AI Engineering Student",
  email: "hmssaad156@gmail.com",
  phone: "+212645186011",
  location: "Sefrou, Morocco",
  linkedin: "https://linkedin.com/in/saad-abs-b56221338",
  github: "https://github.com/saadas09",
  dob: "03/04/2004",
  profile:
    "Digital Transformation and AI Engineering student with a solid background in data science, automation, and emerging technologies. Proficient in problem-solving, AI-based solutions, and optimizing business processes through digital transformation. Eager to apply technical and analytical skills in a dynamic, innovation-driven environment.",
};

export const techStack = [
  { name: "React", icon: FaReact },
  { name: "Python", icon: FaPython },
  { name: "Node", icon: FaNodeJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker },
  { name: "Postgres", icon: SiPostgresql },
  { name: "PyTorch", icon: SiPytorch },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Git", icon: SiGit },
  { name: "Figma", icon: FaFigma },
];

export const projects = [
  {
    title: "Career2Life — Full-Stack + Machine Learning Platform",
    description:
      "Application that turns a user profile into actionable life estimates: salary prediction, car affordability, and home price estimation through ML regression models, with a step-by-step 'journey' landing page and OWASP-minded security.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1300&q=80",
    stack: [FaReact, FaPython, SiPostgresql],
    demo: "",
    github: "",
    category: "fullstack",
  },
  {
    title: "Darija OCR — Arabic & Moroccan Dialect Recognition",
    description:
      "Complete OCR solution for recognizing Standard Arabic and Darija (Moroccan dialect) text, combining deep-learning models with image processing for accurate character recognition.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1300&q=80",
    stack: [FaPython, SiPytorch, SiTensorflow],
    demo: "",
    github: "",
    category: "ai",
  },
  {
    title: "PFE Scheduling Platform — Spring MVC",
    description:
      "Web application that automates final-project (PFE) defense planning. Imports an Excel file and generates optimized, conflict-free schedules.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1300&q=80",
    stack: [FaNodeJs, SiPostgresql, FaReact],
    demo: "",
    github: "",
    category: "web",
  },
  {
    title: "BudgetChef — Smart Meal Planner",
    description:
      "Meal-planning web app that helps users build affordable, nutritious meal plans while tracking grocery expenses. Allows easy management of recipes, budgets, and meal plans through a clean front end.",
    image:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1300&q=80",
    stack: [FaPython, SiPostgresql, SiDocker],
    demo: "",
    github: "",
    category: "fullstack",
  },
  {
    title: "AS Travel — Smart Travel Application",
    description:
      "Smart trip-planning desktop app that lets users organize travels with features like expense tracking and travel & activity suggestions.",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1300&q=80",
    stack: [FaPython],
    demo: "",
    github: "",
    category: "desktop",
  },
  {
    title: "Attendance Web Application",
    description:
      "Responsive web app for employee check-in/out, working-hours monitoring, and record management with a real-time interface.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1300&q=80",
    stack: [FaReact, SiPostgresql, SiDocker],
    demo: "",
    github: "",
    category: "web",
  },
  {
    title: "Saad Location — Rental Car System (C)",
    description:
      "A rental car system developed in C providing reservation management, vehicle records, and CLI-based administration. Includes file-based persistence and scheduling logic.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1300&q=80",
    stack: [SiGit],
    demo: "",
    github: "",
    category: "systems",
  },
  {
    title: "Cloud & IoT — IoT LED Light Control",
    description:
      "Cloud-connected IoT prototype for LED light control using MQTT, a microcontroller, and cloud functions for remote automation and scheduling.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1300&q=80",
    stack: [FaAws, SiDocker, FaPython],
    demo: "",
    github: "",
    category: "iot",
  },
];

export const skillGroups = [
  {
    name: "Frontend",
    skills: [
      { label: "React / Next.js", value: 88 },
      { label: "Data Visualization", value: 84 },
      { label: "UX Systems", value: 82 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { label: "Node.js", value: 82 },
      { label: "Python", value: 84 },
      { label: "SQL + NoSQL", value: 80 },
    ],
  },
  {
    name: "AI",
    skills: [
      { label: "ML Prototyping", value: 78 },
      { label: "NLP", value: 74 },
      { label: "Computer Vision", value: 72 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { label: "Docker", value: 80 },
      { label: "Git", value: 82 },
      { label: "Linux / CLI", value: 78 },
    ],
  },
];

export const timeline = [
  {
    year: "2022 - 2027",
    role: "Digital Transformation and Artificial Intelligence",
    company: "National School of Applied Sciences (ENSAH) — Al-Hoceima",
    description: "Bachelor program in Digital Transformation & AI with coursework and projects in data science, ML, and distributed systems.",
  },
  {
    year: "2022",
    role: "Baccalaureate in Physical Sciences",
    company: "Bir Anzarane High School — Sefrou",
    description: "Completed secondary education with focus on physical sciences.",
  },
];
