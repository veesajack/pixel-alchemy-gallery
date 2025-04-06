
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ImageGallery from "@/components/ImageGallery";

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

  // Fetch public images
  const fetchPublicImages = async ({ queryKey }: any) => {
    const [_, tab] = queryKey;
    
    try {
      // Fetch images
      let { data: images, error } = await supabase
        .from('images')
        .select(`
          id, 
          user_id, 
          prompt, 
          model, 
          image_url, 
          is_public,
          status,
          created_at
        `)
        .eq('is_public', true)
        .eq('status', 'completed');
      
      if (error) {
        console.error('Error fetching images:', error);
        throw error;
      }
      
      if (!images || images.length === 0) {
        return [];
      }
      
      // Different sorting based on tab
      if (tab === 'trending') {
        // For trending, we would ideally join with the likes table and count
        // But for now, let's just order by created_at as a simple proxy
        images = images.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      } else if (tab === 'newest') {
        images = images.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      }
      
      // Get usernames for each image
      const imagesWithUsernames = await Promise.all(
        images.map(async (image) => {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', image.user_id)
            .single();
          
          return {
            ...image,
            user: {
              username: userData?.username || 'anonymous'
            }
          };
        })
      );
      
      // Get likes count for each image
      const imagesWithLikes = await Promise.all(
        imagesWithUsernames.map(async (image) => {
          const { count, error: likeCountError } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('image_id', image.id);
          
          // Check if current user has liked this image
          let isLiked = false;
          if (user) {
            const { data: likeData, error: likeError } = await supabase
              .from('likes')
              .select('*')
              .eq('image_id', image.id)
              .eq('user_id', user.id)
              .maybeSingle();
            
            isLiked = !!likeData;
          }
          
          return {
            ...image,
            likes: count || 0,
            isLiked
          };
        })
      );
      
      return imagesWithLikes;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  // Query for images
  const { data: images, isLoading, error, refetch } = useQuery({
    queryKey: ['images', activeTab],
    queryFn: fetchPublicImages,
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
    
    try {
      if (imageToUpdate.isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('image_id', imageId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error unliking image:', error);
          toast.error("Failed to unlike image");
          return;
        }
        
        toast.success("Image unliked");
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            image_id: imageId,
            user_id: user.id
          });
        
        if (error) {
          console.error('Error liking image:', error);
          toast.error("Failed to like image");
          return;
        }
        
        toast.success("Image liked");
      }
      
      // Refetch to update the UI
      refetch();
    } catch (err) {
      console.error('Error toggling like:', err);
      toast.error("Something went wrong");
    }
  };

  // Format the Supabase data to match the ImageGallery component format
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
