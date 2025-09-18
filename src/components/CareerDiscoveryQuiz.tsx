import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Brain, BookOpen, Heart, Lightbulb, Target, Users } from 'lucide-react';
import { analyzeOpenEndedResponse } from '../services/aiAnalysisService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'reflective';
  options?: { value: string; text: string }[];
  placeholder?: string;
}

interface QuizModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  questions: QuizQuestion[];
}

interface QuizResponse {
  questionId: string;
  answer: string;
  aiAnalysis?: string;
}

interface QuizResults {
  personality: { [key: string]: number };
  academicStrengths: { [key: string]: number };
  interests: { [key: string]: number };
  learningStyle: { [key: string]: number };
  workValues: { [key: string]: number };
  softSkills: { [key: string]: number };
  reflectiveInsights: string[];
}

const CareerDiscoveryQuiz: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  // Redirect to login if user is not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const modules: QuizModule[] = [
    {
      id: 'personality',
      title: 'Personality Module',
      description: 'MBTI + Big Five',
      icon: <Brain className="h-6 w-6" />,
      questions: [
        {
          id: 'p1',
          question: 'When starting a new task, you usually:',
          type: 'multiple-choice',
          options: [
            { value: 'planning', text: 'Plan carefully first' },
            { value: 'action', text: 'Jump right in and adjust later' },
            { value: 'collaborative', text: 'Ask others for input' },
            { value: 'exploratory', text: 'Explore all possibilities before acting' }
          ]
        },
        {
          id: 'p2',
          question: 'In conversations, you prefer:',
          type: 'multiple-choice',
          options: [
            { value: 'energetic', text: 'Talking through ideas with energy' },
            { value: 'listening', text: 'Listening before sharing your insights' },
            { value: 'focused', text: 'Keeping discussions focused and practical' },
            { value: 'creative', text: 'Exploring unusual or creative directions' }
          ]
        },
        {
          id: 'p3',
          question: 'Decision-making for you is:',
          type: 'multiple-choice',
          options: [
            { value: 'logical', text: 'Based on facts and logic' },
            { value: 'empathetic', text: 'Guided by people\'s feelings' },
            { value: 'intuitive', text: 'Intuitive and quick' },
            { value: 'thoughtful', text: 'Thoughtful and long-term' }
          ]
        },
        {
          id: 'p4',
          question: 'You feel most comfortable when:',
          type: 'multiple-choice',
          options: [
            { value: 'organized', text: 'Schedules and plans are organized' },
            { value: 'flexible', text: 'Things stay flexible and open-ended' },
            { value: 'social', text: 'People around you are upbeat and social' },
            { value: 'quiet', text: 'You can reflect quietly without pressure' }
          ]
        },
        {
          id: 'p5',
          question: 'Change or surprises in life are:',
          type: 'multiple-choice',
          options: [
            { value: 'exciting', text: 'Exciting adventures' },
            { value: 'adaptive', text: 'Something you adapt to over time' },
            { value: 'manageable', text: 'Unsettling but manageable' },
            { value: 'learning', text: 'Chances to rethink and learn' }
          ]
        },
        {
          id: 'p_reflective',
          question: 'How do your natural ways of thinking or acting help you handle both challenges and opportunities?',
          type: 'reflective',
          placeholder: 'Reflect on your natural tendencies and how they serve you...'
        }
      ]
    },
    {
      id: 'academic',
      title: 'Academic Strengths Module',
      description: 'Gardner\'s Multiple Intelligences',
      icon: <BookOpen className="h-6 w-6" />,
      questions: [
        {
          id: 'a1',
          question: 'You grasp concepts fastest by:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Seeing visuals and diagrams' },
            { value: 'auditory', text: 'Hearing them explained or discussed' },
            { value: 'written', text: 'Writing and organizing notes' },
            { value: 'kinesthetic', text: 'Doing hands-on activities' }
          ]
        },
        {
          id: 'a2',
          question: 'What type of school project excites you most?',
          type: 'multiple-choice',
          options: [
            { value: 'research', text: 'Research experiments' },
            { value: 'writing', text: 'Writing a story or essay' },
            { value: 'creative', text: 'Painting, music, or design' },
            { value: 'teaching', text: 'Teaching, tutoring, or explaining' }
          ]
        },
        {
          id: 'a3',
          question: 'In group work, you\'re often the one who:',
          type: 'multiple-choice',
          options: [
            { value: 'organizer', text: 'Organizes structure and timelines' },
            { value: 'creative', text: 'Brings fresh, creative ideas' },
            { value: 'harmony', text: 'Keeps harmony in the group' },
            { value: 'quality', text: 'Double-checks accuracy and details' }
          ]
        },
        {
          id: 'a4',
          question: 'People admire your ability to:',
          type: 'multiple-choice',
          options: [
            { value: 'analytical', text: 'Understand tough problems' },
            { value: 'imaginative', text: 'Be imaginative and original' },
            { value: 'supportive', text: 'Support and encourage friends' },
            { value: 'disciplined', text: 'Stay disciplined and dependable' }
          ]
        },
        {
          id: 'a5',
          question: 'A subject feels easiest when:',
          type: 'multiple-choice',
          options: [
            { value: 'structured', text: 'It has clear rules or formulas' },
            { value: 'experiential', text: 'It connects with real experiences' },
            { value: 'social', text: 'You can share or present it' },
            { value: 'expressive', text: 'You can express it visually or musically' }
          ]
        },
        {
          id: 'a_reflective',
          question: 'Which subjects or skills make time fly for you because you enjoy them deeply?',
          type: 'reflective',
          placeholder: 'Think about activities or subjects where you lose track of time...'
        }
      ]
    },
    {
      id: 'interests',
      title: 'Interests & Passions Module',
      description: 'RIASEC Framework',
      icon: <Heart className="h-6 w-6" />,
      questions: [
        {
          id: 'i1',
          question: 'Your dream project would involve:',
          type: 'multiple-choice',
          options: [
            { value: 'realistic', text: 'Building, fixing, or creating hands-on' },
            { value: 'artistic', text: 'Performing, designing, or artistic expression' },
            { value: 'social', text: 'Helping or guiding people' },
            { value: 'enterprising', text: 'Leading or organizing teams' },
            { value: 'investigative', text: 'Researching and experimenting' },
            { value: 'conventional', text: 'Promoting, persuading, or selling ideas' }
          ]
        },
        {
          id: 'i2',
          question: 'In a team, you prefer being the:',
          type: 'multiple-choice',
          options: [
            { value: 'realistic', text: 'Builder/implementer' },
            { value: 'artistic', text: 'Creative thinker' },
            { value: 'social', text: 'Helper/supporter' },
            { value: 'enterprising', text: 'Organizer/leader' },
            { value: 'investigative', text: 'Analyst/researcher' },
            { value: 'conventional', text: 'Motivator/influencer' }
          ]
        },
        {
          id: 'i3',
          question: 'Which result is most rewarding to you?',
          type: 'multiple-choice',
          options: [
            { value: 'realistic', text: 'Something you built or fixed' },
            { value: 'artistic', text: 'A creative product you made' },
            { value: 'social', text: 'Someone\'s life improved thanks to you' },
            { value: 'enterprising', text: 'A well-run project or event' },
            { value: 'investigative', text: 'Solving a difficult problem' },
            { value: 'conventional', text: 'Convincing others to believe in an idea' }
          ]
        },
        {
          id: 'i4',
          question: 'Which place excites you most to work in?',
          type: 'multiple-choice',
          options: [
            { value: 'realistic', text: 'Workshop/lab/outdoors' },
            { value: 'artistic', text: 'Studio or design space' },
            { value: 'social', text: 'School, hospital, community center' },
            { value: 'enterprising', text: 'Office or planning hub' },
            { value: 'investigative', text: 'Research center or library' },
            { value: 'conventional', text: 'Meeting, debate, or campaign floor' }
          ]
        },
        {
          id: 'i5',
          question: 'You feel happiest when:',
          type: 'multiple-choice',
          options: [
            { value: 'realistic', text: 'You\'re using tools and making progress physically' },
            { value: 'artistic', text: 'You\'re expressing yourself creatively' },
            { value: 'social', text: 'You\'re helping someone achieve something' },
            { value: 'enterprising', text: 'You\'re coordinating a group toward success' },
            { value: 'investigative', text: 'You\'re deep in thinking and discovery' },
            { value: 'conventional', text: 'You\'re influencing or inspiring others' }
          ]
        },
        {
          id: 'i_reflective',
          question: 'What activity makes you feel most "alive," whether or not it\'s academic?',
          type: 'reflective',
          placeholder: 'Describe an activity that energizes and fulfills you...'
        }
      ]
    },
    {
      id: 'learning',
      title: 'Learning Style Module',
      description: 'How you learn best',
      icon: <Lightbulb className="h-6 w-6" />,
      questions: [
        {
          id: 'l1',
          question: 'When learning something new, you prefer:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Watching demonstrations or diagrams' },
            { value: 'auditory', text: 'Talking it through with others' },
            { value: 'reading', text: 'Writing lists or structured notes' },
            { value: 'kinesthetic', text: 'Practicing step by step' }
          ]
        },
        {
          id: 'l2',
          question: 'You remember best when you:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Use visuals and colors' },
            { value: 'auditory', text: 'Hear it explained and repeated' },
            { value: 'reading', text: 'Organize it logically in writing' },
            { value: 'kinesthetic', text: 'Try it physically or role-play it' }
          ]
        },
        {
          id: 'l3',
          question: 'In classes, you stay engaged when:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Teachers use charts, images, or slides' },
            { value: 'auditory', text: 'There\'s class discussion and interaction' },
            { value: 'reading', text: 'You can outline and summarize clearly' },
            { value: 'kinesthetic', text: 'There are experiments or practical tasks' }
          ]
        },
        {
          id: 'l4',
          question: 'If stuck on homework, you:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Sketch or map it out' },
            { value: 'auditory', text: 'Ask someone to explain it' },
            { value: 'reading', text: 'Break it into steps and lists' },
            { value: 'kinesthetic', text: 'Act it out or redo examples' }
          ]
        },
        {
          id: 'l5',
          question: 'You study best in:',
          type: 'multiple-choice',
          options: [
            { value: 'visual', text: 'Quiet with visuals/tools around' },
            { value: 'auditory', text: 'Study groups or Q&A setting' },
            { value: 'reading', text: 'Structured environments' },
            { value: 'kinesthetic', text: 'Interactive settings' }
          ]
        },
        {
          id: 'l_reflective',
          question: 'Think of a time you learned something easily—what method made it click for you?',
          type: 'reflective',
          placeholder: 'Describe a specific learning experience that worked well for you...'
        }
      ]
    },
    {
      id: 'values',
      title: 'Work Values & Motivation Module',
      description: 'What drives you',
      icon: <Target className="h-6 w-6" />,
      questions: [
        {
          id: 'v1',
          question: 'Most important in a career:',
          type: 'multiple-choice',
          options: [
            { value: 'security', text: 'Financial stability' },
            { value: 'creativity', text: 'Creativity and self-expression' },
            { value: 'service', text: 'Helping people or community' },
            { value: 'achievement', text: 'Personal achievement or leadership' },
            { value: 'growth', text: 'Learning and growth' }
          ]
        },
        {
          id: 'v2',
          question: 'You feel proud when:',
          type: 'multiple-choice',
          options: [
            { value: 'achievement', text: 'You reach a measurable goal' },
            { value: 'service', text: 'Your work inspires or helps someone' },
            { value: 'growth', text: 'You\'ve grown personally or creatively' },
            { value: 'leadership', text: 'You take responsibility and succeed' },
            { value: 'discovery', text: 'You discover or solve something tough' }
          ]
        },
        {
          id: 'v3',
          question: 'In future work life, you\'d prefer:',
          type: 'multiple-choice',
          options: [
            { value: 'security', text: 'Predictable routines and security' },
            { value: 'flexibility', text: 'Flexibility and variety' },
            { value: 'service', text: 'Team-focused and service-oriented tasks' },
            { value: 'leadership', text: 'Ambitious challenges and leadership' },
            { value: 'independence', text: 'Independent, intellectual pursuits' }
          ]
        },
        {
          id: 'v4',
          question: 'Progress excites you most when:',
          type: 'multiple-choice',
          options: [
            { value: 'achievement', text: 'Measured in clear achievements' },
            { value: 'growth', text: 'Seen as new skills gained' },
            { value: 'service', text: 'Confirmed by others\' positive responses' },
            { value: 'leadership', text: 'Linked to completing big projects' },
            { value: 'discovery', text: 'Connected to exploring something new' }
          ]
        },
        {
          id: 'v5',
          question: 'You want recognition for:',
          type: 'multiple-choice',
          options: [
            { value: 'reliability', text: 'Being responsible and dependable' },
            { value: 'creativity', text: 'Being creative and innovative' },
            { value: 'service', text: 'Being helpful or kind' },
            { value: 'leadership', text: 'Being inspiring and successful' },
            { value: 'expertise', text: 'Being knowledgeable and skilled' }
          ]
        },
        {
          id: 'v_reflective',
          question: 'What kind of success feels most meaningful to you, beyond grades or money?',
          type: 'reflective',
          placeholder: 'Reflect on what truly motivates and fulfills you...'
        }
      ]
    },
    {
      id: 'softskills',
      title: 'Soft Skills & Behavior Module',
      description: 'How you work with others',
      icon: <Users className="h-6 w-6" />,
      questions: [
        {
          id: 's1',
          question: 'Under pressure, you usually:',
          type: 'multiple-choice',
          options: [
            { value: 'logical', text: 'Stay calm and logical' },
            { value: 'supportive', text: 'Share feelings to stay supported' },
            { value: 'action', text: 'Jump to solutions quickly' },
            { value: 'reflective', text: 'Step back and reflect before acting' }
          ]
        },
        {
          id: 's2',
          question: 'Meeting new people feels:',
          type: 'multiple-choice',
          options: [
            { value: 'energizing', text: 'Energizing and exciting' },
            { value: 'gradual', text: 'A bit slow until you warm up' },
            { value: 'contextual', text: 'Natural, depending on the group' },
            { value: 'listening', text: 'Easier when you listen more' }
          ]
        },
        {
          id: 's3',
          question: 'In teamwork, you\'re most often:',
          type: 'multiple-choice',
          options: [
            { value: 'leader', text: 'The organizer/leader' },
            { value: 'supporter', text: 'The caring listener' },
            { value: 'creative', text: 'The creative problem-solver' },
            { value: 'quality', text: 'The detail-checker' }
          ]
        },
        {
          id: 's4',
          question: 'Communication comes easiest when:',
          type: 'multiple-choice',
          options: [
            { value: 'persuasive', text: 'Explaining or persuading clearly' },
            { value: 'listening', text: 'Listening closely to others' },
            { value: 'creative', text: 'Using stories or creative examples' },
            { value: 'precise', text: 'Being precise with facts' }
          ]
        },
        {
          id: 's5',
          question: 'When a conflict arises, you:',
          type: 'multiple-choice',
          options: [
            { value: 'mediator', text: 'Mediate and seek compromise' },
            { value: 'honest', text: 'Express honestly but calmly' },
            { value: 'patient', text: 'Wait until things settle down' },
            { value: 'solution', text: 'Solve it quickly to move forward' }
          ]
        },
        {
          id: 's_reflective',
          question: 'What personal quality do you think makes you a strong teammate or friend?',
          type: 'reflective',
          placeholder: 'Think about feedback you\'ve received or your natural strengths in relationships...'
        }
      ]
    }
  ];

  const currentQuestionData = modules[currentModule]?.questions[currentQuestion];
  const totalQuestions = modules.reduce((sum, module) => sum + module.questions.length, 0);
  const answeredQuestions = responses.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = async (answer: string) => {
    const questionId = currentQuestionData.id;
    let aiAnalysis = '';

    // Store the response immediately without showing loading
    const newResponse: QuizResponse = {
      questionId,
      answer,
      aiAnalysis: '' // Will be filled later
    };

    setResponses(prev => [...prev.filter(r => r.questionId !== questionId), newResponse]);

    // Analyze reflective responses in background
    if (currentQuestionData.type === 'reflective' && answer.trim()) {
      try {
        aiAnalysis = await analyzeOpenEndedResponse(answer, currentQuestionData.question);
        // Update the response with analysis
        setResponses(prev => 
          prev.map(r => 
            r.questionId === questionId 
              ? { ...r, aiAnalysis }
              : r
          )
        );
      } catch (error) {
        console.error('AI analysis failed:', error);
        // Update with fallback analysis
        setResponses(prev => 
          prev.map(r => 
            r.questionId === questionId 
              ? { ...r, aiAnalysis: 'Analysis temporarily unavailable' }
              : r
          )
        );
      }
    }
  };

  const getCurrentAnswer = () => {
    const response = responses.find(r => r.questionId === currentQuestionData?.id);
    return response?.answer || '';
  };

  const nextQuestion = () => {
    if (currentQuestion < modules[currentModule].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentQuestion(modules[currentModule - 1].questions.length - 1);
    }
  };

  const calculateResults = () => {
    const calculatedResults: QuizResults = {
      personality: {},
      academicStrengths: {},
      interests: {},
      learningStyle: {},
      workValues: {},
      softSkills: {},
      reflectiveInsights: []
    };

    responses.forEach(response => {
      const moduleId = response.questionId.charAt(0);
      const category = getCategory(moduleId);
      
      // Only include AI analysis if response has meaningful content (more than 10 characters)
      if (response.aiAnalysis && response.answer && response.answer.trim().length > 10) {
        calculatedResults.reflectiveInsights.push(response.aiAnalysis);
      }

      if (category && response.answer && response.answer !== '' && response.answer.trim().length > 2) {
        const categoryData = calculatedResults[category] as { [key: string]: number };
        if (!categoryData[response.answer]) {
          categoryData[response.answer] = 0;
        }
        categoryData[response.answer]++;
      }
    });

    // Save results to user profile
    console.log('Saving quiz results:', calculatedResults);
    updateProfile({
      quizCompleted: true,
      quizResults: calculatedResults
    });

    // Verify the update was successful
    setTimeout(() => {
      const storedUser = localStorage.getItem('currentUser');
      console.log('Updated user in localStorage:', JSON.parse(storedUser || '{}'));
    }, 100);

    setResults(calculatedResults);
    setQuizCompleted(true);
  };

  const getCategory = (modulePrefix: string): keyof Omit<QuizResults, 'reflectiveInsights'> | null => {
    switch (modulePrefix) {
      case 'p': return 'personality';
      case 'a': return 'academicStrengths';
      case 'i': return 'interests';
      case 'l': return 'learningStyle';
      case 'v': return 'workValues';
      case 's': return 'softSkills';
      default: return null;
    }
  };

  const canProceed = () => {
    const currentAnswer = getCurrentAnswer();
    return currentAnswer && currentAnswer.trim() !== '';
  };

  const generatePersonalizedResults = (results: QuizResults) => {
    const sections = [];

    // Personality Analysis (MBTI-inspired)
    const personalityScores = results.personality;
    if (Object.keys(personalityScores).length > 0) {
      const topTraits = Object.entries(personalityScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
      
      sections.push(
        <div key="personality" className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="h-6 w-6 text-purple-600 mr-2" />
            Your Personality Profile
          </h3>
          <div className="space-y-3">
            {topTraits.map(([trait, score]) => {
              const recommendations = getPersonalityRecommendations(trait);
              return (
                <div key={trait} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 capitalize">{trait}</span>
                    <span className="text-sm text-purple-600 font-semibold">Strong Match</span>
                  </div>
                  <p className="text-gray-700 text-sm">{recommendations}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Academic Strengths (Gardner's Multiple Intelligences)
    const academicScores = results.academicStrengths;
    if (Object.keys(academicScores).length > 0) {
      const topStrengths = Object.entries(academicScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
      
      sections.push(
        <div key="academic" className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-6 w-6 text-green-600 mr-2" />
            Your Academic Strengths
          </h3>
          <div className="space-y-3">
            {topStrengths.map(([strength, score]) => {
              const recommendations = getAcademicRecommendations(strength);
              return (
                <div key={strength} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 capitalize">{strength}</span>
                    <span className="text-sm text-green-600 font-semibold">Top Strength</span>
                  </div>
                  <p className="text-gray-700 text-sm">{recommendations}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Career Interests (RIASEC)
    const interestScores = results.interests;
    if (Object.keys(interestScores).length > 0) {
      const topInterests = Object.entries(interestScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
      
      sections.push(
        <div key="interests" className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="h-6 w-6 text-red-600 mr-2" />
            Your Career Interests
          </h3>
          <div className="space-y-3">
            {topInterests.map(([interest, score]) => {
              const recommendations = getInterestRecommendations(interest);
              return (
                <div key={interest} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 capitalize">{interest}</span>
                    <span className="text-sm text-red-600 font-semibold">High Interest</span>
                  </div>
                  <p className="text-gray-700 text-sm">{recommendations}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return sections;
  };

  const getPersonalityRecommendations = (trait: string): string => {
    const recommendations: { [key: string]: string } = {
      planning: "You excel at strategic thinking and organization. Consider careers in project management, consulting, or operations where planning skills are valued.",
      action: "You thrive in dynamic environments and quick decision-making. Entrepreneurship, sales, or emergency services might suit your action-oriented nature.",
      collaborative: "You work best in team environments. Human resources, education, or collaborative research roles would leverage your people skills.",
      exploratory: "You enjoy investigating possibilities and creative problem-solving. Research, innovation, or creative fields would match your exploratory mindset.",
      energetic: "You bring enthusiasm and drive to your work. Leadership roles, public speaking, or high-energy careers would suit you well.",
      listening: "You have strong empathy and communication skills. Counseling, social work, or customer service roles would benefit from your listening abilities.",
      focused: "You excel at maintaining attention and delivering quality work. Technical roles, analysis, or specialized fields would suit your focused nature.",
      creative: "You think outside the box and generate innovative solutions. Design, arts, marketing, or creative industries would be ideal for you."
    };
    return recommendations[trait] || "Your unique combination of traits opens up diverse career possibilities.";
  };

  const getAcademicRecommendations = (strength: string): string => {
    const recommendations: { [key: string]: string } = {
      visual: "Your visual-spatial intelligence is strong. Consider architecture, graphic design, engineering, or data visualization careers.",
      auditory: "You process information well through sound and speech. Music, linguistics, audio production, or teaching might be great fits.",
      research: "Your investigative skills are excellent. Scientific research, journalism, market analysis, or academic careers would suit you.",
      writing: "You have strong linguistic abilities. Journalism, content creation, law, or communications would leverage your writing skills.",
      creative: "Your artistic intelligence shines. Fine arts, creative writing, design, or entertainment industries would be ideal.",
      teaching: "You have natural interpersonal skills for education. Teaching, training, mentoring, or educational leadership roles would suit you.",
      organizer: "Your logical-mathematical intelligence is strong. Business management, finance, operations, or systems analysis would be good fits.",
      supportive: "Your emotional intelligence is high. Psychology, social work, human resources, or healthcare would benefit from your supportive nature."
    };
    return recommendations[strength] || "Your academic strengths open up many educational and career pathways.";
  };

  const getInterestRecommendations = (interest: string): string => {
    const recommendations: { [key: string]: string } = {
      realistic: "You enjoy hands-on work and practical applications. Engineering, construction, agriculture, or technical trades would be fulfilling.",
      artistic: "You're drawn to creative expression and aesthetics. Arts, design, entertainment, or creative industries would inspire you.",
      social: "You're motivated by helping others and making a positive impact. Education, healthcare, social services, or non-profit work would be meaningful.",
      enterprising: "You enjoy leading, organizing, and business activities. Management, sales, entrepreneurship, or business development would suit you.",
      investigative: "You love research, analysis, and solving complex problems. Science, research, technology, or analytical roles would engage you.",
      conventional: "You appreciate structure, organization, and detailed work. Finance, administration, data management, or systematic roles would fit well."
    };
    return recommendations[interest] || "Your interests suggest diverse career possibilities across multiple fields.";
  };

  if (quizCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Career Discovery Results</h1>
            
            <div className="space-y-6">
              {generatePersonalizedResults(results)}
              
              {results.reflectiveInsights.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Insights</h3>
                  <div className="space-y-4">
                    {results.reflectiveInsights.map((insight: string, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => {
                  setQuizCompleted(false);
                  setCurrentModule(0);
                  setCurrentQuestion(0);
                  setResponses([]);
                  setResults(null);
                }}
                className="btn-secondary"
              >
                Retake Quiz
              </button>
              <button 
                onClick={() => navigate('/recommendations')}
                className="btn-primary"
              >
                Get Career Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Path Self-Discovery Quiz</h1>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              {modules[currentModule].icon}
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {modules[currentModule].title}
                </h2>
                <p className="text-sm text-gray-600">
                  {modules[currentModule].description}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              {currentQuestionData?.question}
            </h3>

            {currentQuestionData?.type === 'multiple-choice' ? (
              <div className="space-y-3">
                {currentQuestionData.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={getCurrentAnswer() === option.value}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-900">{option.text}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  value={getCurrentAnswer()}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestionData?.placeholder}
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevQuestion}
                disabled={currentModule === 0 && currentQuestion === 0}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {modules[currentModule].questions.length}
              </div>
              
              <button
                onClick={nextQuestion}
                disabled={!canProceed()}
                className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentModule === modules.length - 1 && currentQuestion === modules[currentModule].questions.length - 1 ? 'Complete Quiz' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDiscoveryQuiz;
