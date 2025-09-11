import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { timelineEvents, getEventsByStream, getUpcomingEvents } from '../data/timelineData';
import { Calendar, Clock, AlertCircle, ExternalLink, Filter, Bell, CheckCircle } from 'lucide-react';

const Timeline: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState(
    user?.recommendedStream?.toLowerCase().replace(' stream', '') || 'all'
  );

  const categories = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500' },
    { id: 'exam', name: 'Exams', color: 'bg-red-500' },
    { id: 'admission', name: 'Admissions', color: 'bg-blue-500' },
    { id: 'scholarship', name: 'Scholarships', color: 'bg-green-500' },
    { id: 'application', name: 'Applications', color: 'bg-yellow-500' },
    { id: 'result', name: 'Results', color: 'bg-purple-500' }
  ];

  const streams = [
    { id: 'all', name: 'All Streams' },
    { id: 'science', name: 'Science' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'arts', name: 'Arts/Humanities' },
    { id: 'vocational', name: 'Vocational/Technical' }
  ];

  const filteredEvents = useMemo(() => {
    let events = timelineEvents;

    if (selectedCategory !== 'all') {
      events = events.filter(event => event.category === selectedCategory);
    }

    if (selectedStream !== 'all') {
      events = events.filter(event => 
        !event.stream || event.stream.includes(selectedStream)
      );
    }

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedCategory, selectedStream]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const upcomingEvents = getUpcomingEvents(3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Academic Timeline</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay on track with important dates for admissions, exams, and scholarships.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                {getPriorityIcon(event.priority)}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(event.date)}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-3 h-3 ${category.color} rounded-full mr-2`}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stream Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Stream
              </label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {streams.map(stream => (
                  <option key={stream.id} value={stream.id}>{stream.name}</option>
                ))}
              </select>
              {user?.recommendedStream && (
                <p className="mt-2 text-sm text-primary-600">
                  Showing events relevant to your recommended stream: {user.recommendedStream}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} events
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-primary-100 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          {getPriorityIcon(event.priority)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(event.date)}
                            {event.endDate && ` - ${formatDate(event.endDate)}`}
                          </div>
                          {event.stream && (
                            <div className="flex items-center">
                              <Filter className="h-4 w-4 mr-1" />
                              {event.stream.join(', ')}
                            </div>
                          )}
                        </div>

                        {event.requirements && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {event.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        )}
                        <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                          <Bell className="h-4 w-4 mr-1" />
                          Remind Me
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Never Miss an Important Date</h3>
              <p className="opacity-90">
                Enable notifications to get reminders about upcoming exams, admission deadlines, and scholarship opportunities.
              </p>
            </div>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Enable Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
