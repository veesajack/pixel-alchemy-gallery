
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Image, ChevronDown, Settings } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from '@/utils/supabaseStorage';

interface PromptInputProps {
  onGenerate?: () => void;
}

const PromptInput = ({ onGenerate }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  
  // Advanced settings
  const [model, setModel] = useState('v2');
  const [steps, setSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [resolution, setResolution] = useState('512x512');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // If we have an image to upload, upload it to Supabase
      if (imageUpload) {
        const uploadedUrl = await uploadImage(imageUpload);
        if (uploadedUrl) {
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Failed to upload image");
        }
      }
      
      // Call the onGenerate callback if provided
      if (onGenerate) {
        onGenerate();
      } else {
        // Mock image generation - in a real app, this would be an API call
        setTimeout(() => {
          console.log('Generated image with prompt:', prompt);
          console.log('Settings:', { model, steps, guidanceScale, resolution });
          toast.success("Image generated successfully");
          setIsGenerating(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error during generation:', error);
      toast.error("Error generating image");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageUpload(file);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-lg border bg-card shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Describe what you want to see</Label>
          <Textarea
            id="prompt"
            placeholder="A majestic castle on a floating island in the clouds, fantasy art, vibrant colors, detailed, 8k..."
            className="h-24 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-[150px]">
            <Button 
              type="button" 
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Image className="w-4 h-4" />
              Upload Image
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          
          {imageUpload && (
            <div className="text-sm text-muted-foreground">
              {imageUpload.name}
            </div>
          )}
        </div>
        
        <Collapsible
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          className="w-full space-y-4"
        >
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 px-0"
              >
                <Settings className="h-4 w-4" />
                Advanced Settings
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    advancedOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1">Stable Diffusion v1.5</SelectItem>
                    <SelectItem value="v2">Stable Diffusion v2.1</SelectItem>
                    <SelectItem value="sdxl">Stable Diffusion XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512x512">512x512</SelectItem>
                    <SelectItem value="768x768">768x768</SelectItem>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
                    <SelectItem value="512x768">512x768 (Portrait)</SelectItem>
                    <SelectItem value="768x512">768x512 (Landscape)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="steps">Sampling Steps: {steps}</Label>
              </div>
              <Slider
                id="steps"
                min={10}
                max={150}
                step={1}
                value={[steps]}
                onValueChange={(value) => setSteps(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="guidance">Guidance Scale: {guidanceScale}</Label>
              </div>
              <Slider
                id="guidance"
                min={1}
                max={20}
                step={0.1}
                value={[guidanceScale]}
                onValueChange={(value) => setGuidanceScale(value[0])}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Button 
          type="submit" 
          className="w-full sm:w-auto bg-ai-primary hover:bg-ai-dark text-white"
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? (
            <>
              <svg className="loader mr-2 h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </>
          ) : "Generate Image"}
        </Button>
      </form>
    </div>
  );
};

export default PromptInput;
