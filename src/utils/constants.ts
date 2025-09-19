// Academic Levels
export const ACADEMIC_LEVELS = [
  '10th Grade',
  '12th Grade',
  'Undergraduate',
  'Graduate',
  'Postgraduate'
] as const;

// Career Categories
export const CAREER_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Business & Finance',
  'Education',
  'Engineering',
  'Arts & Design',
  'Science & Research',
  'Law & Government',
  'Media & Communications',
  'Social Services',
  'Agriculture',
  'Construction',
  'Transportation',
  'Hospitality & Tourism',
  'Sports & Recreation'
] as const;

// RIASEC Interest Types
export const RIASEC_TYPES = {
  realistic: {
    name: 'Realistic',
    description: 'Hands-on, practical, mechanical, physical activities',
    careers: ['Engineer', 'Mechanic', 'Farmer', 'Pilot', 'Carpenter']
  },
  investigative: {
    name: 'Investigative',
    description: 'Research, analysis, problem-solving, scientific activities',
    careers: ['Scientist', 'Doctor', 'Researcher', 'Analyst', 'Psychologist']
  },
  artistic: {
    name: 'Artistic',
    description: 'Creative, expressive, imaginative activities',
    careers: ['Artist', 'Writer', 'Designer', 'Musician', 'Actor']
  },
  social: {
    name: 'Social',
    description: 'Helping, teaching, caring for others',
    careers: ['Teacher', 'Counselor', 'Nurse', 'Social Worker', 'Therapist']
  },
  enterprising: {
    name: 'Enterprising',
    description: 'Leading, persuading, managing, business activities',
    careers: ['Manager', 'Salesperson', 'Entrepreneur', 'Lawyer', 'Executive']
  },
  conventional: {
    name: 'Conventional',
    description: 'Organizing, data management, detail-oriented activities',
    careers: ['Accountant', 'Administrator', 'Clerk', 'Banker', 'Auditor']
  }
} as const;

// MBTI Personality Types
export const MBTI_TYPES = {
  'INTJ': 'The Architect',
  'INTP': 'The Thinker',
  'ENTJ': 'The Commander',
  'ENTP': 'The Debater',
  'INFJ': 'The Advocate',
  'INFP': 'The Mediator',
  'ENFJ': 'The Protagonist',
  'ENFP': 'The Campaigner',
  'ISTJ': 'The Logistician',
  'ISFJ': 'The Protector',
  'ESTJ': 'The Executive',
  'ESFJ': 'The Consul',
  'ISTP': 'The Virtuoso',
  'ISFP': 'The Adventurer',
  'ESTP': 'The Entrepreneur',
  'ESFP': 'The Entertainer'
} as const;

// Learning Styles
export const LEARNING_STYLES = {
  visual: {
    name: 'Visual',
    description: 'Learn best through seeing and visualizing',
    strategies: ['Diagrams', 'Charts', 'Mind maps', 'Color coding', 'Videos']
  },
  auditory: {
    name: 'Auditory',
    description: 'Learn best through hearing and listening',
    strategies: ['Lectures', 'Discussions', 'Audio recordings', 'Music', 'Verbal repetition']
  },
  kinesthetic: {
    name: 'Kinesthetic',
    description: 'Learn best through hands-on activities',
    strategies: ['Experiments', 'Role-playing', 'Physical activities', 'Building models', 'Field trips']
  },
  readingWriting: {
    name: 'Reading/Writing',
    description: 'Learn best through reading and writing',
    strategies: ['Reading texts', 'Taking notes', 'Writing essays', 'Lists', 'Journals']
  }
} as const;

// Work Values
export const WORK_VALUES = {
  autonomy: 'Independence and freedom in work',
  security: 'Job stability and financial security',
  creativity: 'Innovation and creative expression',
  leadership: 'Leading and managing others',
  helping: 'Making a positive impact on others',
  achievement: 'Recognition and accomplishment'
} as const;

// Soft Skills
export const SOFT_SKILLS = [
  'Communication',
  'Teamwork',
  'Problem Solving',
  'Adaptability',
  'Time Management',
  'Leadership',
  'Critical Thinking',
  'Creativity',
  'Emotional Intelligence',
  'Conflict Resolution',
  'Decision Making',
  'Networking',
  'Presentation Skills',
  'Customer Service',
  'Project Management'
] as const;

// Education Levels
export const EDUCATION_LEVELS = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Professional Certification',
  'Trade School Certificate',
  'Apprenticeship'
] as const;

// Salary Ranges (in USD)
export const SALARY_RANGES = [
  { label: 'Under $30,000', min: 0, max: 30000 },
  { label: '$30,000 - $50,000', min: 30000, max: 50000 },
  { label: '$50,000 - $75,000', min: 50000, max: 75000 },
  { label: '$75,000 - $100,000', min: 75000, max: 100000 },
  { label: '$100,000 - $150,000', min: 100000, max: 150000 },
  { label: '$150,000+', min: 150000, max: 1000000 }
] as const;

// Job Outlook Options
export const JOB_OUTLOOK_OPTIONS = [
  'Excellent',
  'Good',
  'Average',
  'Limited'
] as const;

// Work Environment Types
export const WORK_ENVIRONMENTS = [
  'Office',
  'Remote',
  'Hybrid',
  'Laboratory',
  'Hospital',
  'School',
  'Factory',
  'Outdoor',
  'Travel',
  'Home-based',
  'Retail',
  'Restaurant',
  'Construction Site',
  'Studio',
  'Warehouse'
] as const;

// Experience Levels
export const EXPERIENCE_LEVELS = [
  'Entry',
  'Mid',
  'Senior',
  'Executive'
] as const;

// College Types
export const COLLEGE_TYPES = [
  'Public',
  'Private',
  'Community'
] as const;

// Course Formats
export const COURSE_FORMATS = [
  'Online',
  'In-Person',
  'Hybrid'
] as const;

// Course Levels
export const COURSE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced'
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    VERIFY_TOKEN: '/api/auth/verify-token',
    LOGOUT: '/api/auth/logout'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    QUIZ_RESULTS: '/api/users/quiz-results',
    SAVED_CAREERS: '/api/users/saved-career-paths'
  },
  CAREERS: {
    LIST: '/api/careers',
    DETAIL: '/api/careers/:id',
    CATEGORIES: '/api/careers/categories/list',
    SKILLS: '/api/careers/skills/list'
  },
  RECOMMENDATIONS: {
    CAREERS: '/api/recommend/careers',
    QUIZ_BASED: '/api/recommend/quiz-based',
    SIMILAR: '/api/recommend/similar/:id',
    PERSONALIZED: '/api/recommend/personalized'
  }
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'career_advisor_user_profile',
  QUIZ_RESULTS: 'career_advisor_quiz_results',
  SAVED_CAREERS: 'career_advisor_saved_careers',
  PREFERENCES: 'career_advisor_preferences',
  THEME: 'career_advisor_theme'
} as const;

// Quiz Configuration
export const QUIZ_CONFIG = {
  MODULES: [
    'personality',
    'academicStrengths',
    'interests',
    'learningStyle',
    'workValues',
    'softSkills'
  ],
  ESTIMATED_DURATION: '15-20 minutes',
  QUESTIONS_PER_MODULE: {
    personality: 20,
    academicStrengths: 12,
    interests: 18,
    learningStyle: 8,
    workValues: 12,
    softSkills: 15
  }
} as const;
