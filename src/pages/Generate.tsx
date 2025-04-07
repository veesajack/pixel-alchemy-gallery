
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptInput from '@/components/PromptInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Share2, Link } from "lucide-react";

const Generate = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>("https://images.unsplash.com/photo-1698498570187-af92256d7984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  
  // In a real app, this would be connected to the PromptInput component
  // through a context or state management like Redux
  
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
                <PromptInput />
              </TabsContent>
              
              <TabsContent value="image-to-image" className="pt-6">
                <PromptInput />
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
              {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated image" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-2">Your generated image will appear here</p>
                  <div className="w-16 h-16 border-4 border-muted rounded-full border-t-primary animate-spin mx-auto"></div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={!generatedImage}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  disabled={!generatedImage}
                  className="flex items-center gap-2"
                >
                  <Link className="h-4 w-4" />
                  Copy Link
                </Button>
                <Button 
                  variant="outline"
                  disabled={!generatedImage}
                  className="flex items-center gap-2"
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
