import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const SignInDetails: React.FC = () => {
  const navigate = useNavigate();
  const { register, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [standard, setStandard] = useState('');
  const [stream, setStream] = useState('');
  const [streamOther, setStreamOther] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Required: name, email, password, standard
    if (!name.trim() || !email.trim() || !password.trim() || !standard) return;

    // If standard is 11th or 12th, stream is required
    const needsStream = standard === '11th' || standard === '12th';
    if (needsStream) {
      if (!stream) return;
      if (stream === 'Other' && !streamOther.trim()) return;
    }

    const finalStream = stream === 'Other' ? (streamOther.trim() || 'Other') : stream;

    try {
      setSubmitting(true);
      // Create account
      await register(email.trim(), password, name.trim());
      // Store profile details
      const academicLevel = needsStream
        ? `${standard} - ${finalStream}`
        : standard === '10th' ? '10th Grade' : standard;

      await updateProfile({
        age: age ? parseInt(age, 10) : undefined,
        academicLevel,
      });
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign In - New User</h2>
          <p className="mt-2 text-sm text-gray-600">Provide your details to create an account</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Standard */}
            <div>
              <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
                Your current standard <span className="text-red-500">*</span>
              </label>
              <select
                id="standard"
                name="standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select your standard</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age (optional)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={10}
                max={100}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Create a password"
              />
            </div>

            {(standard === '11th' || standard === '12th') && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Which group/stream are you in? <span className="text-red-500">*</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">Please choose the one that best matches your current course of study.</p>
                <select
                  id="stream"
                  name="stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  required
                  className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select your stream</option>
                  <option value="Science (Maths/Biology/Computer)">Science (Maths/Biology/Computer)</option>
                  <option value="Commerce (with/without Maths)">Commerce (with/without Maths)</option>
                  <option value="Arts / Humanities">Arts / Humanities</option>
                  <option value="Vocational / Technical">Vocational / Technical</option>
                  <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                  <option value="Other">Other (please specify)</option>
                </select>

                {stream === 'Other' && (
                  <input
                    id="streamOther"
                    name="streamOther"
                    type="text"
                    value={streamOther}
                    onChange={(e) => setStreamOther(e.target.value)}
                    className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Please specify your stream"
                  />
                )}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={
                  submitting ||
                  !name.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !standard ||
                  ((standard === '11th' || standard === '12th') && (!stream || (stream === 'Other' && !streamOther.trim())))
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInDetails;
