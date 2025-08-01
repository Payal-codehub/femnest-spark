import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import femnestLogo from "@/assets/femnest-logo.png";
import femnestBackground from "@/assets/femnest-background.jpg";

const PersonalInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Basic validation
    const name = data.fullName as string;
    if (!/^[A-Za-z\s]+$/.test(name) || name.length < 2) {
      toast({
        variant: "destructive",
        title: "Invalid Name",
        description: "Enter a valid name (letters and spaces only, minimum 2 characters).",
      });
      setIsLoading(false);
      return;
    }

    const contact = data.contact as string;
    if (contact && !/^[0-9]{10,14}$/.test(contact)) {
      toast({
        variant: "destructive",
        title: "Invalid Contact",
        description: "Enter a valid contact number (10 to 14 digits).",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Success!",
      description: "Personal details saved successfully!",
    });

    setIsLoading(false);
    // Navigate to next step or dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${femnestBackground})` }}
      />
      <div className="fixed inset-0 bg-magenta/30 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-elegant">
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src={femnestLogo} 
              alt="FemNest Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-magenta-dark mb-2">
              Personal Information
            </h1>
            <p className="text-muted-foreground">
              Your details help us find compatible roommates for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-magenta border-l-4 border-magenta pl-3">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input 
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input 
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="e.g., 9876543210"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@mail.com"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Current City *</Label>
                <Input 
                  id="city"
                  name="city"
                  placeholder="City of residence"
                  required
                  className="focus:border-magenta focus:ring-magenta"
                />
              </div>
            </div>

            {/* About You Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-magenta border-l-4 border-magenta pl-3">
                About You
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input 
                    id="occupation"
                    name="occupation"
                    placeholder="e.g., IT Professional, Student"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org">College/Workplace</Label>
                  <Input 
                    id="org"
                    name="org"
                    placeholder="e.g., Amity Univ, TCS"
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutMe">Describe Yourself (max 220 chars)</Label>
                <Textarea 
                  id="aboutMe"
                  name="aboutMe"
                  placeholder="E.g., love plants, early riser, neat—I'm sociable but value alone time!"
                  maxLength={220}
                  className="focus:border-magenta focus:ring-magenta"
                />
              </div>
            </div>

            {/* Lifestyle & Preferences Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-magenta border-l-4 border-magenta pl-3">
                Lifestyle & Preferences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smoke">Smoking Habit *</Label>
                  <Select name="smoke" required>
                    <SelectTrigger className="focus:border-magenta focus:ring-magenta">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Sometimes">Sometimes</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drink">Drinking Habit *</Label>
                  <Select name="drink" required>
                    <SelectTrigger className="focus:border-magenta focus:ring-magenta">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Sometimes">Sometimes</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="food">Food Preference *</Label>
                  <Select name="food" required>
                    <SelectTrigger className="focus:border-magenta focus:ring-magenta">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Veg">Vegetarian</SelectItem>
                      <SelectItem value="Non-Veg">Non-Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pets">Comfortable with Pets? *</Label>
                  <Select name="pets" required>
                    <SelectTrigger className="focus:border-magenta focus:ring-magenta">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Ok with small pets">Ok with small pets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wakeUp">Usual Wake-up Time *</Label>
                  <Input 
                    id="wakeUp"
                    name="wakeUp"
                    type="time"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep">Usual Sleep Time *</Label>
                  <Input 
                    id="sleep"
                    name="sleep"
                    type="time"
                    required
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Allow Guests at Home? *</Label>
                  <Select name="guests" required>
                    <SelectTrigger className="focus:border-magenta focus:ring-magenta">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Sometimes">Sometimes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbies">Hobbies/Interests</Label>
                  <Input 
                    id="hobbies"
                    name="hobbies"
                    placeholder="e.g., music, cooking, running"
                    className="focus:border-magenta focus:ring-magenta"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                variant="hero"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Saving..." : "Save & Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;