import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AIAnalysisResult {
  analysis: string;
  careerPaths: Array<{
    title: string;
    description: string;
    reasoning: string;
    requiredSkills: string[];
    educationPath: string[];
    growthPotential: string;
    salaryRange: {
      entry: string;
      mid: string;
      senior: string;
    };
  }>;
}

export const useAIAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const { user } = useAuth();

  const analyzeQuizResponses = async (responses: any[], profile: any) => {
    setLoading(true);
    setError(null);

    try {
      let token = undefined;
      if (user?.getIdToken) {
        token = await user.getIdToken();
      }
      
      const response = await fetch('/api/ai/analyze-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ responses, profile })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze quiz responses');
      }

      const data = await response.json();
      setResult(data.data);
      return data.data as AIAnalysisResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeQuizResponses,
    result,
    loading,
    error,
    reset: () => {
      setError(null);
      setResult(null);
    }
  };
};
