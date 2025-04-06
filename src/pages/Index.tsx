
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Image Generation Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-bold">Start Creating</h2>
              <p className="text-muted-foreground text-lg max-w-[42rem] mx-auto">
                Type a prompt below to generate your first AI image. Be descriptive for best results!
              </p>
            </div>
            
            <PromptInput />
          </div>
        </section>
        
        {/* Gallery Preview Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-bold">Community Showcase</h2>
              <p className="text-muted-foreground text-lg max-w-[42rem] mx-auto">
                Explore creations from our community and get inspired by what others are making.
              </p>
            </div>
            
            <ImageGallery />
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link to="/gallery">View Full Gallery</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-ai-primary text-white">
          <div className="container text-center space-y-6">
            <h2 className="font-bold text-white">Ready to Transform Your Ideas Into Art?</h2>
            <p className="text-lg max-w-[42rem] mx-auto text-white/90">
              Join thousands of creators who are already using our platform to bring their imagination to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-white text-ai-primary hover:bg-white/90"
                asChild
              >
                <Link to="/generate">Start Creating</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/register">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
