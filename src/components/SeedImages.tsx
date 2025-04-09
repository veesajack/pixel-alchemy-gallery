
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { seedSampleImages } from "@/utils/supabaseStorage";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SeedImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const handleSeedImages = async () => {
    setIsLoading(true);
    setErrorCount(0);
    
    // Create a toast ID to update the same toast
    const toastId = toast.loading("Initializing image upload...");
    
    try {
      // Check Supabase connection before proceeding
      const { data: healthCheck, error: healthError } = await supabase.from('images').select('count').limit(1);
      
      if (healthError) {
        console.error("Supabase connection error:", healthError);
        toast.error("Cannot connect to Supabase. Please check your connection.", { id: toastId });
        setIsLoading(false);
        return;
      }
      
      toast.loading("Uploading sample images... This might take a moment.", { id: toastId });
      console.log("Starting to upload sample images...");
      
      const urls = await seedSampleImages();
      
      if (urls.length > 0) {
        toast.success(`Successfully uploaded ${urls.length} sample images. Refresh the gallery to see them!`, { id: toastId });
        console.log("Successfully uploaded images:", urls);
      } else {
        toast.error("Failed to upload any sample images. Please see console for details.", { id: toastId });
        console.error("No images were successfully uploaded");
      }
    } catch (error) {
      console.error("Error seeding images:", error);
      toast.error("Error uploading images. See console for details.", { id: toastId });
      setErrorCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedImages} 
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading Images...
        </>
      ) : errorCount > 0 ? (
        <>
          <AlertCircle className="h-4 w-4 text-red-500" />
          Retry Seed Images
        </>
      ) : (
        'Seed Sample Images'
      )}
    </Button>
  );
};

export default SeedImages;
