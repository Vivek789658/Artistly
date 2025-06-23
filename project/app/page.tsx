"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/category-card';
import { Music, Users, Mic, Zap, ArrowRight, Star, Shield, Clock } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const categories = [
    {
      title: 'Singers & Vocalists',
      description: 'Professional singers for weddings, events, and performances',
      icon: Mic,
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      filter: 'Singer'
    },
    {
      title: 'DJs & Music Producers',
      description: 'Electronic music experts for clubs, parties, and festivals',
      icon: Music,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      filter: 'DJ'
    },
    {
      title: 'Dancers & Choreographers',
      description: 'Talented dancers for shows, events, and performances',
      icon: Users,
      color: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      filter: 'Dancer'
    },
    {
      title: 'Speakers & Coaches',
      description: 'Motivational speakers and professional coaches',
      icon: Zap,
      color: 'bg-gradient-to-br from-orange-500 to-amber-500',
      filter: 'Speaker'
    }
  ];

  const features = [
    {
      icon: Star,
      title: 'Verified Artists',
      description: 'All artists are professionally vetted and verified'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Safe and secure payment processing for all bookings'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get quotes and responses within 24 hours'
    }
  ];

  const handleCategoryClick = (filter: string) => {
    router.push(`/artists?category=${filter}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Amazing{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Performers
            </span>
            <br />
            For Your Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with talented singers, dancers, DJs, speakers, and more. 
            Find the perfect artist for your wedding, corporate event, or special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => router.push('/artists')}
            >
              Explore Artists
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={() => router.push('/onboard')}
            >
              Join as Artist
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Artists by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our diverse collection of talented performers across different categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                color={category.color}
                onClick={() => handleCategoryClick(category.filter)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Artistly?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book the perfect performers for your events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Next Event?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of event planners who trust Artistly to find amazing performers
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-3"
              onClick={() => router.push('/artists')}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}