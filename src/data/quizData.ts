export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'analytical' | 'creative' | 'social' | 'practical' | 'investigative' | 'enterprising';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When faced with a complex problem, I prefer to:",
    options: [
      "Break it down into smaller, logical steps",
      "Think creatively and explore multiple solutions",
      "Discuss it with others to get different perspectives",
      "Find a practical, hands-on approach"
    ],
    category: 'analytical'
  },
  {
    id: 2,
    question: "In my free time, I enjoy:",
    options: [
      "Reading books or solving puzzles",
      "Drawing, writing, or creating something new",
      "Spending time with friends and family",
      "Building or fixing things with my hands"
    ],
    category: 'creative'
  },
  {
    id: 3,
    question: "When working in a group, I usually:",
    options: [
      "Take charge and organize the team",
      "Come up with innovative ideas",
      "Make sure everyone feels included",
      "Focus on getting the work done efficiently"
    ],
    category: 'social'
  },
  {
    id: 4,
    question: "I learn best when:",
    options: [
      "I can analyze data and see patterns",
      "I can experiment and try new approaches",
      "I can collaborate and learn from others",
      "I can practice and apply knowledge immediately"
    ],
    category: 'investigative'
  },
  {
    id: 5,
    question: "My ideal work environment would be:",
    options: [
      "A quiet space where I can focus and think deeply",
      "A dynamic space that encourages creativity",
      "A collaborative space with lots of interaction",
      "A hands-on workshop or laboratory"
    ],
    category: 'analytical'
  },
  {
    id: 6,
    question: "When I see an injustice, I:",
    options: [
      "Research the facts and analyze the situation",
      "Find creative ways to raise awareness",
      "Rally others to take action together",
      "Look for practical solutions to fix it"
    ],
    category: 'social'
  },
  {
    id: 7,
    question: "I'm most motivated by:",
    options: [
      "Solving complex challenges",
      "Creating something original",
      "Helping others succeed",
      "Achieving tangible results"
    ],
    category: 'enterprising'
  },
  {
    id: 8,
    question: "In school, my favorite subjects are/were:",
    options: [
      "Mathematics, Science, or Logic-based subjects",
      "Art, Literature, or Music",
      "History, Psychology, or Social Studies",
      "Physical Education, Technology, or Vocational courses"
    ],
    category: 'investigative'
  },
  {
    id: 9,
    question: "When planning a vacation, I:",
    options: [
      "Research extensively and create detailed itineraries",
      "Look for unique, off-the-beaten-path experiences",
      "Plan activities that everyone in the group will enjoy",
      "Focus on practical aspects like budget and logistics"
    ],
    category: 'practical'
  },
  {
    id: 10,
    question: "I handle stress by:",
    options: [
      "Analyzing the situation logically",
      "Finding creative outlets for expression",
      "Talking to friends or family",
      "Taking practical action to solve the problem"
    ],
    category: 'analytical'
  },
  {
    id: 11,
    question: "My communication style is:",
    options: [
      "Precise and fact-based",
      "Expressive and imaginative",
      "Warm and empathetic",
      "Direct and action-oriented"
    ],
    category: 'social'
  },
  {
    id: 12,
    question: "When choosing a career, the most important factor for me is:",
    options: [
      "Intellectual challenge and growth",
      "Creative freedom and self-expression",
      "Making a positive impact on others",
      "Job security and practical benefits"
    ],
    category: 'enterprising'
  },
  {
    id: 13,
    question: "I'm naturally good at:",
    options: [
      "Spotting patterns and inconsistencies",
      "Coming up with original ideas",
      "Understanding others' emotions",
      "Getting things done efficiently"
    ],
    category: 'investigative'
  },
  {
    id: 14,
    question: "In a crisis situation, I:",
    options: [
      "Stay calm and think through all options",
      "Find innovative solutions others might miss",
      "Focus on supporting and helping others",
      "Take immediate practical action"
    ],
    category: 'practical'
  },
  {
    id: 15,
    question: "My ideal day would involve:",
    options: [
      "Researching and learning something new",
      "Creating or designing something beautiful",
      "Connecting with and helping people",
      "Building or accomplishing something tangible"
    ],
    category: 'creative'
  },
  {
    id: 16,
    question: "When making decisions, I rely most on:",
    options: [
      "Logic and systematic analysis",
      "Intuition and creative thinking",
      "Input from others and consensus",
      "Past experience and proven methods"
    ],
    category: 'analytical'
  },
  {
    id: 17,
    question: "I'm most energized by:",
    options: [
      "Intellectual discussions and debates",
      "Brainstorming and creative sessions",
      "Social gatherings and team activities",
      "Hands-on projects and physical activities"
    ],
    category: 'enterprising'
  },
  {
    id: 18,
    question: "My approach to new technology is:",
    options: [
      "I analyze how it works and its implications",
      "I explore its creative possibilities",
      "I consider how it can help people connect",
      "I focus on its practical applications"
    ],
    category: 'investigative'
  },
  {
    id: 19,
    question: "When reading a book, I prefer:",
    options: [
      "Non-fiction that teaches me something new",
      "Fiction that transports me to different worlds",
      "Biographies and stories about real people",
      "How-to guides and practical manuals"
    ],
    category: 'practical'
  },
  {
    id: 20,
    question: "My greatest strength is:",
    options: [
      "Critical thinking and problem-solving",
      "Creativity and innovation",
      "Empathy and interpersonal skills",
      "Reliability and getting results"
    ],
    category: 'social'
  }
];

export interface StreamRecommendation {
  stream: string;
  description: string;
  suitableFor: string[];
  careerPaths: string[];
  requiredSkills: string[];
}

export const streamRecommendations: Record<string, StreamRecommendation> = {
  science: {
    stream: "Science Stream",
    description: "Perfect for analytical minds who love to investigate, experiment, and solve complex problems.",
    suitableFor: ["Analytical thinkers", "Problem solvers", "Research-oriented individuals"],
    careerPaths: ["Engineering", "Medicine", "Research Scientist", "Data Analyst", "Software Developer"],
    requiredSkills: ["Mathematical aptitude", "Logical reasoning", "Scientific temperament", "Attention to detail"]
  },
  commerce: {
    stream: "Commerce Stream",
    description: "Ideal for those interested in business, economics, and entrepreneurial ventures.",
    suitableFor: ["Business-minded individuals", "Leaders", "Entrepreneurs"],
    careerPaths: ["Business Management", "Chartered Accountancy", "Banking", "Marketing", "Economics"],
    requiredSkills: ["Numerical ability", "Communication skills", "Leadership qualities", "Strategic thinking"]
  },
  arts: {
    stream: "Arts/Humanities Stream",
    description: "Best suited for creative individuals who are passionate about human expression and social issues.",
    suitableFor: ["Creative thinkers", "Social advocates", "Communication enthusiasts"],
    careerPaths: ["Journalism", "Psychology", "Social Work", "Teaching", "Creative Arts", "Law"],
    requiredSkills: ["Creative expression", "Critical thinking", "Communication", "Empathy"]
  },
  vocational: {
    stream: "Vocational/Technical Stream",
    description: "Perfect for hands-on learners who prefer practical application and skill-based careers.",
    suitableFor: ["Practical thinkers", "Hands-on learners", "Skill-focused individuals"],
    careerPaths: ["Technical trades", "Hospitality", "Fashion Design", "Culinary Arts", "Digital Media"],
    requiredSkills: ["Practical skills", "Manual dexterity", "Technical aptitude", "Problem-solving"]
  }
};
