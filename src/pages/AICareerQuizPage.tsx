import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import AICareerQuiz from '../components/quiz/AICareerQuiz';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const AICareerQuizPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to access the AI Career Quiz and get personalized career recommendations.
        </p>
        <Button asChild>
          <a href="/signin">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Career Quiz | Career Path Finder</title>
        <meta 
          name="description" 
          content="Take our AI-powered career quiz to discover personalized career path recommendations based on your skills, interests, and goals." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <AICareerQuiz />
      </div>
    </>
  );
};

export default AICareerQuizPage;
