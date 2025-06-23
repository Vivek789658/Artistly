"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  category: z.array(z.string()).min(1, 'Please select at least one category'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  feeRange: z.string().min(1, 'Please select a fee range'),
  location: z.string().min(2, 'Location is required'),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  'Singer', 'Vocalist', 'DJ', 'Music Producer', 'Dancer', 'Choreographer',
  'Speaker', 'Motivational Coach', 'Guitarist', 'Pianist', 'Drummer',
  'Violinist', 'Comedian', 'Magician', 'Performance Artist', 'Tabla Player',
  'Classical Vocalist', 'Musician'
];

const languages = [
  'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
  'Bengali', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia',
  'Assamese', 'Rajasthani', 'Bhojpuri', 'Haryanvi'
];

const feeRanges = [
  '₹10,000-20,000', '₹15,000-30,000', '₹20,000-40,000', '₹25,000-50,000', 
  '₹30,000-60,000', '₹35,000-75,000', '₹40,000-1,00,000', '₹50,000-1,50,000', '₹1,00,000+'
];

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: [],
      languages: [],
    }
  });

  const watchedValues = watch();

  const handleCategoryChange = (category: string, checked: boolean) => {
    const current = watchedValues.category || [];
    if (checked) {
      setValue('category', [...current, category]);
    } else {
      setValue('category', current.filter(c => c !== category));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const current = watchedValues.languages || [];
    if (checked) {
      setValue('languages', [...current, language]);
    } else {
      setValue('languages', current.filter(l => l !== language));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'bio'];
        break;
      case 2:
        fieldsToValidate = ['category'];
        break;
      case 3:
        fieldsToValidate = ['languages', 'feeRange', 'location'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form Data:', data);
    console.log('Profile Image:', profileImage);
    
    toast.success('Application submitted successfully!', {
      description: 'We will review your application and get back to you within 2-3 business days.'
    });
    
    setIsSubmitting(false);
    setCurrentStep(5); // Success step
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  if (currentStep === 5) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for joining Artistly. We'll review your application and get back to you within 2-3 business days.
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join as an Artist
          </h1>
          <p className="text-lg text-gray-600">
            Share your talent with the world and connect with event planners
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    placeholder="Tell us about yourself, your experience, and what makes you unique as a performer..."
                    rows={6}
                  />
                  <p className="text-sm text-gray-500">
                    Minimum 50 characters ({watchedValues.bio?.length || 0}/50)
                  </p>
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Categories */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Categories & Specializations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Select your categories (check all that apply) *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={watchedValues.category?.includes(category) || false}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <Label htmlFor={category} className="text-sm font-normal">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Languages & Pricing */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Languages & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Languages Spoken *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={watchedValues.languages?.includes(language) || false}
                          onCheckedChange={(checked) => 
                            handleLanguageChange(language, checked as boolean)
                          }
                        />
                        <Label htmlFor={language} className="text-sm font-normal">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.languages && (
                    <p className="text-sm text-red-500">{errors.languages.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feeRange">Fee Range *</Label>
                  <Select onValueChange={(value) => setValue('feeRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fee range" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.feeRange && (
                    <p className="text-sm text-red-500">{errors.feeRange.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="City, State"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Profile Image */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Image (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="profileImage">Upload Profile Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      PNG, JPG up to 10MB
                    </p>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('profileImage')?.click()}
                    >
                      Choose File
                    </Button>
                    {profileImage && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {profileImage.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}