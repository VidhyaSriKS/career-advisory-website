import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collegesData, getCollegesByStream, searchColleges } from '../data/collegeData';
import { Search, MapPin, Star, Phone, Mail, Globe, Filter, Users, DollarSign, Award } from 'lucide-react';

const CollegeDirectory: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);

  const streams = [
    { id: 'all', name: 'All Streams' },
    { id: 'science', name: 'Science' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'arts', name: 'Arts/Humanities' },
    { id: 'vocational', name: 'Vocational/Technical' }
  ];

  const collegeTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'government', name: 'Government' },
    { id: 'private', name: 'Private' },
    { id: 'deemed', name: 'Deemed University' }
  ];

  const states = [
    { id: 'all', name: 'All States' },
    { id: 'namakkal', name: 'Namakkal' },
    { id: 'erode', name: 'Erode' }
  ];

  const filteredColleges = useMemo(() => {
    let colleges = collegesData;

    // Apply search filter
    if (searchQuery.trim()) {
      colleges = searchColleges(searchQuery);
    }

    // Apply stream filter
    if (selectedStream !== 'all') {
      colleges = colleges.filter(college => college.streams.includes(selectedStream));
    }

    // Apply type filter
    if (selectedType !== 'all') {
      colleges = colleges.filter(college => college.type === selectedType);
    }

    // Apply state filter
    if (selectedState !== 'all') {
      colleges = colleges.filter(college => 
        college.location.city.toLowerCase().includes(selectedState.toLowerCase()) ||
        college.location.state.toLowerCase().includes(selectedState.toLowerCase())
      );
    }

    return colleges;
  }, [searchQuery, selectedStream, selectedType, selectedState]);

  const selectedCollegeData = selectedCollege 
    ? collegesData.find(c => c.id === selectedCollege) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">College Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover colleges and universities that match your academic goals and preferences.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Stream Filter */}
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {streams.map(stream => (
                <option key={stream.id} value={stream.id}>{stream.name}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {collegeTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {states.map(state => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Found {filteredColleges.length} colleges</span>
            {user?.recommendedStream && (
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                Recommended: {user.recommendedStream}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colleges List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm max-h-screen overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Colleges ({filteredColleges.length})</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredColleges.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => setSelectedCollege(college.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 ${
                      selectedCollege === college.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{college.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {college.location.city}, {college.location.state}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            college.type === 'government' ? 'bg-green-100 text-green-800' :
                            college.type === 'private' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{college.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* College Details */}
          <div className="lg:col-span-2">
            {selectedCollegeData ? (
              <div className="space-y-6">
                {/* College Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedCollegeData.name}
                      </h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-5 w-5 mr-2" />
                        {selectedCollegeData.location.city}, {selectedCollegeData.location.state}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="font-medium">{selectedCollegeData.rating}/5</span>
                        </div>
                        <span className="text-gray-600">Est. {selectedCollegeData.established}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCollegeData.type === 'government' ? 'bg-green-100 text-green-800' :
                      selectedCollegeData.type === 'private' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedCollegeData.type.charAt(0).toUpperCase() + selectedCollegeData.type.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Annual Fees</div>
                        <div className="font-medium">{selectedCollegeData.fees.annual}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Avg. Package</div>
                        <div className="font-medium">{selectedCollegeData.placements.averagePackage}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Courses</div>
                        <div className="font-medium">{selectedCollegeData.courses.length} Programs</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courses */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollegeData.courses.map((course, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Admission & Cutoffs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Process</h3>
                    <ul className="space-y-2">
                      {selectedCollegeData.admissionProcess.map((process, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {process}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cutoff Percentiles</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">General</span>
                        <span className="font-medium">{selectedCollegeData.cutoff.general}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">OBC</span>
                        <span className="font-medium">{selectedCollegeData.cutoff.obc}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SC</span>
                        <span className="font-medium">{selectedCollegeData.cutoff.sc}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ST</span>
                        <span className="font-medium">{selectedCollegeData.cutoff.st}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCollegeData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placements */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Statistics</h3>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600">Average Package</div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCollegeData.placements.averagePackage}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Top Recruiters</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollegeData.placements.topRecruiters.map((recruiter, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{selectedCollegeData.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{selectedCollegeData.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400 mr-3" />
                      <a
                        href={selectedCollegeData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a College</h3>
                <p className="text-gray-600">
                  Choose a college from the list to view detailed information about admissions, courses, and facilities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDirectory;
