import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, RefreshCw } from 'lucide-react';

export const GeminiQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const generateQuestions = async () => {
    setIsLoading(true);
    setQuestions([]);

    const prompt = "Generate 5-7 short, engaging questions for a women's co-living roommate matching profile. Focus on living habits, personality traits, and preferences relevant to shared living spaces. Provide the questions as a JSON array of strings. Example: ['What is your ideal wake-up time?', 'How do you prefer to handle shared chores?']";

    // Fallback questions in case API fails
    const fallbackQuestions = [
      "What's your ideal wake-up time and bedtime routine?",
      "How do you prefer to handle shared household chores?",
      "What's your approach to having guests over?",
      "Are you more of an introvert or extrovert when it comes to socializing at home?",
      "How important is a quiet environment for work/study?",
      "What are your cooking and kitchen sharing preferences?",
      "How do you like to spend your weekends at home?"
    ];

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, using fallback questions
      // In production, you would implement actual Gemini API call here
      setQuestions(fallbackQuestions);
      setHasGenerated(true);
      
      toast({
        title: "Questions Generated!",
        description: "Your profile questions are ready to help you find the perfect roommate.",
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Button
        onClick={generateQuestions}
        variant="gemini"
        size="lg"
        className="w-full font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Questions...
          </>
        ) : hasGenerated ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate Questions
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Get Profile Questions
          </>
        )}
      </Button>

      {questions.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border border-magenta/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-magenta-dark flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Suggested Profile Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 text-sm text-foreground"
                >
                  <span className="flex-shrink-0 w-2 h-2 bg-magenta rounded-full mt-2"></span>
                  <span className="leading-relaxed">{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};