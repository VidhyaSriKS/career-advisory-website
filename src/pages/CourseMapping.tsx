import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { coursesData, getCoursesbyStream } from '../data/courseData';
import { BookOpen, TrendingUp, Clock, Users, DollarSign, ChevronRight, Filter, Target, Star, ArrowRight, Brain, Heart, Lightbulb, GitBranch, Zap, Award } from 'lucide-react';

const CourseMapping: React.FC = () => {
  const { user } = useAuth();
  const [selectedStream, setSelectedStream] = useState(
    user?.recommendedStream?.toLowerCase().replace(' stream', '') || 'science'
  );
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');
  const [showCareerMap, setShowCareerMap] = useState(false);

  // Get personalized recommendations based on quiz results
  const getPersonalizedStreams = () => {
    if (!user?.quizResults) return [];
    
    const results = user.quizResults;
    const recommendations = [];
    
    // Analyze quiz results to recommend streams
    const topInterests = Object.entries(results.interests || {})
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 2);
    
    const topAcademic = Object.entries(results.academicStrengths || {})
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 2);

    // Science stream recommendations
    if (topInterests.some(([interest]) => ['investigative', 'realistic'].includes(interest)) ||
        topAcademic.some(([strength]) => ['analytical', 'research'].includes(strength))) {
      recommendations.push({ stream: 'science', match: 90, reason: 'Strong analytical and investigative traits' });
    }

    // Commerce stream recommendations  
    if (topInterests.some(([interest]) => ['enterprising', 'conventional'].includes(interest)) ||
        topAcademic.some(([strength]) => ['organizer', 'supportive'].includes(strength))) {
      recommendations.push({ stream: 'commerce', match: 85, reason: 'Business-oriented and organizational skills' });
    }

    // Arts stream recommendations
    if (topInterests.some(([interest]) => ['artistic', 'social'].includes(interest)) ||
        topAcademic.some(([strength]) => ['creative', 'teaching'].includes(strength))) {
      recommendations.push({ stream: 'arts', match: 88, reason: 'Creative and people-focused abilities' });
    }

    return recommendations.sort((a, b) => b.match - a.match);
  };

  const personalizedStreams = getPersonalizedStreams();

  // Career progression map data for each course
  const getCareerProgressionMap = (courseId: string) => {
    const careerMaps: Record<string, any> = {
      'btech-cs': {
        entryLevel: [
          { title: 'Junior Developer', skills: ['HTML/CSS', 'JavaScript', 'Git'], salary: '₹3-6 LPA', duration: '0-2 years' },
          { title: 'Data Analyst', skills: ['SQL', 'Excel', 'Python'], salary: '₹3-5 LPA', duration: '0-2 years' },
          { title: 'QA Tester', skills: ['Testing', 'Bug Tracking', 'Automation'], salary: '₹2-5 LPA', duration: '0-2 years' }
        ],
        midLevel: [
          { title: 'Full Stack Developer', skills: ['React', 'Node.js', 'Databases'], salary: '₹6-15 LPA', duration: '2-5 years' },
          { title: 'Data Scientist', skills: ['Machine Learning', 'Statistics', 'Python/R'], salary: '₹8-20 LPA', duration: '2-5 years' },
          { title: 'DevOps Engineer', skills: ['AWS', 'Docker', 'CI/CD'], salary: '₹7-18 LPA', duration: '2-5 years' },
          { title: 'Product Manager', skills: ['Strategy', 'Analytics', 'Leadership'], salary: '₹10-25 LPA', duration: '3-6 years' }
        ],
        seniorLevel: [
          { title: 'AI/ML Engineer', skills: ['Deep Learning', 'TensorFlow', 'Research'], salary: '₹15-40 LPA', duration: '5+ years' },
          { title: 'Tech Lead', skills: ['Architecture', 'Team Management', 'System Design'], salary: '₹20-50 LPA', duration: '5+ years' },
          { title: 'Data Science Manager', skills: ['Team Leadership', 'Strategy', 'Business Intelligence'], salary: '₹25-60 LPA', duration: '6+ years' },
          { title: 'CTO/VP Engineering', skills: ['Strategic Planning', 'Technology Vision', 'Leadership'], salary: '₹50+ LPA', duration: '8+ years' }
        ]
      },
      'btech-mech': {
        entryLevel: [
          { title: 'Design Engineer', skills: ['CAD', 'SolidWorks', 'Technical Drawing'], salary: '₹3-6 LPA', duration: '0-2 years' },
          { title: 'Production Engineer', skills: ['Manufacturing', 'Quality Control', 'Process Optimization'], salary: '₹3-5 LPA', duration: '0-2 years' },
          { title: 'Maintenance Engineer', skills: ['Equipment Maintenance', 'Troubleshooting', 'Safety'], salary: '₹2-5 LPA', duration: '0-2 years' }
        ],
        midLevel: [
          { title: 'Project Engineer', skills: ['Project Management', 'Team Coordination', 'Technical Leadership'], salary: '₹6-15 LPA', duration: '2-5 years' },
          { title: 'R&D Engineer', skills: ['Research', 'Innovation', 'Prototyping'], salary: '₹7-18 LPA', duration: '2-5 years' },
          { title: 'Operations Manager', skills: ['Operations', 'Process Improvement', 'Team Management'], salary: '₹8-20 LPA', duration: '3-6 years' }
        ],
        seniorLevel: [
          { title: 'Chief Engineer', skills: ['Strategic Planning', 'Technical Leadership', 'Innovation'], salary: '₹20-50 LPA', duration: '5+ years' },
          { title: 'Plant Manager', skills: ['Operations Management', 'P&L Responsibility', 'Leadership'], salary: '₹25-60 LPA', duration: '6+ years' },
          { title: 'VP Engineering', skills: ['Strategic Vision', 'Technology Leadership', 'Business Development'], salary: '₹50+ LPA', duration: '8+ years' }
        ]
      },
      'bcom': {
        entryLevel: [
          { title: 'Accountant', skills: ['Accounting', 'Tally', 'GST'], salary: '₹2-4 LPA', duration: '0-2 years' },
          { title: 'Sales Executive', skills: ['Communication', 'Customer Relations', 'Product Knowledge'], salary: '₹2-5 LPA', duration: '0-2 years' },
          { title: 'Banking Associate', skills: ['Banking Operations', 'Customer Service', 'Financial Products'], salary: '₹3-6 LPA', duration: '0-2 years' }
        ],
        midLevel: [
          { title: 'Financial Analyst', skills: ['Financial Modeling', 'Excel', 'Data Analysis'], salary: '₹5-12 LPA', duration: '2-5 years' },
          { title: 'Marketing Manager', skills: ['Marketing Strategy', 'Digital Marketing', 'Brand Management'], salary: '₹6-15 LPA', duration: '2-5 years' },
          { title: 'Branch Manager', skills: ['Team Management', 'Business Development', 'Operations'], salary: '₹7-18 LPA', duration: '3-6 years' }
        ],
        seniorLevel: [
          { title: 'Finance Manager', skills: ['Strategic Finance', 'Investment Planning', 'Risk Management'], salary: '₹15-35 LPA', duration: '5+ years' },
          { title: 'Business Development Head', skills: ['Strategic Planning', 'Partnership Development', 'Leadership'], salary: '₹20-45 LPA', duration: '6+ years' },
          { title: 'CFO', skills: ['Financial Strategy', 'Corporate Finance', 'Leadership'], salary: '₹40+ LPA', duration: '8+ years' }
        ]
      }
    };

    return careerMaps[courseId] || {
      entryLevel: [],
      midLevel: [],
      seniorLevel: []
    };
  };

  const streams = [
    { 
      id: 'science', 
      name: 'Science', 
      color: 'bg-blue-500',
      icon: <Brain className="h-6 w-6" />,
      description: 'STEM fields, research, and technical careers',
      courses: getCoursesbyStream('science').length
    },
    { 
      id: 'commerce', 
      name: 'Commerce', 
      color: 'bg-green-500',
      icon: <Target className="h-6 w-6" />,
      description: 'Business, finance, and management careers',
      courses: getCoursesbyStream('commerce').length
    },
    { 
      id: 'arts', 
      name: 'Arts/Humanities', 
      color: 'bg-purple-500',
      icon: <Heart className="h-6 w-6" />,
      description: 'Creative, social, and communication careers',
      courses: getCoursesbyStream('arts').length
    },
    { 
      id: 'vocational', 
      name: 'Vocational/Technical', 
      color: 'bg-orange-500',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Practical skills and industry-focused careers',
      courses: getCoursesbyStream('vocational').length
    }
  ];

  const courses = getCoursesbyStream(selectedStream);
  const selectedCourseData = selectedCourse ? coursesData.find(c => c.id === selectedCourse) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Visual Course Mapping</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore your personalized course pathways with interactive visual mapping based on your career assessment results.
          </p>
        </div>

        {/* Personalized Recommendations Banner */}
        {personalizedStreams.length > 0 && (
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <Star className="h-6 w-6 mr-2" />
                  Your Personalized Stream Recommendations
                </h2>
                <p className="opacity-90">Based on your career discovery assessment results</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{personalizedStreams[0]?.match}%</div>
                <div className="text-sm opacity-90">Best Match</div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'visual'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Visual Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {viewMode === 'visual' ? (
          /* Visual Stream Mapping */
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose Your Stream Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {streams.map((stream) => {
                const recommendation = personalizedStreams.find(r => r.stream === stream.id);
                return (
                  <div
                    key={stream.id}
                    onClick={() => {
                      setSelectedStream(stream.id);
                      setSelectedCourse(null);
                    }}
                    className={`relative cursor-pointer group transition-all duration-300 transform hover:scale-105 ${
                      selectedStream === stream.id ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl p-6 border-2 transition-all duration-200 ${
                      selectedStream === stream.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      {/* Recommendation Badge */}
                      {recommendation && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {recommendation.match}% Match
                        </div>
                      )}
                      
                      {/* Stream Icon */}
                      <div className={`w-16 h-16 ${stream.color} rounded-full flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                        {stream.icon}
                      </div>
                      
                      {/* Stream Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{stream.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{stream.description}</p>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {stream.courses} courses
                        </div>
                        
                        {/* Recommendation Reason */}
                        {recommendation && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg">
                            <p className="text-xs text-green-700 font-medium">{recommendation.reason}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Selection Arrow */}
                      {selectedStream === stream.id && (
                        <div className="absolute bottom-4 right-4">
                          <ArrowRight className="h-5 w-5 text-primary-600" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View - Original Stream Selection */
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Stream</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {streams.map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => {
                    setSelectedStream(stream.id);
                    setSelectedCourse(null);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedStream === stream.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 ${stream.color} rounded-full mx-auto mb-2`}></div>
                  <div className="font-medium text-gray-900">{stream.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Course Flow */}
        {viewMode === 'visual' && selectedStream && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              {streams.find(s => s.id === selectedStream)?.name} Stream Course Pathways
            </h2>
            
            {/* Interactive Course Flow Diagram */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="relative">
                {/* Course Flow Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, index) => {
                    const isRecommended = personalizedStreams.some(rec => rec.stream === selectedStream);
                    return (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className={`relative cursor-pointer group transition-all duration-300 ${
                          selectedCourse === course.id ? 'transform scale-105' : 'hover:transform hover:scale-102'
                        }`}
                      >
                        <div className={`bg-gradient-to-br from-white to-gray-50 rounded-lg border-2 p-6 shadow-md hover:shadow-lg transition-all duration-200 ${
                          selectedCourse === course.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {/* Course Badge */}
                          {isRecommended && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                              Recommended
                            </div>
                          )}
                          
                          {/* Course Header */}
                          <div className="mb-4">
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">
                              {course.name}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                          </div>
                          
                          {/* Course Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                              <span>{course.averageSalary}</span>
                            </div>
                          </div>
                          
                          {/* Career Paths Preview */}
                          <div className="mb-4">
                            <div className="text-xs font-medium text-gray-700 mb-2">Career Paths:</div>
                            <div className="flex flex-wrap gap-1">
                              {course.careerPaths.slice(0, 2).map((path, pathIndex) => (
                                <span key={pathIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {path.title}
                                </span>
                              ))}
                              {course.careerPaths.length > 2 && (
                                <span className="text-xs text-gray-500">+{course.careerPaths.length - 2} more</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => setSelectedCourse(course.id)}
                              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center"
                            >
                              <span>Details</span>
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedCourse(course.id);
                                setShowCareerMap(true);
                              }}
                              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
                            >
                              <GitBranch className="h-3 w-3 mr-1" />
                              <span>Career Map</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Connection Lines for Visual Flow */}
                        {index < courses.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Career Progression Map Modal/Section */}
        {showCareerMap && selectedCourse && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Career Progression Map: {coursesData.find(c => c.id === selectedCourse)?.name}
                  </h2>
                  <p className="text-gray-600">Explore your career journey from entry-level to senior positions</p>
                </div>
                <button
                  onClick={() => setShowCareerMap(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              </div>

              {(() => {
                const careerMap = getCareerProgressionMap(selectedCourse);
                return (
                  <div className="space-y-8">
                    {/* Entry Level */}
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <Zap className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Entry Level (0-2 years)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
                        {careerMap.entryLevel.map((career: any, index: number) => (
                          <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 relative">
                            <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                            <div className="text-sm text-gray-600 mb-2">{career.salary}</div>
                            <div className="text-xs text-green-600 mb-3">{career.duration}</div>
                            <div className="flex flex-wrap gap-1">
                              {career.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                <span key={skillIndex} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            {/* Arrow to next level */}
                            {index === Math.floor(careerMap.entryLevel.length / 2) && (
                              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                <ArrowRight className="h-6 w-6 text-blue-500 rotate-90" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mid Level */}
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Mid Level (2-6 years)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-11">
                        {careerMap.midLevel.map((career: any, index: number) => (
                          <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 relative">
                            <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                            <div className="text-sm text-gray-600 mb-2">{career.salary}</div>
                            <div className="text-xs text-blue-600 mb-3">{career.duration}</div>
                            <div className="flex flex-wrap gap-1">
                              {career.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                <span key={skillIndex} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            {/* Arrow to next level */}
                            {index === Math.floor(careerMap.midLevel.length / 2) && (
                              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                <ArrowRight className="h-6 w-6 text-purple-500 rotate-90" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Senior Level */}
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 rounded-full p-2 mr-3">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Senior Level (5+ years)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-11">
                        {careerMap.seniorLevel.map((career: any, index: number) => (
                          <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                            <div className="text-sm text-gray-600 mb-2">{career.salary}</div>
                            <div className="text-xs text-purple-600 mb-3">{career.duration}</div>
                            <div className="flex flex-wrap gap-1">
                              {career.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                <span key={skillIndex} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Path Insights */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                        Career Path Insights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Typical Progression:</strong> Most professionals advance from entry to mid-level within 2-3 years with consistent skill development.
                        </div>
                        <div>
                          <strong>Key Success Factors:</strong> Continuous learning, networking, and gaining diverse project experience accelerate career growth.
                        </div>
                        <div>
                          <strong>Salary Growth:</strong> Average salary increases 15-25% with each level progression and skill specialization.
                        </div>
                        <div>
                          <strong>Specialization Options:</strong> Multiple pathways available - choose based on your interests and market demand.
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses List - Only show in list view or as sidebar in visual view */}
          {(viewMode === 'list' || selectedCourse) && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Available Courses ({courses.length})
                </h3>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        selectedCourse === course.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1">{course.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{course.description}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {course.averageSalary}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Course Details */}
          <div className={`${(viewMode === 'list' || selectedCourse) ? 'lg:col-span-2' : 'col-span-full'}`}>
            {selectedCourseData ? (
              <div className="space-y-6">
                {/* Course Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedCourseData.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{selectedCourseData.description}</p>
                    </div>
                    {personalizedStreams.some(rec => rec.stream === selectedStream) && (
                      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                        <Star className="h-4 w-4 inline mr-1" />
                        Recommended for You
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{selectedCourseData.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Average Salary</div>
                        <div className="font-medium">{selectedCourseData.averageSalary}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Career Paths</div>
                        <div className="font-medium">{selectedCourseData.careerPaths.length} options</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Eligibility Criteria:</h4>
                    <ul className="space-y-1">
                      {selectedCourseData.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Career Paths */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Career Opportunities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCourseData.careerPaths.map((career, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{career.title}</h5>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                            +{career.growthRate} growth
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Key Skills:</div>
                          <div className="flex flex-wrap gap-1">
                            {career.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Colleges */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Top Colleges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCourseData.topColleges.map((college, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-900">{college}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Course</h3>
                <p className="text-gray-600">
                  Choose a course from the list to view detailed information about career paths and opportunities.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendation Banner */}
        {user?.recommendedStream && (
          <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Recommended Stream</h3>
                <p className="opacity-90">
                  Based on your assessment, we recommend exploring {user.recommendedStream} courses.
                </p>
              </div>
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMapping;
