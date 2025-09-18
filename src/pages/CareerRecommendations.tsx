import React from 'react';
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
  Lightbulb
} from 'lucide-react';

interface CareerRecommendation {
  title: string;
  match: number;
  description: string;
  skills: string[];
  education: string[];
  salary: string;
  growth: string;
  icon: React.ReactNode;
}

const CareerRecommendations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.quizCompleted || !user.quizResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Assessment First</h2>
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

  const generateCareerRecommendations = (): CareerRecommendation[] => {
    const results = user.quizResults;
    const recommendations: CareerRecommendation[] = [];

    // Get top traits from each category
    const topPersonality = getTopTrait(results.personality);
    const topAcademic = getTopTrait(results.academicStrengths);
    const topInterest = getTopTrait(results.interests);

    // Generate recommendations based on combinations
    if (topInterest === 'investigative' || topAcademic === 'research') {
      recommendations.push({
        title: 'Data Scientist',
        match: 92,
        description: 'Analyze complex data to help organizations make informed decisions using statistical methods and machine learning.',
        skills: ['Python/R Programming', 'Statistical Analysis', 'Machine Learning', 'Data Visualization'],
        education: ['Bachelor\'s in Computer Science', 'Statistics or Mathematics', 'Data Science Bootcamp'],
        salary: '₹8-25 LPA',
        growth: 'High (22% growth)',
        icon: <Brain className="h-6 w-6" />
      });
    }

    if (topInterest === 'artistic' || topAcademic === 'creative') {
      recommendations.push({
        title: 'UX/UI Designer',
        match: 88,
        description: 'Design user-friendly interfaces and experiences for websites, apps, and digital products.',
        skills: ['Design Thinking', 'Figma/Sketch', 'User Research', 'Prototyping'],
        education: ['Design Degree', 'HCI Certification', 'Portfolio Development'],
        salary: '₹6-20 LPA',
        growth: 'Very High (13% growth)',
        icon: <Heart className="h-6 w-6" />
      });
    }

    if (topInterest === 'social' || topPersonality === 'collaborative') {
      recommendations.push({
        title: 'Product Manager',
        match: 85,
        description: 'Lead product development from conception to launch, working with cross-functional teams.',
        skills: ['Strategic Planning', 'Market Research', 'Agile Methodology', 'Communication'],
        education: ['Business/Engineering Degree', 'MBA (preferred)', 'Product Management Course'],
        salary: '₹12-35 LPA',
        growth: 'High (19% growth)',
        icon: <Target className="h-6 w-6" />
      });
    }

    if (topInterest === 'enterprising' || topPersonality === 'action') {
      recommendations.push({
        title: 'Digital Marketing Manager',
        match: 83,
        description: 'Develop and execute digital marketing strategies to grow brand awareness and drive sales.',
        skills: ['SEO/SEM', 'Social Media Marketing', 'Analytics', 'Content Strategy'],
        education: ['Marketing Degree', 'Digital Marketing Certification', 'Google Ads Certification'],
        salary: '₹5-18 LPA',
        growth: 'High (10% growth)',
        icon: <TrendingUp className="h-6 w-6" />
      });
    }

    if (topAcademic === 'analytical' || topPersonality === 'planning') {
      recommendations.push({
        title: 'Software Engineer',
        match: 90,
        description: 'Design, develop, and maintain software applications and systems using various programming languages.',
        skills: ['Programming Languages', 'Problem Solving', 'System Design', 'Version Control'],
        education: ['Computer Science Degree', 'Coding Bootcamp', 'Self-taught + Portfolio'],
        salary: '₹6-30 LPA',
        growth: 'Very High (22% growth)',
        icon: <Lightbulb className="h-6 w-6" />
      });
    }

    if (topInterest === 'realistic' || topAcademic === 'visual') {
      recommendations.push({
        title: 'Civil Engineer',
        match: 80,
        description: 'Design and supervise construction of infrastructure projects like buildings, roads, and bridges.',
        skills: ['AutoCAD', 'Project Management', 'Structural Analysis', 'Construction Knowledge'],
        education: ['Civil Engineering Degree', 'Professional Engineer License', 'Specialized Certifications'],
        salary: '₹4-15 LPA',
        growth: 'Moderate (8% growth)',
        icon: <Briefcase className="h-6 w-6" />
      });
    }

    // Ensure we have at least 4 recommendations
    if (recommendations.length < 4) {
      recommendations.push({
        title: 'Business Analyst',
        match: 78,
        description: 'Bridge the gap between business needs and technology solutions by analyzing processes and requirements.',
        skills: ['Business Process Analysis', 'SQL', 'Requirements Gathering', 'Documentation'],
        education: ['Business/IT Degree', 'Business Analysis Certification', 'Domain Expertise'],
        salary: '₹5-20 LPA',
        growth: 'High (14% growth)',
        icon: <Users className="h-6 w-6" />
      });
    }

    return recommendations.sort((a, b) => b.match - a.match).slice(0, 6);
  };

  const getTopTrait = (category: { [key: string]: number }): string => {
    if (!category || Object.keys(category).length === 0) return '';
    return Object.entries(category).sort(([,a], [,b]) => b - a)[0][0];
  };

  const recommendations = generateCareerRecommendations();

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
            <div key={career.title} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-lg p-3 mr-4">
                      {career.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold text-primary-600">{career.match}% Match</span>
                      </div>
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

                {/* Key Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education Path */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Education Path</h4>
                  <div className="space-y-1">
                    {career.education.map((edu) => (
                      <div key={edu} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mr-2"></div>
                        {edu}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary & Growth */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Salary Range</h4>
                    <p className="text-sm text-gray-600">{career.salary}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Job Growth</h4>
                    <p className="text-sm text-green-600 font-medium">{career.growth}</p>
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
