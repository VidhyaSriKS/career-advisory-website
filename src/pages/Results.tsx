import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { streamRecommendations } from '../data/quizData';
import { Award, TrendingUp, BookOpen, Users, ArrowRight, RefreshCw } from 'lucide-react';

const Results: React.FC = () => {
  const { user } = useAuth();

  if (!user || !user.quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Results Found</h2>
          <p className="text-gray-600 mb-6">Please complete the aptitude assessment first.</p>
          <Link to="/quiz" className="btn-primary">
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  const recommendedStream = user.recommendedStream?.toLowerCase().replace(' stream', '') || 'arts';
  const recommendation = streamRecommendations[recommendedStream];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Award className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Assessment Results</h1>
            <p className="text-gray-600">Based on your responses, we've identified your ideal academic path</p>
          </div>
        </div>

        {/* Recommended Stream */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Stream</h2>
            <div className="bg-primary-100 text-primary-800 px-6 py-3 rounded-full text-xl font-semibold inline-block">
              {recommendation.stream}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why This Stream?</h3>
              <p className="text-gray-600 mb-6">{recommendation.description}</p>
              
              <h4 className="font-medium text-gray-900 mb-3">This stream is suitable for:</h4>
              <ul className="space-y-2">
                {recommendation.suitableFor.map((trait, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Required Skills:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {recommendation.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h4 className="font-medium text-gray-900 mb-3">Popular Career Paths:</h4>
              <ul className="space-y-2">
                {recommendation.careerPaths.map((career, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    {career}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/course-mapping" className="card hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Courses</h3>
            <p className="text-gray-600 mb-4">
              Discover detailed course options and career mappings for your recommended stream.
            </p>
            <div className="flex items-center text-primary-600 font-medium">
              View Course Mapping <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link to="/colleges" className="card hover:shadow-xl transition-shadow duration-300">
            <Users className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Colleges</h3>
            <p className="text-gray-600 mb-4">
              Browse colleges and universities that offer programs in your recommended stream.
            </p>
            <div className="flex items-center text-primary-600 font-medium">
              Browse Colleges <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link to="/timeline" className="card hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Timeline</h3>
            <p className="text-gray-600 mb-4">
              Create a timeline for admissions, exams, and important academic milestones.
            </p>
            <div className="flex items-center text-primary-600 font-medium">
              Create Timeline <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to Retake the Assessment?</h3>
              <p className="text-gray-600">
                You can retake the quiz anytime to get updated recommendations based on your evolving interests.
              </p>
            </div>
            <Link
              to="/quiz"
              className="mt-4 sm:mt-0 flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Link>
          </div>
        </div>

        {/* Share Results */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Share Your Results</h3>
            <p className="mb-4 opacity-90">
              Let your friends and family know about your recommended career path!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors duration-200">
                Share on Social Media
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors duration-200">
                Download PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
