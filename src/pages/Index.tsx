import React, { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { GeminiQuestions } from '@/components/GeminiQuestions';
import backgroundImage from '@/assets/femnest-background.jpg';
import logoImage from '@/assets/femnest-logo.png';

const Index = () => {
  const [showQuestions, setShowQuestions] = useState(false);

  const handleAuthSuccess = () => {
    setShowQuestions(true);
  };

  return (
    <div className="min-h-screen font-poppins relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-magenta/30" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src={logoImage} 
              alt="FemNest Logo" 
              className="h-20 w-auto mx-auto mb-4 drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              FemNest
            </h1>
            <p className="text-white/90 mt-2 drop-shadow">
              Where Women Thrive Together
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm onSuccess={handleAuthSuccess} />

          {/* Questions Section */}
          {showQuestions && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <GeminiQuestions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
