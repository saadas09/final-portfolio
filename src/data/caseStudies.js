export const caseStudies = {
  findurway: {
    title: 'A useful match starts long before the recommendation.',
    summary:
      'FindUrWay brings two engineering problems together: collecting consistent job data and comparing the meaning of a candidate’s skills with a role.',
    flow: [
      'Adzuna + France Travail',
      'Airflow ingestion',
      'Normalize + deduplicate',
      'PostgreSQL',
      'MiniLM matching',
      'Skill-gap insights',
    ],
    decisions: [
      [
        'Meaning over exact wording',
        'Sentence embeddings and cosine similarity compare the meaning of profiles and job descriptions. Role-based scoring adds another signal; a similarity score alone cannot explain every hiring requirement.',
      ],
      [
        'Clean records before matching',
        'Daily ingestion has to normalize and deduplicate records before they become useful recommendations. The data pipeline is part of the product experience.',
      ],
    ],
    evidence:
      'The implementation connects ingestion from two job APIs across six career categories with semantic matching and skill-demand aggregation. This was a team project; my contribution focused on matching and ingestion.',
    next: 'Evaluate recommendation relevance against human-reviewed examples, inspect duplicate handling, and explain why a particular role appears.',
    takeaway:
      'Recommendation quality depends on both the representation of meaning and the quality of the records entering the system.',
  },
  lms: {
    title: 'One learning platform. Five different responsibilities.',
    summary:
      'During my Maroc Modis / Triumph internship, I developed a learning platform that connects course management, employee progress, quizzes, and certificates.',
    flow: [
      'React interface',
      'JWT identity',
      'FastAPI routes',
      'SQLAlchemy models',
      'MySQL records',
      'Progress + certificates',
    ],
    decisions: [
      [
        'Permissions follow the workflow',
        'Administrators, trainers, HR, department managers, and employees have different responsibilities. Role-based access lets each group work with the same training information through the appropriate controls.',
      ],
      [
        'Learning is a sequence',
        'Courses, lessons, enrollment, quizzes, and certificates are connected stages. Keeping their relationships explicit makes progress reporting and completion workflows possible.',
      ],
    ],
    evidence:
      'The delivered code includes five user roles, JWT authentication with bcrypt password hashing, course and quiz workflows, and centralized progress reporting.',
    next: 'Check access boundaries across all five roles, then exercise enrollment, quiz completion, and certificate workflows together.',
    takeaway:
      'The difficult part of a business application is often coordinating people’s responsibilities around a shared process.',
    images: [
      { src: '/projects/lms-welcome.png', label: 'Actual application · welcome page' },
      { src: '/projects/lms-login.png', label: 'Actual application · sign-in page' },
    ],
  },
  darija: {
    title: 'Connected characters. A sequence worth understanding.',
    summary:
      'Arabic and Moroccan Darija make text recognition a sequence problem. The project combines image preparation, learned visual features, and character-level decoding.',
    flow: [
      'Text image',
      'OpenCV preprocessing',
      'CNN features',
      'Bidirectional LSTM',
      'CTC decoding',
      'CER / WER evaluation',
    ],
    decisions: [
      [
        'Read the sequence, not isolated letters',
        'Connected characters and changing letter shapes make segmentation difficult. A CRNN combines visual features with sequence modeling through a bidirectional LSTM.',
      ],
      [
        'Measure mistakes at two levels',
        'Character error rate and word error rate describe different aspects of recognition quality. Both are needed to understand whether small character errors are making whole words unusable.',
      ],
    ],
    evidence:
      'My team contribution covered preprocessing and the CRNN / BiLSTM / CTC recognition pipeline, with evaluation using character and word error rates.',
    next: 'Compare results across image quality and text variation, inspect recurring character confusions, and report CER and WER on a defined held-out set.',
    takeaway:
      'Language-aware evaluation matters as much as choosing a model: a plausible-looking prediction can still change the meaning of a word.',
    images: [
      {
        src: '/projects/darija-sample.png',
        label: 'Original repository artifact · OCR input sample, not a prediction',
      },
    ],
  },
};
