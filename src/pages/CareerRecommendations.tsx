import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target, 
  Star,
  ArrowRight,
  Brain,
  Heart,
  Lightbulb,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

interface CareerRecommendation {
  id: string;
  title: string;
  matchScore: number;
  description: string;
  requiredSkills: string[];
  educationRequirements: string[];
  averageSalary: string;
  growthRate: string;
  engineeringField?: string;
  engineeringSkills?: string[];
  icon?: React.ReactNode;
  source?: string;
}

const CareerRecommendations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.quizCompleted) return;
      
      setLoading(true);
      try {
        const response = await axios.post('/api/recommend/quiz-based', {
          answers: user.quizResults ? Object.entries(user.quizResults).map(([questionId, answer]) => ({
            questionId,
            answer: String(answer)
          })) : []
        });

        if (response.data.success) {
          // Map API response to our component's expected format
          const mappedRecs = response.data.data.recommendations.map((rec: any) => ({
            ...rec,
            icon: getCareerIcon(rec.title),
            matchScore: rec.matchScore || 0
          }));
          setRecommendations(mappedRecs);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const getCareerIcon = (title: string): React.ReactNode => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Data Scientist': <Brain className="h-6 w-6" />,
      'UX/UI Designer': <Heart className="h-6 w-6" />,
      'Product Manager': <Target className="h-6 w-6" />,
      'Digital Marketing': <TrendingUp className="h-6 w-6" />,
      'Software Engineer': <Lightbulb className="h-6 w-6" />,
      'Civil Engineer': <Briefcase className="h-6 w-6" />
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (title.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return <Briefcase className="h-6 w-6" />;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">Sign in to view your personalized career recommendations.</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!user.quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Assessment</h2>
          <p className="text-gray-600 mb-6">Take our career discovery quiz to get personalized recommendations.</p>
          <button 
            onClick={() => navigate('/quiz')}
            className="btn-primary"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your profile and finding the best career matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Career Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your career discovery assessment, here are the top career paths that align with your 
            personality, interests, and strengths.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {recommendations.map((career, index) => (
            <div key={`${career.id}-${index}`} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4 border-primary-500">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-lg p-3 mr-4 mt-1">
                      {career.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold text-primary-600">
                          {career.matchScore}% Match
                        </span>
                        {career.engineeringField && (
                          <span className="ml-3 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {career.engineeringField}
                          </span>
                        )}
                      </div>
                      {career.growthRate && (
                        <div className="mt-1 text-sm text-gray-600">
                          <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
                          {career.growthRate}% projected growth
                        </div>
                      )}
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Top Match
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{career.description}</p>
                
                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills?.slice(0, 8).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {career.requiredSkills?.length > 8 && (
                        <span className="text-xs text-gray-500 self-center">+{career.requiredSkills.length - 8} more</span>
                      )}
                    </div>
                    
                    {/* Engineering-specific skills */}
                    {career.engineeringSkills && career.engineeringSkills.length > 0 && (
                      <div className="mt-2">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">Engineering Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.engineeringSkills.slice(0, 5).map((skill, i) => (
                            <span key={`eng-${i}`} className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-full border border-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {career.educationRequirements && career.educationRequirements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Education Path</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {career.educationRequirements.slice(0, 3).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Average Salary</p>
                      <p className="font-medium text-gray-900">{career.averageSalary || 'Varies'}</p>
                    </div>
                    {career.growthRate && (
                      <div>
                        <p className="text-xs text-gray-500">Job Growth</p>
                        <p className="font-medium text-gray-900">
                          {parseFloat(career.growthRate) >= 15 ? 'High' : 'Moderate'} ({career.growthRate}%)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h2>
          <p className="text-gray-600 mb-6">
            Explore courses, colleges, and career timelines to start your journey toward your ideal career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/course-mapping')}
              className="btn-primary"
            >
              Explore Courses
            </button>
            <button 
              onClick={() => navigate('/colleges')}
              className="btn-secondary"
            >
              Find Colleges
            </button>
            <button 
              onClick={() => navigate('/timeline')}
              className="btn-secondary"
            >
              View Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendations;
