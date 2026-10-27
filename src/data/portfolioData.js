import masterCv from '../../Saad_Abs_CV_Master (1).pdf';
import aiCv from '../../Saad_Abs_CV_AI_Engineering (1).pdf';
import dataCv from '../../Saad_Abs_CV_Data_Cloud_Engineering (1).pdf';
import softwareCv from '../../Saad_Abs_CV_Software_Digital_Transformation (1).pdf';

export const personal = {
  name: 'Saad Abs',
  email: 'hmssaad156@gmail.com',
  github: 'https://github.com/saadas09',
  linkedin: 'https://linkedin.com/in/saad-abs-b56221338',
  location: 'Sefrou, Morocco',
};
export const filters = ['All work', 'AI & ML', 'Data & Cloud', 'Software'];

// Based on the supplied CVs and project sources. Team contributions are credited explicitly.
export const projects = [
  {
    id: 'findurway',
    title: 'FindUrWay',
    subtitle: 'A clearer path from skills to opportunity.',
    categories: ['AI & ML', 'Data & Cloud', 'Software'],
    type: 'SEMANTIC MATCHING · DATA ENGINEERING',
    color: 'blue',
    visual: 'matching',
    role: 'Team project',
    tags: ['FastAPI', 'React', 'Airflow', 'PostgreSQL'],
    github: 'https://github.com/Aubnsh22/FindUrWayV2',
    description:
      'A career platform connecting semantic job matching, skill-gap analysis, and a daily job-data pipeline.',
    problem:
      'Job titles alone do not explain whether someone’s skills fit a role. Useful recommendations need both a view of the candidate and consistent job-market data.',
    contribution:
      'Co-developed semantic matching with MiniLM embeddings, cosine similarity, and role-based scoring. Contributed to daily ingestion from Adzuna and France Travail across six career categories.',
    details: [
      'Normalize and deduplicate job records in PostgreSQL.',
      'Compare profile and job embeddings to surface relevant roles.',
      'Aggregate skill demand and highlight gaps for the next career step.',
    ],
    stack: [
      'Python',
      'FastAPI',
      'React',
      'Sentence Transformers',
      'Apache Airflow',
      'PostgreSQL',
      'Docker Compose',
    ],
  },
  {
    id: 'lms',
    title: 'Maroc Modis LMS',
    subtitle: 'Making workplace learning work better.',
    categories: ['Software'],
    type: 'INTERNSHIP · FULL-STACK DEVELOPMENT',
    color: 'forest',
    visual: 'learning',
    role: 'Software development internship · 2026',
    tags: ['React', 'FastAPI', 'MySQL', 'JWT'],
    github: 'https://github.com/saadas09/LMS-PROJECT',
    description:
      'An employee learning platform built during my internship at Maroc Modis / Triumph, from course creation to certificates.',
    problem:
      'Employee training brings together learners, trainers, HR, and managers. Each needs a different view of the same courses, progress, and results.',
    contribution:
      'Developed the React and FastAPI learning management system, with SQLAlchemy and MySQL. Implemented five user roles, JWT authentication, and bcrypt password hashing.',
    details: [
      'Manage courses, lessons, quizzes, and learner enrollments.',
      'Track training progress and centralize reporting.',
      'Support certificates and role-specific learning workflows.',
    ],
    stack: ['React', 'FastAPI', 'SQLAlchemy', 'MySQL', 'JWT', 'bcrypt'],
  },
  {
    id: 'darija',
    title: 'Moroccan Darija OCR',
    subtitle: 'Giving our language a digital voice.',
    categories: ['AI & ML'],
    type: 'COMPUTER VISION · LANGUAGE',
    color: 'sand',
    visual: 'ocr',
    role: 'Team project',
    tags: ['PyTorch', 'OpenCV', 'CRNN', 'FastAPI'],
    github: 'https://github.com/Aubnsh22/MoroccanDarijaOCR',
    description:
      'Text recognition for Arabic and Moroccan Darija, combining image processing with sequence learning.',
    problem:
      'Recognizing Arabic and Darija requires handling connected characters and visual variation while preserving the order of the text.',
    contribution:
      'Contributed to image preprocessing and a CRNN recognition pipeline using a bidirectional LSTM and CTC loss. Evaluated recognition with character and word error rates.',
    details: [
      'Prepare text images with OpenCV preprocessing.',
      'Learn visual features and character sequences with a CRNN.',
      'Evaluate the recognized text using CER and WER.',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'EasyOCR', 'FastAPI', 'BiLSTM', 'CTC'],
  },
  {
    id: 'rag',
    title: 'Document RAG Assistant',
    subtitle: 'Answers that start with your documents.',
    categories: ['AI & ML'],
    type: 'GENERATIVE AI · SEMANTIC RETRIEVAL',
    color: 'lilac',
    visual: 'rag',
    role: 'Personal project',
    tags: ['ChromaDB', 'Embeddings', 'Groq'],
    github: 'https://github.com/saadas09/gan-and-rag-implement',
    description:
      'A document assistant that retrieves relevant context before generating an answer.',
    problem:
      'A useful document assistant needs to find the right passages before asking a language model to respond.',
    contribution:
      'Built a retrieval-augmented generation workflow with document chunking, vector embeddings, ChromaDB search, and context-grounded responses through Groq.',
    details: [
      'Split documents into searchable chunks.',
      'Embed and retrieve passages with Sentence Transformers and ChromaDB.',
      'Provide retrieved context to the language model for grounded responses.',
    ],
    stack: ['Python', 'Sentence Transformers', 'ChromaDB', 'Groq', 'RAG'],
  },
  {
    id: 'odoo',
    title: 'Hotel Operations, Connected',
    subtitle: 'From reservations to smoother operations.',
    categories: ['Software'],
    type: 'ODOO · BUSINESS AUTOMATION',
    color: 'mint',
    visual: 'hotel',
    role: 'Personal project',
    tags: ['Odoo', 'Python', 'XML', 'FastAPI'],
    github: 'https://github.com/saadas09/odoo-project',
    description:
      'Hotel reservation workflows with room management, pricing checks, a customer portal, and scheduled synchronization.',
    problem:
      'Hotel reservations connect room availability, customers, dates, and pricing. Overlapping bookings and disconnected systems make that workflow harder to manage.',
    contribution:
      'Developed Odoo models and workflows for rooms, clients, and reservations. Added overlapping-booking checks, a customer portal, and scheduled synchronization tested against mock booking APIs.',
    details: [
      'Manage room, client, and reservation records.',
      'Validate pricing and overlapping booking dates.',
      'Test external synchronization with a FastAPI mock service.',
    ],
    stack: ['Python', 'Odoo', 'XML', 'FastAPI'],
  },
  {
    id: 'iot',
    title: 'A Little Light. A Connected World.',
    subtitle: 'Cloud intelligence meets a physical device.',
    categories: ['Data & Cloud'],
    type: 'AZURE · IOT & TELEMETRY',
    color: 'ice',
    visual: 'iot',
    role: 'Personal project',
    tags: ['Azure Functions', 'IoT Hub', 'MQTT'],
    github: 'https://github.com/saadas09/IOT-LED-CONTROL',
    description:
      'An Azure IoT prototype for remote LED control, light telemetry, and automatic state updates.',
    problem:
      'A connected device needs a dependable path from sensor readings to cloud processing and back to a useful physical action.',
    contribution:
      'Developed telemetry-processing handlers and HTTP endpoints for LED control and monitoring. Implemented automatic LED-state updates based on light-level thresholds.',
    details: [
      'Receive device telemetry through Azure IoT Hub.',
      'Process events with Azure Functions and Event Grid.',
      'Control the LED remotely and respond to light-level changes.',
    ],
    stack: ['Python', 'Azure Functions', 'Azure IoT Hub', 'Event Grid', 'MQTT'],
  },
  {
    id: 'career2life',
    title: 'Career2Life',
    subtitle: 'Turning career data into life-planning insights.',
    categories: ['AI & ML', 'Data & Cloud'],
    type: 'MACHINE LEARNING · CAREER PLANNING',
    color: 'blue',
    visual: 'matching',
    role: 'Team project',
    tags: ['Angular', 'Python', 'scikit-learn'],
    github: 'https://github.com/Aubnsh22/Career2Life',
    description: 'A career-planning application with a Random Forest salary-prediction pipeline.',
    problem:
      'Career decisions benefit from a clearer understanding of the relationship between experience, skills, and salary.',
    contribution:
      'Contributed to cleaning salary and experience data, encoding model features, and evaluating Random Forest regression predictions with MAE and MSE.',
    details: [
      'Clean and prepare salary and experience data.',
      'Encode features for the regression model.',
      'Evaluate predictions using MAE and MSE.',
    ],
    stack: ['Angular', 'Python', 'pandas', 'scikit-learn', 'Random Forest'],
  },
  {
    id: 'budgetchef',
    title: 'BudgetChef',
    subtitle: 'Good meals, thoughtful budgets.',
    categories: ['Software', 'AI & ML'],
    type: 'FULL-STACK · PERSONALIZATION',
    color: 'sand',
    visual: 'hotel',
    role: 'Team project',
    tags: ['React', 'Flask', 'Groq'],
    github: 'https://github.com/Aubnsh22/BudgetChef',
    description:
      'Personalized meal planning that brings budget, nutrition, and food preferences together.',
    problem:
      'A useful meal plan must balance what someone likes, what they need nutritionally, and what they can spend.',
    contribution:
      'Contributed to budget- and nutrition-aware meal planning, user profiles, feedback-based preferences, and LLM-generated meal descriptions.',
    details: [
      'Capture user profiles and meal preferences.',
      'Plan around nutrition targets and budget constraints.',
      'Use feedback and generated descriptions to personalize the experience.',
    ],
    stack: ['React', 'Flask', 'Python', 'Groq'],
  },
  {
    id: 'gan',
    title: 'MNIST, Reimagined',
    subtitle: 'Learning to generate, one digit at a time.',
    categories: ['AI & ML'],
    type: 'DEEP LEARNING · GENERATIVE MODELS',
    color: 'lilac',
    visual: 'gan',
    role: 'Personal project',
    tags: ['PyTorch', 'GAN', 'Python'],
    github: 'https://github.com/saadas09/gan-and-rag-implement',
    description: 'A generative adversarial network experiment on handwritten MNIST digits.',
    problem:
      'Understanding generative models means examining how a generator and discriminator learn from each other.',
    contribution:
      'Implemented generator and discriminator training in PyTorch, tracked losses, and visualized generated images throughout training.',
    details: [
      'Train a generator and discriminator on MNIST.',
      'Track the competing training losses.',
      'Inspect generated digits to understand model behavior.',
    ],
    stack: ['Python', 'PyTorch', 'GANs', 'Matplotlib'],
  },
  {
    id: 'pfe',
    title: 'PFE Defense Planner',
    subtitle: 'Less scheduling friction. More clarity.',
    categories: ['Software'],
    type: 'JAVA · WORKFLOW AUTOMATION',
    color: 'mint',
    visual: 'hotel',
    role: 'Academic project',
    tags: ['Java', 'Spring MVC', 'MySQL'],
    github: 'https://github.com/TahaLamhandi/PFE-Planning-System',
    description:
      'A defense-planning application that turns imported academic data into conflict-free schedules.',
    problem:
      'Defense scheduling requires aligning students, professors, rooms, and time slots without conflicts.',
    contribution:
      'Built a web application that imports planning data from Excel and supports the generation of defense schedules.',
    details: [
      'Import students, professors, rooms, and time slots.',
      'Organize planning data for scheduling.',
      'Generate conflict-free defense schedules.',
    ],
    stack: ['Java', 'Spring MVC', 'MySQL', 'Apache POI'],
  },
  {
    id: 'savoirexpert',
    title: 'SavoirExpert Workflow',
    subtitle: 'Making document readiness visible.',
    categories: ['Software'],
    type: 'INTERNSHIP · PROCESS AUTOMATION',
    color: 'forest',
    visual: 'rag',
    role: 'Software development internship · 2025',
    tags: ['Workflow design', 'Document tracking'],
    description: 'A document-readiness tracking platform developed for an accounting firm.',
    problem:
      'Accounting staff need a shared view of document statuses and pending work to coordinate follow-up.',
    contribution:
      'Built a platform that centralized document-readiness statuses and pending tasks during my internship at SavoirExpert.',
    details: [
      'Centralize document statuses.',
      'Make pending work easier to identify.',
      'Support accounting staff follow-up.',
    ],
    stack: ['Requirements analysis', 'Process mapping', 'Workflow automation'],
  },
  {
    id: 'travel',
    title: 'AS Travel',
    subtitle: 'A desktop companion for the next journey.',
    categories: ['Software'],
    type: 'PYTHON · DESKTOP APPLICATION',
    color: 'ice',
    visual: 'matching',
    role: 'Academic project',
    tags: ['Python', 'PySide'],
    description:
      'A desktop trip planner with travel organization, expense tracking, and activity suggestions.',
    problem:
      'Planning a trip involves coordinating destinations, activities, and spending in one place.',
    contribution:
      'Built a Python/PySide desktop application for trip planning, expense tracking, and activity suggestions.',
    details: [
      'Organize upcoming trips.',
      'Track travel expenses.',
      'Explore activity suggestions.',
    ],
    stack: ['Python', 'PySide'],
  },
  {
    id: 'attendance',
    title: 'Attendance, Simplified',
    subtitle: 'A clearer record of the working day.',
    categories: ['Software'],
    type: 'WEB APPLICATION · OPERATIONS',
    color: 'sand',
    visual: 'learning',
    role: 'Academic project',
    tags: ['Web development', 'Record management'],
    description:
      'An employee attendance application for check-in, check-out, and working-hours records.',
    problem:
      'Attendance records need a consistent way to capture the start and end of each working day.',
    contribution:
      'Developed an employee attendance application with check-in/check-out and working-hours records.',
    details: [
      'Record employee arrivals and departures.',
      'Maintain working-hours records.',
      'Organize attendance information in a web interface.',
    ],
    stack: ['Web development', 'Record management'],
  },
  {
    id: 'rental',
    title: 'Saad Location',
    subtitle: 'The fundamentals behind a rental business.',
    categories: ['Software'],
    type: 'C · SYSTEMS FUNDAMENTALS',
    color: 'mint',
    visual: 'hotel',
    role: 'Academic project',
    tags: ['C', 'File persistence'],
    description: 'A car-rental system with file-based persistence and reservation scheduling.',
    problem:
      'Rental operations need persistent vehicle records and an organized reservation workflow.',
    contribution:
      'Developed a C application with file-based persistence and reservation scheduling.',
    details: [
      'Maintain vehicle records.',
      'Organize rental reservations.',
      'Persist application data in files.',
    ],
    stack: ['C', 'File handling', 'Reservation logic'],
  },
];

export const expertise = [
  {
    id: 'ai',
    number: '01',
    title: 'AI that understands.',
    label: 'AI & machine learning',
    text: 'From recognizing Darija text to finding meaning in documents. I work across computer vision, semantic search, and generative AI.',
    tools: [
      'Python',
      'PyTorch',
      'scikit-learn',
      'OpenCV',
      'Sentence Transformers',
      'ChromaDB',
      'RAG',
      'pandas',
      'NumPy',
    ],
    foundations: [
      'TensorFlow / Keras',
      'CNNs & LSTMs',
      'Transformers',
      'CER / WER',
      'Precision / Recall / F1',
    ],
    projectIds: ['darija', 'rag', 'findurway'],
  },
  {
    id: 'data',
    number: '02',
    title: 'Data that connects.',
    label: 'Data & cloud engineering',
    text: 'Connecting APIs, transforming raw records, and bringing cloud services into the physical world through connected devices.',
    tools: [
      'SQL',
      'Apache Airflow',
      'PostgreSQL',
      'ETL / ELT',
      'Azure Functions',
      'Azure IoT Hub',
      'MQTT',
      'Docker Compose',
    ],
    foundations: ['Spark / PySpark', 'Kafka', 'Hadoop / HDFS', 'Scala', 'AWS', 'Google Cloud'],
    projectIds: ['findurway', 'iot', 'career2life'],
  },
  {
    id: 'software',
    number: '03',
    title: 'Software that helps.',
    label: 'Software & transformation',
    text: 'Translating real workflows into practical applications, with clear interfaces, thoughtful data models, and role-based access.',
    tools: [
      'React',
      'Angular',
      'JavaScript',
      'TypeScript',
      'FastAPI',
      'Flask',
      'Java',
      'Spring MVC',
      'Odoo',
      'MySQL',
      'SQLAlchemy',
    ],
    foundations: [
      'JWT / RBAC',
      'UML',
      'Agile / Scrum',
      'Process mapping',
      'CI/CD',
      'GitHub Actions',
    ],
    projectIds: ['lms', 'odoo', 'savoirexpert'],
  },
];

export const resumes = [
  {
    id: 'master',
    number: '01',
    name: 'The full picture',
    label: 'COMPLETE PROFILE',
    description: 'My experience, education, and projects across all three disciplines.',
    url: masterCv,
    filename: 'Saad-Abs-CV.pdf',
    pages: '2 pages',
    color: 'forest',
  },
  {
    id: 'ai',
    number: '02',
    name: 'AI & Machine Learning',
    label: 'AI ENGINEERING',
    description: 'Computer vision, semantic search, RAG, and generative models.',
    url: aiCv,
    filename: 'Saad-Abs-CV-AI-Engineering.pdf',
    pages: '1 page',
    color: 'blue',
  },
  {
    id: 'data',
    number: '03',
    name: 'Data & Cloud',
    label: 'DATA ENGINEERING',
    description: 'Data pipelines, Python / SQL, and Azure cloud applications.',
    url: dataCv,
    filename: 'Saad-Abs-CV-Data-Cloud.pdf',
    pages: '1 page',
    color: 'mint',
  },
  {
    id: 'software',
    number: '04',
    name: 'Software & Transformation',
    label: 'SOFTWARE ENGINEERING',
    description: 'Full-stack applications, business workflows, and automation.',
    url: softwareCv,
    filename: 'Saad-Abs-CV-Software.pdf',
    pages: '1 page',
    color: 'sand',
  },
];
