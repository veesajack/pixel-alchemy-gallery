
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your <span className="n8n-gradient-text">Imagination</span> Into Reality
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create stunning AI-generated images with just a text prompt. Our powerful platform enables designers, creators, and businesses to bring their ideas to life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="n8n-btn n8n-btn-primary h-12 px-8 text-base" asChild>
                <Link to="/generate">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="n8n-btn n8n-btn-secondary h-12 px-8 text-base" asChild>
                <Link to="/gallery">View Gallery</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                />
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/men/13.jpg"
                />
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/women/42.jpg"
                />
              </div>
              <div className="text-gray-500">
                Trusted by <span className="font-medium text-gray-900">10,000+</span> creators worldwide
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl bg-muted/30 p-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1673158675083-d43f4e229fd5" 
                  alt="AI generated art example" 
                  className="object-cover rounded-xl shadow-lg animate-float"
                />
                <img 
                  src="https://images.unsplash.com/photo-1698161236987-e66ad191a502" 
                  alt="AI generated art example" 
                  className="absolute top-10 right-10 w-48 h-48 object-cover rounded-lg shadow-lg animate-float delay-200"
                />
                <img 
                  src="https://images.unsplash.com/photo-1669447894158-80ca24f67d2b" 
                  alt="AI generated art example" 
                  className="absolute bottom-10 left-10 w-48 h-48 object-cover rounded-lg shadow-lg animate-float delay-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
