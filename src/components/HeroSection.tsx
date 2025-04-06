
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-20 lg:py-28 bg-hero-pattern">
      <div className="container flex flex-col items-center text-center gap-4 md:gap-8">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-ai-primary via-ai-accent to-ai-secondary animate-gradient-shift max-w-3xl">
          Transform Your Imagination Into Stunning Visuals
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-[42rem]">
          Create beautiful, unique images with our cutting-edge AI. Turn your ideas into art with just a text prompt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md">
          <Button 
            size="lg" 
            className="bg-ai-primary hover:bg-ai-dark text-white w-full sm:w-auto"
            asChild
          >
            <Link to="/generate">Start Creating <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <Link to="/gallery">Explore Gallery</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Feature 1 */}
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="rounded-full bg-ai-light p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ai-primary"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8C10.3 8.4 8.4 10.3 7.8 16.2"/><path d="M7.8 7.8V7.8"/><path d="M16.2 16.2V16.2"/></svg>
            </div>
            <h3 className="text-xl font-semibold">Text-to-Image</h3>
            <p className="text-sm text-muted-foreground">
              Transform your text descriptions into stunning visuals with our AI.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="rounded-full bg-ai-light p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ai-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <h3 className="text-xl font-semibold">Image-to-Image</h3>
            <p className="text-sm text-muted-foreground">
              Upload an image and transform it with your creative directions.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="rounded-full bg-ai-light p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ai-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></svg>
            </div>
            <h3 className="text-xl font-semibold">Style Control</h3>
            <p className="text-sm text-muted-foreground">
              Fine-tune your creations with adjustable style parameters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
