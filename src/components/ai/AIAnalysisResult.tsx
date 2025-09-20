import React from 'react';
import { Loader2, AlertCircle, CheckCircle, Lightbulb, GraduationCap, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface AIAnalysisResultProps {
  result: {
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
  } | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const AIAnalysisResult: React.FC<AIAnalysisResultProps> = ({
  result,
  loading,
  error,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Analyzing your responses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h3 className="text-xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle>Analysis of Your Responses</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">{result.analysis}</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Recommended Career Paths
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.careerPaths.map((career, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{career.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {career.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Why It's a Good Fit
                  </h4>
                  <p className="text-sm text-muted-foreground">{career.reasoning}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                    Education Path
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {career.educationPath.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />
                      Growth
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {career.growthPotential} potential
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                      Salary Range
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {career.salaryRange.entry} - {career.salaryRange.senior}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-1">Key Skills to Develop</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
