
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptInput from '@/components/PromptInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Share2, Link } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from '@/utils/supabaseStorage';
import { supabase } from '@/integrations/supabase/client';

const Generate = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to get a random image from Supabase storage
  const getRandomImage = async () => {
    setIsLoading(true);
    try {
      // List all files in the images bucket
      const { data: storageData, error: storageError } = await supabase.storage
        .from('images')
        .list();
        
      if (storageError) {
        console.error('Error fetching storage images:', storageError);
        toast.error("Error loading images");
        return;
      }
      
      if (!storageData || storageData.length === 0) {
        toast.error("No images found. Please seed some images first.");
        return;
      }
      
      // Select a random image
      const randomImage = storageData[Math.floor(Math.random() * storageData.length)];
      if (randomImage && !randomImage.id.endsWith('/')) {
        // Get the public URL for the image
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(randomImage.name);
          
        setGeneratedImage(data.publicUrl);
      } else {
        toast.error("Could not find a valid image");
      }
    } catch (error) {
      console.error('Error getting random image:', error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  // If no generated image, fetch one on component mount
  useState(() => {
    if (!generatedImage) {
      getRandomImage();
    }
  });
  
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started");
    }
  };
  
  const handleCopyLink = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
      toast.success("Image link copied to clipboard");
    }
  };
  
  const handleShare = () => {
    if (generatedImage) {
      if (navigator.share) {
        navigator.share({
          title: 'My Generated Image',
          text: 'Check out this AI-generated image!',
          url: generatedImage,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.error('Error sharing:', error));
      } else {
        handleCopyLink();
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-8">Create Image</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="text-to-image">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
                <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text-to-image" className="pt-6">
                <PromptInput onGenerate={getRandomImage} />
              </TabsContent>
              
              <TabsContent value="image-to-image" className="pt-6">
                <PromptInput onGenerate={getRandomImage} />
              </TabsContent>
            </Tabs>
            
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-medium mb-2">Tips for Better Results</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Be specific and descriptive with your prompts</li>
                <li>Include art styles like "oil painting", "digital art", etc.</li>
                <li>Specify lighting details like "sunset", "studio lighting"</li>
                <li>Add quality terms like "detailed", "high resolution", "8K"</li>
                <li>Use negative prompts to avoid unwanted elements</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg border bg-card min-h-[512px] flex items-center justify-center overflow-hidden">
              {isLoading ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-2">Generating image...</p>
                  <div className="w-16 h-16 border-4 border-muted rounded-full border-t-primary animate-spin mx-auto"></div>
                </div>
              ) : generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated image" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-2">Your generated image will appear here</p>
                  <Button onClick={getRandomImage} variant="outline">Load Sample Image</Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={!generatedImage}
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  disabled={!generatedImage}
                  className="flex items-center gap-2"
                  onClick={handleCopyLink}
                >
                  <Link className="h-4 w-4" />
                  Copy Link
                </Button>
                <Button 
                  variant="outline"
                  disabled={!generatedImage}
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Generate;
