import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';
import { AIAnalysisResult } from '../ai/AIAnalysisResult';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type FormData = {
  fullName: string;
  age: string;
  educationLevel: string;
  currentInterests: string;
  skills: string;
  careerGoals: string;
  workEnvironment: string;
  learningStyle: string;
  challenges: string;
  values: string;
};

const AICareerQuiz: React.FC = () => {
  const { currentUser } = useAuth();
  const user = currentUser; // Alias for compatibility
  const { analyzeQuizResponses, result, loading, error } = useAIAnalysis();
  const [step, setStep] = useState<'form' | 'result'>('form');
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const responses = [
        { question: 'Full Name', answer: data.fullName },
        { question: 'Age', answer: data.age },
        { question: 'Current Education Level', answer: data.educationLevel },
        { question: 'Current Interests', answer: data.currentInterests },
        { question: 'Skills and Strengths', answer: data.skills },
        { question: 'Career Goals', answer: data.careerGoals },
        { question: 'Preferred Work Environment', answer: data.workEnvironment },
        { question: 'Learning Style', answer: data.learningStyle },
        { question: 'Challenges', answer: data.challenges },
        { question: 'Values', answer: data.values },
      ];

      const profile = {
        name: data.fullName,
        age: parseInt(data.age) || 0,
        educationLevel: data.educationLevel,
        interests: data.currentInterests.split(',').map(i => i.trim()).filter(Boolean),
        skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
      };

      await analyzeQuizResponses(responses, profile);
      setStep('result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const resetForm = () => {
    setStep('form');
  };

  if (step === 'result' && (result || loading || error)) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Button 
          onClick={resetForm}
          variant="ghost" 
          className="mb-6"
        >
          ← Back to form
        </Button>
        <AIAnalysisResult 
          result={result}
          loading={loading}
          error={error}
          onRetry={resetForm}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">AI-Powered Career Assessment</CardTitle>
          <CardDescription>
            Answer these questions to receive personalized career path recommendations powered by AI.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="10"
                  max="100"
                  placeholder="25"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 10, message: 'Age must be at least 10' },
                    max: { value: 100, message: 'Age must be less than 100' }
                  })}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationLevel">Current Education Level</Label>
              <select
                id="educationLevel"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('educationLevel', { required: 'Education level is required' })}
              >
                <option value="">Select your education level</option>
                <option value="high_school">High School</option>
                <option value="some_college">Some College</option>
                <option value="associates">Associate's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D. or Higher</option>
              </select>
              {errors.educationLevel && (
                <p className="text-sm text-destructive">{errors.educationLevel.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interests & Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentInterests">What are your main interests? (comma separated)</Label>
              <Input
                id="currentInterests"
                placeholder="e.g., technology, healthcare, design, business"
                {...register('currentInterests', { required: 'Please list your interests' })}
              />
              {errors.currentInterests && (
                <p className="text-sm text-destructive">{errors.currentInterests.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">What are your key skills and strengths? (comma separated)</Label>
              <Input
                id="skills"
                placeholder="e.g., programming, communication, problem solving"
                {...register('skills', { required: 'Please list your skills' })}
              />
              {errors.skills && (
                <p className="text-sm text-destructive">{errors.skills.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Goals & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="careerGoals">What are your career goals?</Label>
              <Textarea
                id="careerGoals"
                placeholder="Describe your short-term and long-term career goals..."
                rows={3}
                {...register('careerGoals', { required: 'Please describe your career goals' })}
              />
              {errors.careerGoals && (
                <p className="text-sm text-destructive">{errors.careerGoals.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEnvironment">What kind of work environment do you prefer?</Label>
              <Textarea
                id="workEnvironment"
                placeholder="e.g., office, remote, hands-on, collaborative, independent..."
                rows={2}
                {...register('workEnvironment')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningStyle">How do you learn best?</Label>
              <Textarea
                id="learningStyle"
                placeholder="e.g., hands-on, visual, reading, mentoring..."
                rows={2}
                {...register('learningStyle')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">What challenges are you facing in your career decisions?</Label>
              <Textarea
                id="challenges"
                placeholder="Describe any challenges or concerns..."
                rows={2}
                {...register('challenges')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="values">What values are most important to you in a career?</Label>
              <Input
                id="values"
                placeholder="e.g., work-life balance, high salary, helping others, creativity..."
                {...register('values')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Analyzing...' : 'Get Career Recommendations'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AICareerQuiz;
