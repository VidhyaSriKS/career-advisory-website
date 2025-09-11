import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, MapPin, GraduationCap, Heart, Star, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    academicLevel: user?.academicLevel || '',
    location: user?.location || '',
    interests: user?.interests?.join(', ') || '',
    strengths: user?.strengths?.join(', ') || ''
  });

  const academicLevels = [
    '10th Grade',
    '12th Grade',
    'Undergraduate',
    'Graduate',
    'Postgraduate'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      age: formData.age ? parseInt(formData.age.toString()) : undefined,
      interests: formData.interests ? formData.interests.split(',').map(item => item.trim()) : [],
      strengths: formData.strengths ? formData.strengths.split(',').map(item => item.trim()) : []
    };

    updateProfile(updatedData);
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

            {/* Quiz Status */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Status</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {user.quizCompleted ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Aptitude Assessment Completed</h3>
                      <p className="text-gray-600">Recommended Stream: {user.recommendedStream}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary">View Results</button>
                      <button className="btn-primary">Retake Quiz</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Complete Your Assessment</h3>
                    <p className="text-gray-600 mb-4">
                      Take our comprehensive aptitude test to get personalized career recommendations.
                    </p>
                    <button className="btn-primary">Start Assessment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
