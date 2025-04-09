
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
    console.log(`Attempting to fetch image from: ${url}`);
    
    // Use direct image URLs instead of dynamic services for reliability
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return null;
    }
    
    // Check if the response is actually an image
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Response is not an image: ${contentType}`);
      return null;
    }
    
    // Convert to blob
    const blob = await response.blob();
    console.log(`Successfully fetched image, size: ${blob.size} bytes, type: ${blob.type}`);
    
    // Create file with proper extension
    const fileExt = blob.type.split('/')[1] || 'jpg';
    const safeFilename = `${filename.replace(/\.[^/.]+$/, '')}.${fileExt}`;
    
    const file = new File([blob], safeFilename, { type: blob.type });
    console.log(`Created file object: ${file.name}, size: ${file.size} bytes`);
    
    // Upload to Supabase
    const uploadedUrl = await uploadImage(file);
    console.log(`Upload result: ${uploadedUrl ? 'Success' : 'Failed'}`);
    return uploadedUrl;
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return null;
  }
};

/**
 * Seed sample images to Supabase storage (for demo purposes)
 */
export const seedSampleImages = async (): Promise<string[]> => {
  // Use direct, reliable image URLs instead of the Unsplash random API
  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&h=600&fit=crop',
      filename: 'ai-generated-landscape.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?w=800&h=600&fit=crop',
      filename: 'cyberpunk-city.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1541185934-01b600ea069c?w=800&h=600&fit=crop',
      filename: 'futuristic-concept.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1568332320368-d85ce6454da8?w=800&h=600&fit=crop',
      filename: 'fantasy-world.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&h=600&fit=crop',
      filename: 'space-scene.jpg'
    }
  ];

  const uploadedUrls: string[] = [];

  // Create the images bucket if it doesn't exist
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return [];
    }
    
    const imagesBucketExists = buckets.some(bucket => bucket.name === 'images');
    
    if (!imagesBucketExists) {
      console.log('Creating images bucket...');
      const { error: createBucketError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (createBucketError) {
        console.error('Error creating images bucket:', createBucketError);
        return [];
      }
      console.log('Images bucket created successfully');
    }
  } catch (error) {
    console.error('Error checking/creating bucket:', error);
    return [];
  }

  // Process each image sequentially to avoid overwhelming the server
  for (const image of sampleImages) {
    try {
      console.log(`Processing ${image.filename}...`);
      const url = await uploadImageFromUrl(image.url, image.filename);
      if (url) {
        uploadedUrls.push(url);
        console.log(`Successfully uploaded: ${image.filename}`);
      } else {
        console.error(`Failed to upload ${image.filename}`);
      }
    } catch (error) {
      console.error(`Exception uploading ${image.filename}:`, error);
    }
    
    // Add a small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return uploadedUrls;
};
