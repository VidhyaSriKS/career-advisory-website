// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  academicLevel?: string;
  location?: string;
  interests?: string[];
  strengths?: string[];
  quizCompleted?: boolean;
  quizResults?: QuizResults;
  savedCareerPaths?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Quiz Types
export interface QuizResults {
  personality?: PersonalityResults;
  academicStrengths?: AcademicStrengthsResults;
  interests?: InterestsResults;
  learningStyle?: LearningStyleResults;
  workValues?: WorkValuesResults;
  softSkills?: SoftSkillsResults;
  reflectiveResponses?: ReflectiveResponse[];
  completedAt: string;
  overallScore?: number;
}

export interface PersonalityResults {
  mbtiType?: string;
  bigFiveScores?: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

export interface AcademicStrengthsResults {
  mathematics: number;
  science: number;
  language: number;
  socialStudies: number;
  arts: number;
  technology: number;
}

export interface InterestsResults {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
}

export interface LearningStyleResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  readingWriting: number;
}

export interface WorkValuesResults {
  autonomy: number;
  security: number;
  creativity: number;
  leadership: number;
  helping: number;
  achievement: number;
}

export interface SoftSkillsResults {
  communication: number;
  teamwork: number;
  problemSolving: number;
  adaptability: number;
  timeManagement: number;
  leadership: number;
}

export interface ReflectiveResponse {
  question: string;
  response: string;
  aiAnalysis?: string;
}

// Career Types
export interface Career {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredEducation: string[];
  skills: string[];
  averageSalary: {
    min: number;
    max: number;
    currency: string;
  };
  jobOutlook: 'Excellent' | 'Good' | 'Average' | 'Limited';
  workEnvironment: string[];
  personalityMatch: string[];
  interestMatch: string[];
  relatedCareers: string[];
  educationPaths: EducationPath[];
  certifications?: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  remoteWorkOptions: boolean;
  travelRequirements: 'None' | 'Occasional' | 'Frequent' | 'Extensive';
  physicalDemands: 'Low' | 'Moderate' | 'High';
  stressLevel: 'Low' | 'Moderate' | 'High';
  createdAt?: string;
  updatedAt?: string;
}

export interface EducationPath {
  level: string;
  duration: string;
  institutions: string[];
  subjects: string[];
  prerequisites?: string[];
}

// Recommendation Types
export interface CareerRecommendation {
  career: Career;
  matchScore: number;
  matchReasons: string[];
  strengthsAlignment: string[];
  developmentAreas: string[];
  nextSteps: string[];
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export interface RecommendationRequest {
  userId: string;
  quizResults?: QuizResults;
  preferences?: {
    salaryRange?: { min: number; max: number };
    workEnvironment?: string[];
    educationLevel?: string;
    location?: string;
    remoteWork?: boolean;
  };
  excludeCareerIds?: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// Form Types
export interface ProfileFormData {
  name: string;
  age: string;
  academicLevel: string;
  location: string;
  interests: string;
  strengths: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'text' | 'ranking';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  category: 'personality' | 'academic' | 'interests' | 'learning' | 'values' | 'skills';
  required: boolean;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number | string[];
}

// College and Course Types
export interface College {
  id: string;
  name: string;
  location: string;
  type: 'Public' | 'Private' | 'Community';
  ranking?: number;
  tuitionFee: {
    inState?: number;
    outState?: number;
    international?: number;
  };
  acceptanceRate: number;
  programs: string[];
  website: string;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  provider: string;
  cost: number;
  currency: string;
  format: 'Online' | 'In-Person' | 'Hybrid';
  certification: boolean;
  prerequisites?: string[];
  skills: string[];
  careerPaths: string[];
  rating?: number;
  enrollmentCount?: number;
}

// Timeline Types
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'education' | 'career' | 'skill' | 'milestone';
  status: 'completed' | 'in-progress' | 'planned';
  priority: 'high' | 'medium' | 'low';
  resources?: string[];
}

export interface CareerTimeline {
  userId: string;
  targetCareer: string;
  events: TimelineEvent[];
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
}
