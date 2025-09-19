import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, GraduationCap, Calendar, Edit2, Save, X, Brain, Heart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import CareerDiscoveryQuiz from '../components/CareerDiscoveryQuiz';
import { ACADEMIC_LEVELS } from '../utils/constants';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    academicLevel: user?.academicLevel || '',
    location: user?.location || '',
    interests: user?.interests?.join(', ') || '',
    strengths: user?.strengths?.join(', ') || ''
  });

  const academicLevels = [...ACADEMIC_LEVELS];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      age: formData.age ? parseInt(formData.age.toString()) : undefined,
      interests: formData.interests ? formData.interests.split(',').map(item => item.trim()) : [],
      strengths: formData.strengths ? formData.strengths.split(',').map(item => item.trim()) : []
    };

    await updateProfile(updatedData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age?.toString() || '',
      academicLevel: user?.academicLevel || '',
      location: user?.location || '',
      interests: user?.interests?.join(', ') || '',
      strengths: user?.strengths?.join(', ') || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-full p-3">
                  <User className="h-12 w-12 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-field"
                        min="10"
                        max="100"
                      />
                    ) : (
                      <p className="text-gray-900">{user.age || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Academic Level
                    </label>
                    {isEditing ? (
                      <select
                        name="academicLevel"
                        value={formData.academicLevel}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select academic level</option>
                        {academicLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">{user.academicLevel || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="City, State"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {user.location || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Interests & Strengths */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests & Strengths</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interests
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Science, Technology, Arts (comma separated)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.interests && user.interests.length > 0 ? (
                          user.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm flex items-center"
                            >
                              <Heart className="h-3 w-3 mr-1" />
                              {interest}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500">No interests specified</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Strengths
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="strengths"
                        value={formData.strengths}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Problem Solving, Communication (comma separated)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.strengths && user.strengths.length > 0 ? (
                          user.strengths.map((strength, index) => (
                            <span
                              key={index}
                              className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-sm flex items-center"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              {strength}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500">No strengths specified</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Career Discovery Quiz Status */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Discovery Assessment</h2>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                {user.quizCompleted && user.quizResults ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-3 mr-4">
                        <Brain className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Career Discovery Quiz Completed</h3>
                        <p className="text-gray-600">Comprehensive personality and career assessment completed</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Results saved • {Object.keys(user.quizResults.personality || {}).length + 
                          Object.keys(user.quizResults.academicStrengths || {}).length + 
                          Object.keys(user.quizResults.interests || {}).length} traits analyzed
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigate('/recommendations')}
                        className="btn-primary"
                      >
                        View Recommendations
                      </button>
                      <button 
                        onClick={() => navigate('/quiz')}
                        className="btn-primary"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-primary-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Brain className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Discover Your Career Path</h3>
                    <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                      Take our comprehensive Career Path Self-Discovery Quiz featuring 6 modules: Personality (MBTI + Big Five), 
                      Academic Strengths, Interests (RIASEC), Learning Style, Work Values, and Soft Skills. 
                      Includes AI analysis of your reflective responses.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm">
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">Personality Analysis</span>
                      <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full">RIASEC Framework</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">AI Insights</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Career Mapping</span>
                    </div>
                    <button 
                      onClick={() => setShowQuiz(true)}
                      className="btn-primary text-lg px-8 py-3"
                    >
                      Start Career Discovery Quiz
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Takes approximately 15-20 minutes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Career Discovery Quiz Modal/Overlay */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Career Path Self-Discovery Quiz</h2>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <CareerDiscoveryQuiz />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
