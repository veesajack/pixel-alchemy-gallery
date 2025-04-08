
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ImageGallery from "@/components/ImageGallery";
import SeedImages from "@/components/SeedImages";
import { getPublicUrl } from "@/utils/supabaseStorage";

// Type definitions for our data
interface Image {
  id: string;
  user_id: string;
  prompt: string;
  model: string;
  image_url: string;
  likes: number;
  status: string;
  is_public: boolean;
  created_at: string;
  user: {
    username: string;
  };
  isLiked?: boolean;
}

interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface StorageImage {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: any;
}

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Check auth state on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setUser(profileData as UserProfile);
        }
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile on auth change
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUser(profileData as UserProfile);
          }
        } else {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch images from Supabase storage
  const fetchStorageImages = async ({ queryKey }: any) => {
    const [_, tab] = queryKey;
    
    try {
      // List all files in the 'images' bucket
      const { data: storageData, error: storageError } = await supabase.storage
        .from('images')
        .list();
        
      if (storageError) {
        console.error('Error fetching storage images:', storageError);
        return [];
      }
      
      if (!storageData || storageData.length === 0) {
        return [];
      }
      
      // Convert storage objects to our image format
      const images: Image[] = storageData
        .filter((item): item is StorageImage => !item.id.endsWith('/')) // Filter out folders
        .map((item, index) => {
          const publicUrl = getPublicUrl(item.name);
          return {
            id: item.id,
            user_id: 'demo_user',
            prompt: item.name.replace('.jpg', '').replace(/-/g, ' '),
            model: 'diffusion-xl',
            image_url: publicUrl,
            likes: Math.floor(Math.random() * 100) + 10, // Random likes count
            status: 'completed',
            is_public: true,
            created_at: item.created_at,
            user: { username: 'pixelartist' },
            isLiked: false
          };
        });
      
      // Different sorting based on tab
      if (tab === 'trending') {
        return [...images].sort((a, b) => b.likes - a.likes);
      } else if (tab === 'newest') {
        return [...images].sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      } else {
        // For 'following' tab, return fewer images
        return images.slice(0, 3);
      }
    } catch (error) {
      console.error('Unexpected error fetching storage images:', error);
      return [];
    }
  };

  // Query for images
  const { data: images, isLoading, error, refetch } = useQuery({
    queryKey: ['storage-images', activeTab],
    queryFn: fetchStorageImages,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle like toggle
  const handleToggleLike = async (imageId: string) => {
    if (!user) {
      toast.error("You must be logged in to like images");
      return;
    }
    
    const imageToUpdate = images?.find(img => img.id === imageId);
    if (!imageToUpdate) return;
    
    toast.success(imageToUpdate.isLiked ? "Image unliked" : "Image liked");
    
    // In a real app, this would update the database
    // For now, we'll just refetch to simulate the update
    setTimeout(() => refetch(), 300);
  };

  // Format the data to match the ImageGallery component format
  const formatImagesForGallery = (images: Image[] | undefined) => {
    if (!images) return [];
    
    return images.map(img => ({
      id: img.id,
      url: img.image_url,
      prompt: img.prompt,
      likes: img.likes,
      user: img.user?.username || 'anonymous',
      isLiked: img.isLiked || false
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Image Gallery</h1>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Browse images stored in Supabase
        </p>
        <SeedImages />
      </div>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading images. Please try again later.
        </div>
      ) : (
        <ImageGallery 
          images={formatImagesForGallery(images)} 
          onToggleLike={handleToggleLike}
          isLoading={isLoading}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Gallery;
