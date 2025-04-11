
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload an image file to Supabase storage
 */
export const uploadImage = async (file: File, path?: string): Promise<string | null> => {
  try {
    // First, ensure the images bucket exists
    await ensureImagesBucketExists();
    
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
 * Ensure the images bucket exists in Supabase storage
 */
export const ensureImagesBucketExists = async (): Promise<boolean> => {
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return false;
    }
    
    const imagesBucketExists = buckets.some(bucket => bucket.name === 'images');
    
    if (!imagesBucketExists) {
      console.log('Creating images bucket...');
      const { error: createBucketError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createBucketError) {
        console.error('Error creating images bucket:', createBucketError);
        return false;
      }
      console.log('Images bucket created successfully');
    }
    return true;
  } catch (error) {
    console.error('Error checking/creating bucket:', error);
    return false;
  }
};

/**
 * Upload a file from a URL to Supabase storage
 */
export const uploadImageFromUrl = async (url: string, filename: string): Promise<string | null> => {
  try {
    console.log(`Attempting to fetch image from: ${url}`);
    
    // Make sure the images bucket exists before proceeding
    const bucketExists = await ensureImagesBucketExists();
    if (!bucketExists) {
      console.error('Images bucket does not exist and could not be created');
      return null;
    }
    
    // Replace any initial parameters in the URL for reliability
    const cleanUrl = url.split('?')[0];
    
    // Use a CORS proxy for external URLs if needed
    let fetchUrl = cleanUrl;
    
    // Fetch the image
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return null;
    }
    
    // Get the image data as a blob
    const blob = await response.blob();
    console.log(`Successfully fetched image, size: ${blob.size} bytes, type: ${blob.type || 'unknown'}`);
    
    if (blob.size === 0) {
      console.error('Empty blob received');
      return null;
    }
    
    // Infer file extension if possible, or default to jpg
    const contentType = blob.type || 'image/jpeg';
    const fileExt = contentType.split('/')[1] || 'jpg';
    
    // Create a clean filename with proper extension
    const safeFilename = `${filename.replace(/[^a-zA-Z0-9-_]/g, '-')}.${fileExt}`;
    
    // Create a File object from the blob
    const file = new File([blob], safeFilename, { type: contentType });
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
  // Use reliable, high-quality image URLs
  const sampleImages = [
    {
      url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      filename: 'sunset-landscape'
    },
    {
      url: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      filename: 'futuristic-city'
    },
    {
      url: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      filename: 'abstract-pattern'
    },
    {
      url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      filename: 'mountain-landscape'
    },
    {
      url: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      filename: 'space-galaxy'
    }
  ];

  const uploadedUrls: string[] = [];

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
