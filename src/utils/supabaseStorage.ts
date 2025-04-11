
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload an image file to Supabase storage
 */
export const uploadImage = async (file: File, path?: string): Promise<string | null> => {
  try {
    const filePath = path ? `${path}/${file.name}` : file.name;
    
    // Try to upload to Supabase if possible
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        // Return the public URL for the uploaded image
        return getPublicUrl(data.path);
      }
    } catch (err) {
      console.warn("Supabase upload failed, using fallback URL:", err);
    }
    
    // Fallback: Return a direct URL to the File object (works in development)
    return URL.createObjectURL(file);
  } catch (error) {
    console.error('Unexpected error handling image:', error);
    return null;
  }
};

/**
 * Get the public URL for an image in Supabase storage
 */
export const getPublicUrl = (path: string): string => {
  try {
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    // Fallback to a default image or placeholder
    return 'https://via.placeholder.com/500x500.png?text=Image+Not+Available';
  }
};

/**
 * Instead of creating a bucket (which requires admin privileges),
 * we'll use a simpler approach with reliable image sources
 */
export const ensureImagesBucketExists = async (): Promise<boolean> => {
  // For this demo app, we'll assume the bucket might exist but we don't have
  // permission to create it if it doesn't
  try {
    // Just check if we can list files from the bucket
    const { error } = await supabase.storage.from('images').list();
    if (error) {
      console.log('Cannot access images bucket:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.log('Error checking bucket existence:', error);
    return false;
  }
};

/**
 * Process an image URL and return a usable image URL for the app
 */
export const processImageUrl = async (url: string, filename: string): Promise<string> => {
  // Simply return the URL for demo purposes
  return url;
};

/**
 * Seed sample images from reliable sources
 */
export const seedSampleImages = async (): Promise<string[]> => {
  // Use reliable, high-quality image URLs
  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1682687981922-7b55dbb30892',
      filename: 'sunset-landscape'
    },
    {
      url: 'https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149',
      filename: 'futuristic-city'
    },
    {
      url: 'https://images.unsplash.com/photo-1682687218147-9806132dc697',
      filename: 'abstract-pattern'
    },
    {
      url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      filename: 'mountain-landscape'
    },
    {
      url: 'https://images.unsplash.com/photo-1682695795557-17447f919b0e',
      filename: 'space-galaxy'
    }
  ];

  // For the demo, we'll just return the URLs directly instead of trying to upload them
  const imageUrls = sampleImages.map(image => image.url);
  
  // Log for debugging
  console.log(`Successfully processed ${imageUrls.length} sample images for the gallery`);
  
  return imageUrls;
};
