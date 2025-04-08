
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { seedSampleImages } from "@/utils/supabaseStorage";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SeedImages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeedImages = async () => {
    setIsLoading(true);
    try {
      const urls = await seedSampleImages();
      if (urls.length > 0) {
        toast.success(`Successfully uploaded ${urls.length} sample images`);
      } else {
        toast.error("Failed to upload any sample images");
      }
    } catch (error) {
      toast.error("Error seeding images");
      console.error(error);
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
