import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { coursesData, getCoursesbyStream } from '../data/courseData';
import { BookOpen, TrendingUp, Clock, Users, DollarSign, ChevronRight, Filter } from 'lucide-react';

const CourseMapping: React.FC = () => {
  const { user } = useAuth();
  const [selectedStream, setSelectedStream] = useState(
    user?.recommendedStream?.toLowerCase().replace(' stream', '') || 'science'
  );
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const streams = [
    { id: 'science', name: 'Science', color: 'bg-blue-500' },
    { id: 'commerce', name: 'Commerce', color: 'bg-green-500' },
    { id: 'arts', name: 'Arts/Humanities', color: 'bg-purple-500' },
    { id: 'vocational', name: 'Vocational/Technical', color: 'bg-orange-500' }
  ];

  const courses = getCoursesbyStream(selectedStream);
  const selectedCourseData = selectedCourse ? coursesData.find(c => c.id === selectedCourse) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course to Career Mapping</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore detailed course options and their career paths. Discover which programs align with your interests and goals.
          </p>
        </div>

        {/* Stream Selection */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses List */}
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">
            {selectedCourseData ? (
              <div className="space-y-6">
                {/* Course Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCourseData.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedCourseData.description}</p>
                  
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
