import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        if (formData.email === 'test@example.com' && formData.password === 'password123') {
          toast({
            title: "Login Successful",
            description: "Welcome back to FemNest!",
          });
          onSuccess?.();
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account Created",
          description: "Your FemNest account has been created successfully!",
        });
        onSuccess?.();
      }
      setIsLoading(false);
    }, 1500);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearErrors();
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-foreground">
          {isLogin ? 'Welcome Back' : 'Join FemNest'}
        </CardTitle>
        <p className="text-muted-foreground">
          {isLogin ? 'Sign in to your account' : 'Create your account today'}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Toggle Buttons */}
        <div className="flex bg-magenta-dark rounded-lg p-1">
          <Button
            type="button"
            variant="toggle"
            className="flex-1 rounded-md"
            data-active={isLogin}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="toggle"
            className="flex-1 rounded-md"
            data-active={!isLogin}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`transition-all duration-200 ${errors.email ? 'border-destructive' : 'focus:border-magenta focus:ring-magenta/20'}`}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`transition-all duration-200 ${errors.password ? 'border-destructive' : 'focus:border-magenta focus:ring-magenta/20'}`}
              required
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`transition-all duration-200 ${errors.confirmPassword ? 'border-destructive' : 'focus:border-magenta focus:ring-magenta/20'}`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center">
          <button
            type="button"
            onClick={switchMode}
            className="text-sm text-muted-foreground hover:text-magenta transition-colors duration-200"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
};