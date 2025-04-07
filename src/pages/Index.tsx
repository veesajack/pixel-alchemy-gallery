
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PromptInput from '@/components/PromptInput';
import ImageGallery from '@/components/ImageGallery';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Lock } from 'lucide-react';

const Index = () => {
  // This is just a placeholder for the demo gallery on the homepage
  const [demoImages] = useState([
    {
      id: 'demo1',
      url: 'https://images.unsplash.com/photo-1698498570187-af92256d7984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prompt: 'Futuristic city with flying cars',
      likes: 42,
      user: 'creativeminds',
      isLiked: false
    },
    {
      id: 'demo2',
      url: 'https://images.unsplash.com/photo-1675703868369-7cc625a36cd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prompt: 'Space station orbiting Earth',
      likes: 28,
      user: 'stargazer',
      isLiked: false
    },
    {
      id: 'demo3',
      url: 'https://images.unsplash.com/photo-1700096459296-a0f8df31fadb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prompt: 'Underwater civilization',
      likes: 35,
      user: 'oceanlover',
      isLiked: false
    }
  ]);

  // Dummy function for demo purposes
  const handleToggleLike = (id: string) => {
    console.log(`Toggle like for image ${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Logos Section */}
        <section className="w-full py-8 bg-gray-50 border-y border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm">TRUSTED BY CREATORS AROUND THE WORLD</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Client logo" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Client logo" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Client logo" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Adobe_Systems_logo_and_wordmark.svg" alt="Client logo" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Client logo" className="h-8 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Client logo" className="h-8 w-auto" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Try It Section */}
        <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="container px-4 md:px-6 space-y-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
                Try It Now
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Creating</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Type a prompt below to generate your first AI image. Be descriptive for best results!
              </p>
            </div>
            
            <div className="w-full max-w-3xl mx-auto">
              <PromptInput />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple 3-Step Process</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Creating stunning AI art has never been easier.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ai-primary text-white font-bold text-xl mb-6">1</div>
                <h3 className="text-xl font-bold mb-2">Enter Your Prompt</h3>
                <p className="text-gray-500">Describe what you want to create in detail. The more specific, the better the results.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ai-primary text-white font-bold text-xl mb-6">2</div>
                <h3 className="text-xl font-bold mb-2">Customize Settings</h3>
                <p className="text-gray-500">Adjust parameters like style, resolution, and more to get exactly what you're looking for.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ai-primary text-white font-bold text-xl mb-6">3</div>
                <h3 className="text-xl font-bold mb-2">Generate & Share</h3>
                <p className="text-gray-500">Generate your image, download it, share it with the community, or keep iterating!</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Preview Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
                Showcase
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Community Gallery</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore creations from our community and get inspired by what others are making.
              </p>
            </div>
            
            <ImageGallery 
              images={demoImages}
              onToggleLike={handleToggleLike}
              isLoading={false}
              activeTab="trending"
              onTabChange={() => {}}
            />
            
            <div className="text-center mt-8">
              <Button size="lg" className="h-12 px-8 bg-ai-primary hover:bg-ai-primary/90 text-white" asChild>
                <Link to="/gallery">
                  View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Why Choose Us Section */}
        <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Pixel Alchemy Advantage</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                What sets our platform apart from other AI image generators.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center p-6 n8n-card">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                  <Sparkles className="h-6 w-6 text-ai-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Superior Quality</h3>
                <p className="text-gray-500">Our optimized models produce higher quality results with better composition and details.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 n8n-card">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                  <Zap className="h-6 w-6 text-ai-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-500">Generate images in seconds rather than minutes with our optimized infrastructure.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 n8n-card">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                  <Lock className="h-6 w-6 text-ai-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-gray-500">Your prompts and images remain private and secure, with control over what you share.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-ai-primary">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">Ready to Transform Your Ideas Into Art?</h2>
              <p className="text-xl text-white/90 md:text-2xl">
                Join thousands of creators who are already using our platform to bring their imagination to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 bg-white text-ai-primary hover:bg-white/90 text-lg font-medium"
                  asChild
                >
                  <Link to="/generate">
                    Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 border-white text-white hover:bg-white/10 text-lg font-medium"
                  asChild
                >
                  <Link to="/register">Sign Up Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
