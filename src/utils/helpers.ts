import { QuizResults, Career, CareerRecommendation } from '../types';
import { RIASEC_TYPES, MBTI_TYPES } from './constants';

// Format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format salary range
export const formatSalaryRange = (min: number, max: number, currency: string = 'USD'): string => {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Get color for percentage
export const getPercentageColor = (percentage: number): string => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

// Get background color for percentage
export const getPercentageBgColor = (percentage: number): string => {
  if (percentage >= 80) return 'bg-green-100';
  if (percentage >= 60) return 'bg-blue-100';
  if (percentage >= 40) return 'bg-yellow-100';
  return 'bg-red-100';
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convert camelCase to Title Case
export const camelToTitle = (str: string): string => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// Quiz Results Analysis
export const analyzeQuizResults = (results: QuizResults) => {
  const analysis = {
    dominantPersonality: '',
    topInterests: [] as string[],
    strongestAcademicAreas: [] as string[],
    preferredLearningStyle: '',
    topWorkValues: [] as string[],
    strongestSoftSkills: [] as string[],
    overallProfile: ''
  };

  // Analyze personality (MBTI)
  if (results.personality?.mbtiType) {
    analysis.dominantPersonality = `${results.personality.mbtiType} - ${MBTI_TYPES[results.personality.mbtiType as keyof typeof MBTI_TYPES]}`;
  }

  // Analyze interests (RIASEC)
  if (results.interests) {
    const interestEntries = Object.entries(results.interests)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    analysis.topInterests = interestEntries.map(([key]) => 
      RIASEC_TYPES[key as keyof typeof RIASEC_TYPES].name
    );
  }

  // Analyze academic strengths
  if (results.academicStrengths) {
    const academicEntries = Object.entries(results.academicStrengths)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    analysis.strongestAcademicAreas = academicEntries.map(([key]) => 
      camelToTitle(key)
    );
  }

  // Analyze learning style
  if (results.learningStyle) {
    const learningEntries = Object.entries(results.learningStyle)
      .sort(([, a], [, b]) => b - a);
    
    if (learningEntries.length > 0) {
      analysis.preferredLearningStyle = camelToTitle(learningEntries[0][0]);
    }
  }

  // Analyze work values
  if (results.workValues) {
    const valuesEntries = Object.entries(results.workValues)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    analysis.topWorkValues = valuesEntries.map(([key]) => 
      camelToTitle(key)
    );
  }

  // Analyze soft skills
  if (results.softSkills) {
    const skillsEntries = Object.entries(results.softSkills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    analysis.strongestSoftSkills = skillsEntries.map(([key]) => 
      camelToTitle(key)
    );
  }

  return analysis;
};

// Calculate career match score
export const calculateCareerMatch = (
  career: Career,
  quizResults: QuizResults
): number => {
  let totalScore = 0;
  let factors = 0;

  // Interest match (RIASEC)
  if (quizResults.interests && career.interestMatch) {
    const interestScore = career.interestMatch.reduce((sum, interest) => {
      const interestKey = interest.toLowerCase() as keyof typeof quizResults.interests;
      return sum + (quizResults.interests![interestKey] || 0);
    }, 0) / career.interestMatch.length;
    
    totalScore += interestScore * 0.3; // 30% weight
    factors++;
  }

  // Personality match
  if (quizResults.personality?.mbtiType && career.personalityMatch) {
    const personalityMatch = career.personalityMatch.includes(quizResults.personality.mbtiType);
    totalScore += (personalityMatch ? 100 : 50) * 0.2; // 20% weight
    factors++;
  }

  // Academic strengths match
  if (quizResults.academicStrengths) {
    const academicScore = Object.entries(quizResults.academicStrengths).reduce((sum, [key, value]) => {
      // Simple heuristic: match academic areas to career categories
      const isRelevant = career.category.toLowerCase().includes(key.toLowerCase()) ||
                        career.skills.some(skill => skill.toLowerCase().includes(key.toLowerCase()));
      return sum + (isRelevant ? value : 0);
    }, 0) / Object.keys(quizResults.academicStrengths).length;
    
    totalScore += academicScore * 0.25; // 25% weight
    factors++;
  }

  // Work values alignment
  if (quizResults.workValues) {
    // This would need more sophisticated mapping between work values and career characteristics
    const valuesScore = 70; // Placeholder
    totalScore += valuesScore * 0.15; // 15% weight
    factors++;
  }

  // Soft skills match
  if (quizResults.softSkills) {
    const skillsScore = career.skills.reduce((sum, skill) => {
      const skillKey = skill.toLowerCase().replace(/\s+/g, '') as keyof typeof quizResults.softSkills;
      return sum + (quizResults.softSkills![skillKey] || 0);
    }, 0) / career.skills.length;
    
    totalScore += skillsScore * 0.1; // 10% weight
    factors++;
  }

  return factors > 0 ? Math.round(totalScore / factors) : 0;
};

// Sort careers by match score
export const sortCareersByMatch = (
  careers: Career[],
  quizResults: QuizResults
): CareerRecommendation[] => {
  return careers
    .map(career => ({
      career,
      matchScore: calculateCareerMatch(career, quizResults),
      matchReasons: generateMatchReasons(career, quizResults),
      strengthsAlignment: [],
      developmentAreas: [],
      nextSteps: [],
      confidenceLevel: 'Medium' as const
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

// Generate match reasons
export const generateMatchReasons = (
  career: Career,
  quizResults: QuizResults
): string[] => {
  const reasons: string[] = [];

  // Interest alignment
  if (quizResults.interests && career.interestMatch) {
    const topInterests = Object.entries(quizResults.interests)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([key]) => key);

    const matchingInterests = career.interestMatch.filter(interest =>
      topInterests.includes(interest.toLowerCase())
    );

    if (matchingInterests.length > 0) {
      reasons.push(`Aligns with your ${matchingInterests.join(' and ')} interests`);
    }
  }

  // Personality match
  if (quizResults.personality?.mbtiType && career.personalityMatch?.includes(quizResults.personality.mbtiType)) {
    reasons.push(`Matches your ${quizResults.personality.mbtiType} personality type`);
  }

  // Academic strengths
  if (quizResults.academicStrengths) {
    const strongAreas = Object.entries(quizResults.academicStrengths)
      .filter(([, score]) => score >= 70)
      .map(([area]) => camelToTitle(area));

    if (strongAreas.length > 0) {
      reasons.push(`Utilizes your strengths in ${strongAreas.slice(0, 2).join(' and ')}`);
    }
  }

  return reasons;
};

// Format date
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format relative time
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(date);
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate color from string (for avatars, etc.)
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};
