
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload an image file to Supabase storage
 */
export const uploadImage = async (file: File, path?: string): Promise<string | null> => {
  try {
    const filePath = path ? `${path}/${file.name}` : file.name;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Return the public URL for the uploaded image
    return getPublicUrl(data.path);
  } catch (error) {
    console.error('Unexpected error uploading image:', error);
    return null;
  }
};

/**
 * Get the public URL for an image in Supabase storage
 */
export const getPublicUrl = (path: string): string => {
  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
};

/**
 * Upload a file from a URL to Supabase storage
 */
export const uploadImageFromUrl = async (url: string, filename: string): Promise<string | null> => {
  try {
    // Fetch the image
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    // Convert to blob
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });
    
    // Upload to Supabase
    return await uploadImage(file);
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return null;
  }
};

/**
 * Seed sample images to Supabase storage (for demo purposes)
 */
export const seedSampleImages = async (): Promise<string[]> => {
  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1580130544977-624d0e30b923',
      filename: 'futuristic-city.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1516737490857-847e4f4f9dea',
      filename: 'underwater-city.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1581781418937-22b24a3a7b32',
      filename: 'cyberpunk-market.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1501510813829-6e5d8461ccaf',
      filename: 'fantasy-landscape.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1607870383193-3a0a13764966',
      filename: 'steampunk-airship.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1598313637462-ae7505bfb4e7',
      filename: 'alien-landscape.jpg'
    }
  ];

  const uploadedUrls: string[] = [];

  // Upload all images in parallel
  const uploadPromises = sampleImages.map(async (image) => {
    const url = await uploadImageFromUrl(image.url, image.filename);
    if (url) {
      uploadedUrls.push(url);
    }
    return url;
  });

  await Promise.all(uploadPromises);
  return uploadedUrls;
};
