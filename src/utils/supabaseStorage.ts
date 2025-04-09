
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
    // Fetch the image with proper CORS handling
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'image/*'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.statusText}`);
      return null;
    }
    
    // Convert to blob
    const blob = await response.blob();
    
    // Create a more precise file name with extension based on content type
    const fileExt = blob.type.split('/')[1] || 'jpg';
    const safeFilename = `${filename.replace(/\.[^/.]+$/, '')}.${fileExt}`;
    
    const file = new File([blob], safeFilename, { type: blob.type });
    
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
      url: 'https://source.unsplash.com/random/800x600/?ai',
      filename: 'ai-generated-landscape.jpg'
    },
    {
      url: 'https://source.unsplash.com/random/800x600/?cyberpunk',
      filename: 'cyberpunk-city.jpg'
    },
    {
      url: 'https://source.unsplash.com/random/800x600/?futuristic',
      filename: 'futuristic-concept.jpg'
    },
    {
      url: 'https://source.unsplash.com/random/800x600/?fantasy',
      filename: 'fantasy-world.jpg'
    },
    {
      url: 'https://source.unsplash.com/random/800x600/?space',
      filename: 'space-scene.jpg'
    }
  ];

  const uploadedUrls: string[] = [];

  for (const image of sampleImages) {
    try {
      const url = await uploadImageFromUrl(image.url, image.filename);
      if (url) {
        uploadedUrls.push(url);
        console.log(`Successfully uploaded: ${image.filename}`);
      }
    } catch (error) {
      console.error(`Failed to upload ${image.filename}:`, error);
    }
  }

  return uploadedUrls;
};
