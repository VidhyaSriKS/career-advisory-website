import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { quizQuestions, streamRecommendations } from '../data/quizData';
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Quiz: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const categoryScores = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0,
      investigative: 0,
      enterprising: 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const question = quizQuestions[parseInt(questionIndex)];
      if (question) {
        // Simple scoring: each answer contributes to different categories
        switch (answerIndex) {
          case 0:
            categoryScores.analytical += 1;
            break;
          case 1:
            categoryScores.creative += 1;
            break;
          case 2:
            categoryScores.social += 1;
            break;
          case 3:
            categoryScores.practical += 1;
            break;
        }
        
        // Also add to the question's primary category
        categoryScores[question.category] += 0.5;
      }
    });

    // Determine recommended stream based on highest scores
    let recommendedStream = 'arts';
    
    if (categoryScores.analytical + categoryScores.investigative > 8) {
      recommendedStream = 'science';
    } else if (categoryScores.enterprising + categoryScores.practical > 7) {
      recommendedStream = 'commerce';
    } else if (categoryScores.practical > categoryScores.creative && categoryScores.practical > 6) {
      recommendedStream = 'vocational';
    }

    return {
      scores: categoryScores,
      recommendedStream,
      recommendation: streamRecommendations[recommendedStream]
    };
  };

  const completeQuiz = () => {
    const results = calculateResults();
    
    // Update user profile with quiz completion
    updateProfile({
      quizCompleted: true,
      recommendedStream: results.recommendation.stream,
      quizResults: results
    });

    setIsCompleted(true);
    toast.success('Quiz completed successfully!');
    
    // Navigate to results page after a short delay
    setTimeout(() => {
      navigate('/results');
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for completing the assessment. We're analyzing your responses to provide personalized recommendations.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Career Aptitude Assessment</h1>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      answers[currentQuestion] === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </button>

            <div className="flex space-x-2">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    index === currentQuestion
                      ? 'bg-primary-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Complete Quiz' : 'Next'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Answer all questions honestly based on your preferences and natural tendencies</li>
            <li>• There are no right or wrong answers - choose what feels most natural to you</li>
            <li>• You can navigate between questions using the Previous/Next buttons or question numbers</li>
            <li>• Take your time - the assessment is not timed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
