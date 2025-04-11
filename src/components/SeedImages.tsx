
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { seedSampleImages } from "@/utils/supabaseStorage";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SeedImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSeedImages = async () => {
    setIsLoading(true);
    setErrorCount(0);
    setIsSuccess(false);
    
    // Create a toast ID to update the same toast
    const toastId = toast.loading("Initializing image upload...");
    
    try {
      // Check Supabase connection before proceeding
      const { error: healthError } = await supabase.from('images').select('count').limit(1);
      
      if (healthError) {
        console.error("Supabase connection error:", healthError);
        toast.error("Cannot connect to Supabase. Using demo images instead.", { id: toastId });
        setIsLoading(false);
        return;
      }
      
      toast.loading("Setting up sample images... This might take a moment.", { id: toastId });
      console.log("Starting to use sample images...");
      
      const urls = await seedSampleImages();
      
      if (urls.length > 0) {
        setIsSuccess(true);
        toast.success(`Successfully added ${urls.length} sample images. Refresh the gallery to see them!`, { id: toastId });
        console.log("Successfully added sample images:", urls);
      } else {
        toast.error("Failed to add any sample images. Please try again.", { id: toastId });
        console.error("No images were successfully added");
        setErrorCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error seeding images:", error);
      toast.error("Error adding images. Please try again.", { id: toastId });
      setErrorCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedImages} 
      disabled={isLoading}
      variant={isSuccess ? "default" : "outline"}
      className={`flex items-center gap-2 ${isSuccess ? "bg-green-500 hover:bg-green-600" : ""}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Setting Up Images...
        </>
      ) : isSuccess ? (
        <>
          <span className="h-4 w-4 rounded-full bg-green-200 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Images Added
        </>
      ) : errorCount > 0 ? (
        <>
          <AlertCircle className="h-4 w-4 text-red-500" />
          Retry Adding Images
        </>
      ) : (
        'Add Sample Images'
      )}
    </Button>
  );
};

export default SeedImages;
