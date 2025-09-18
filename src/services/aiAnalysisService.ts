// AI Analysis Service for Career Discovery Quiz
// This service analyzes open-ended responses to provide insights

export interface AnalysisResult {
  insights: string[];
  traits: string[];
  recommendations: string[];
}

export const analyzeOpenEndedResponse = async (
  response: string,
  question: string
): Promise<string> => {
  // Simulate AI analysis - in production, this would call an actual AI service
  // like OpenAI GPT, Google's PaLM, or a custom model
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const analysis = generateAnalysis(response, question);
      resolve(analysis);
    }, 2000); // Simulate API call delay
  });
};

const generateAnalysis = (response: string, question: string): string => {
  const responseWords = response.toLowerCase().split(/\s+/);
  const responseLength = response.length;
  
  // Pattern matching for different types of responses
  const patterns = {
    analytical: ['analyze', 'think', 'logic', 'reason', 'problem', 'solve', 'understand'],
    creative: ['create', 'imagine', 'art', 'design', 'express', 'innovative', 'original'],
    social: ['people', 'help', 'team', 'collaborate', 'communicate', 'support', 'others'],
    leadership: ['lead', 'organize', 'manage', 'direct', 'coordinate', 'responsibility'],
    independent: ['alone', 'self', 'individual', 'autonomous', 'own', 'personal'],
    detail: ['detail', 'careful', 'precise', 'accurate', 'thorough', 'systematic'],
    adaptable: ['change', 'adapt', 'flexible', 'adjust', 'different', 'variety'],
    ambitious: ['achieve', 'goal', 'success', 'excel', 'improve', 'grow', 'advance']
  };

  const detectedTraits: string[] = [];
  let dominantTrait = '';
  let maxMatches = 0;

  // Analyze response for trait patterns
  Object.entries(patterns).forEach(([trait, keywords]) => {
    const matches = keywords.filter(keyword => 
      responseWords.some(word => word.includes(keyword))
    ).length;
    
    if (matches > 0) {
      detectedTraits.push(trait);
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      dominantTrait = trait;
    }
  });

  // Generate contextual analysis based on question type
  let analysis = '';
  
  if (question.includes('natural ways') || question.includes('thinking')) {
    analysis = generatePersonalityAnalysis(response, detectedTraits, dominantTrait);
  } else if (question.includes('subjects') || question.includes('skills')) {
    analysis = generateAcademicAnalysis(response, detectedTraits, dominantTrait);
  } else if (question.includes('alive') || question.includes('activity')) {
    analysis = generateInterestAnalysis(response, detectedTraits, dominantTrait);
  } else if (question.includes('learned') || question.includes('method')) {
    analysis = generateLearningAnalysis(response, detectedTraits, dominantTrait);
  } else if (question.includes('success') || question.includes('meaningful')) {
    analysis = generateValuesAnalysis(response, detectedTraits, dominantTrait);
  } else if (question.includes('teammate') || question.includes('quality')) {
    analysis = generateSoftSkillsAnalysis(response, detectedTraits, dominantTrait);
  } else {
    analysis = generateGeneralAnalysis(response, detectedTraits, dominantTrait);
  }

  return analysis;
};

const generatePersonalityAnalysis = (response: string, traits: string[], dominant: string): string => {
  const analyses = {
    analytical: "Your response shows strong analytical thinking. You likely approach challenges systematically and prefer data-driven decisions. This suggests careers in engineering, research, or consulting might align well with your natural tendencies.",
    creative: "Your creative mindset shines through in your response. You seem to value innovation and original thinking. Consider careers in design, marketing, arts, or entrepreneurship where creativity is highly valued.",
    social: "Your people-oriented approach is evident. You appear to thrive on collaboration and helping others. Careers in education, counseling, human resources, or healthcare might be fulfilling for you.",
    leadership: "Your response indicates natural leadership qualities. You seem comfortable taking charge and organizing others. Management, project leadership, or entrepreneurial roles could be great fits.",
    independent: "You value autonomy and self-direction. Your response suggests you work well independently and prefer controlling your own workflow. Consider careers that offer flexibility and independence."
  };
  
  return analyses[dominant as keyof typeof analyses] || 
    "Your response shows a balanced approach to handling challenges and opportunities. You demonstrate adaptability and thoughtful consideration of different situations.";
};

const generateAcademicAnalysis = (response: string, traits: string[], dominant: string): string => {
  const analyses = {
    analytical: "Your passion for analytical subjects suggests strong logical-mathematical intelligence. STEM fields, data science, or research might be natural fits for your academic strengths.",
    creative: "Your love for creative subjects indicates artistic intelligence. Consider fields like graphic design, creative writing, music, or multimedia arts where you can express this creativity.",
    social: "Your enjoyment of people-focused subjects suggests interpersonal intelligence. Education, psychology, social work, or communications might align with your academic interests.",
    detail: "Your attention to detail and systematic approach suggests you excel in structured learning environments. Accounting, law, medicine, or engineering might suit your methodical nature."
  };
  
  return analyses[dominant as keyof typeof analyses] || 
    "Your academic interests show versatility and curiosity. You seem to engage deeply with subjects that capture your interest, suggesting you'd thrive in fields that offer intellectual stimulation.";
};

const generateInterestAnalysis = (response: string, traits: string[], dominant: string): string => {
  const analyses = {
    creative: "Your passion for creative activities suggests an Artistic personality type (RIASEC). Consider careers in design, entertainment, writing, or any field where you can express creativity.",
    social: "Your fulfillment from helping others indicates a Social personality type. Careers in teaching, counseling, healthcare, or social services might energize you.",
    analytical: "Your love for problem-solving suggests an Investigative personality type. Research, science, technology, or analysis-heavy roles might be most fulfilling.",
    leadership: "Your energy from organizing and leading suggests an Enterprising personality type. Business, management, sales, or entrepreneurship might align with your interests."
  };
  
  return analyses[dominant as keyof typeof analyses] || 
    "Your response shows diverse interests and the ability to find fulfillment in various activities. This versatility could be an asset in many career paths.";
};

const generateLearningAnalysis = (response: string, traits: string[], dominant: string): string => {
  if (response.toLowerCase().includes('visual') || response.toLowerCase().includes('see')) {
    return "Your learning experience suggests you're a visual learner. You likely benefit from diagrams, charts, and visual aids. Careers involving design, data visualization, or visual communication might suit you.";
  } else if (response.toLowerCase().includes('discuss') || response.toLowerCase().includes('talk')) {
    return "Your learning style appears to be auditory. You learn well through discussion and verbal explanation. Teaching, counseling, or communication-heavy roles might be natural fits.";
  } else if (response.toLowerCase().includes('hands-on') || response.toLowerCase().includes('practice')) {
    return "You seem to be a kinesthetic learner who learns by doing. Hands-on careers in engineering, healthcare, trades, or any field with practical application might be ideal.";
  }
  
  return "Your learning experience shows adaptability in how you absorb information. This flexibility in learning styles could be valuable in many career environments.";
};

const generateValuesAnalysis = (response: string, traits: string[], dominant: string): string => {
  const analyses = {
    social: "Your definition of success centers on helping others and making a positive impact. This suggests careers in non-profit work, education, healthcare, or social services would be meaningful to you.",
    creative: "Success for you seems tied to creative expression and innovation. Consider careers where you can create, design, or bring new ideas to life.",
    leadership: "Your success is linked to achievement and influence. Leadership roles, entrepreneurship, or positions where you can drive change might be fulfilling.",
    independent: "You value autonomy and personal growth as measures of success. Freelancing, consulting, or roles with high independence might align with your values."
  };
  
  return analyses[dominant as keyof typeof analyses] || 
    "Your perspective on meaningful success shows depth and personal reflection. You seem to value both personal fulfillment and positive impact, which could guide you toward purpose-driven careers.";
};

const generateSoftSkillsAnalysis = (response: string, traits: string[], dominant: string): string => {
  const analyses = {
    social: "Your strength in building relationships and supporting others is a valuable soft skill. This emotional intelligence would be an asset in team-based environments and people-focused careers.",
    analytical: "Your ability to think clearly and solve problems systematically is a key strength. This critical thinking skill is valuable across many industries and roles.",
    leadership: "Your natural ability to organize and motivate others is a strong leadership trait. This skill would be valuable in management, project leadership, or entrepreneurial roles.",
    adaptable: "Your flexibility and ability to adapt to different situations is a crucial soft skill in today's dynamic work environment. This adaptability would serve you well in many career paths."
  };
  
  return analyses[dominant as keyof typeof analyses] || 
    "Your self-awareness about your interpersonal strengths shows emotional intelligence. This ability to understand and work well with others is valuable in virtually any career path.";
};

const generateGeneralAnalysis = (response: string, traits: string[], dominant: string): string => {
  return "Your thoughtful response demonstrates self-reflection and awareness of your personal qualities. This level of introspection will serve you well as you explore different career paths and make decisions about your future.";
};

// Career mapping based on quiz results
export const generateCareerRecommendations = (results: any): string[] => {
  const recommendations: string[] = [];
  
  // This would contain sophisticated logic to map quiz results to career paths
  // For now, returning sample recommendations
  
  recommendations.push(
    "Based on your responses, consider exploring careers in technology and innovation.",
    "Your analytical skills suggest you might enjoy research-based roles.",
    "Your people-oriented responses indicate potential in education or counseling fields."
  );
  
  return recommendations;
};
