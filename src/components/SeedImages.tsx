
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { seedSampleImages } from "@/utils/supabaseStorage";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SeedImages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeedImages = async () => {
    setIsLoading(true);
    toast.info("Starting to upload sample images...");
    
    try {
      const urls = await seedSampleImages();
      if (urls.length > 0) {
        toast.success(`Successfully uploaded ${urls.length} sample images`);
      } else {
        toast.error("Failed to upload any sample images. Please check console for details.");
      }
    } catch (error) {
      console.error("Error seeding images:", error);
      toast.error("Error uploading images. Please check console for details.");
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
      ) : (
        'Seed Sample Images'
      )}
    </Button>
  );
};

export default SeedImages;
