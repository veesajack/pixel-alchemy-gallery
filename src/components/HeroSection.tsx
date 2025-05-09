import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
const HeroSection = () => {
  const [heroImage, setHeroImage] = useState('');
  const [sideImage1, setSideImage1] = useState('');
  const [sideImage2, setSideImage2] = useState('');

  // Fetch images from Supabase storage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // List all files in the 'images' bucket
        const {
          data: storageData,
          error: storageError
        } = await supabase.storage.from('images').list();
        if (storageError || !storageData || storageData.length === 0) {
          // Fallback to unsplash images if no images are found
          setHeroImage('https://images.unsplash.com/photo-1581781418937-22b24a3a7b32');
          setSideImage1('https://images.unsplash.com/photo-1607870383055-03d90bb09f95');
          setSideImage2('https://images.unsplash.com/photo-1505663912695-implicit-bdd04');
          return;
        }

        // Get public URLs for three random images
        const filteredImages = storageData.filter(item => !item.id.endsWith('/'));
        if (filteredImages.length >= 3) {
          const randomIndexes = getRandomIndexes(filteredImages.length, 3);
          const {
            data: heroData
          } = supabase.storage.from('images').getPublicUrl(filteredImages[randomIndexes[0]].name);
          const {
            data: side1Data
          } = supabase.storage.from('images').getPublicUrl(filteredImages[randomIndexes[1]].name);
          const {
            data: side2Data
          } = supabase.storage.from('images').getPublicUrl(filteredImages[randomIndexes[2]].name);
          setHeroImage(heroData.publicUrl);
          setSideImage1(side1Data.publicUrl);
          setSideImage2(side2Data.publicUrl);
        } else {
          // Fallback to unsplash images if not enough images are found
          setHeroImage('https://images.unsplash.com/photo-1581781418937-22b24a3a7b32');
          setSideImage1('https://images.unsplash.com/photo-1607870383055-03d90bb09f95');
          setSideImage2('https://images.unsplash.com/photo-1505663912695-implicit-bdd04');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback to unsplash images on error
        setHeroImage('https://images.unsplash.com/photo-1581781418937-22b24a3a7b32');
        setSideImage1('https://images.unsplash.com/photo-1607870383055-03d90bb09f95');
        setSideImage2('https://images.unsplash.com/photo-1505663912695-implicit-bdd04');
      }
    };
    fetchImages();
  }, []);

  // Helper function to get random indexes
  const getRandomIndexes = (max: number, count: number) => {
    const indexes: number[] = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };
  return <section className="w-full py-24 md:py-32 lg:py-40 bg-hero-gradient overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <h1 className="gradient-text text-5xl md:text-7xl font-bold">
              Transform Your Imagination Into Reality
            </h1>
            <p className="text-white/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Create stunning AI-generated images with just a text prompt. Our powerful platform enables designers, creators, and businesses to bring their ideas to life.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="luma-btn luma-btn-primary h-14 px-8 text-lg" asChild>
              <Link to="/generate">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="luma-btn luma-btn-outline h-14 px-8 text-lg" asChild>
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-3 text-sm text-white/60">
            <div className="flex -space-x-2">
              <img alt="User" className="h-8 w-8 rounded-full border-2 border-ai-dark" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <img alt="User" className="h-8 w-8 rounded-full border-2 border-ai-dark" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <img alt="User" className="h-8 w-8 rounded-full border-2 border-ai-dark" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
            <div>
              Trusted by <span className="font-medium text-white">10,000+</span> creators worldwide
            </div>
          </div>
        </div>
        
        <div className="mt-20 max-w-6xl mx-auto relative">
          <div className="relative aspect-[16/9] glass p-2 md:p-4 rounded-4xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={heroImage || 'https://images.unsplash.com/photo-1581781418937-22b24a3a7b32'} alt="AI generated art example" className="w-full h-full rounded-3xl object-fill" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-ai-primary/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-ai-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          </div>
          
          <div className="absolute -top-8 left-1/4 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 glass rounded-2xl p-2 shadow-xl animate-float">
            <img src={sideImage1 || 'https://images.unsplash.com/photo-1607870383055-03d90bb09f95'} alt="AI generated art example" className="w-full h-full rounded-xl object-fill" />
          </div>
          
          <div className="absolute -bottom-10 right-1/4 transform translate-x-1/2 w-32 h-32 md:w-40 md:h-40 glass rounded-2xl p-2 shadow-xl animate-float" style={{
          animationDelay: "1s"
        }}>
            <img src={sideImage2 || 'https://images.unsplash.com/photo-1505663912695-implicit-bdd04'} alt="AI generated art example" className="w-full h-full rounded-xl object-fill" />
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-ai-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-ai-accent/10 rounded-full filter blur-3xl"></div>
    </section>;
};
export default HeroSection;