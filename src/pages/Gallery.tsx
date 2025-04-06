
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ImageGallery from "@/components/ImageGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setUser(profileData);
        }
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile on auth change
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUser(profileData);
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
    let query = supabase
      .from('images')
      .select(`
        id, 
        user_id, 
        prompt, 
        model, 
        image_url, 
        is_public,
        status,
        created_at,
        profiles:user_id (username)
      `)
      .eq('is_public', true)
      .eq('status', 'completed');
    
    // Different sorting based on tab
    if (tab === 'trending') {
      // For trending, we would ideally join with the likes table and count
      // But for now, let's just order by created_at as a simple proxy
      query = query.order('created_at', { ascending: false });
    } else if (tab === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (tab === 'following') {
      // For following, we'd need a followers table
      // For now, just return recent images as a placeholder
      query = query.order('created_at', { ascending: false });
    }
    
    query = query.limit(30);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching images:', error);
      throw new Error('Failed to fetch images');
    }
    
    // Get likes count for each image
    const imagesWithLikes = await Promise.all(
      data.map(async (image) => {
        const { count } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('image_id', image.id);
        
        // Check if current user has liked this image
        let isLiked = false;
        if (user) {
          const { data: likeData } = await supabase
            .from('likes')
            .select('*')
            .eq('image_id', image.id)
            .eq('user_id', user.id)
            .single();
          
          isLiked = !!likeData;
        }
        
        return {
          ...image,
          likes: count || 0,
          user: image.profiles, // Rename profiles to user
          isLiked
        };
      })
    );
    
    return imagesWithLikes;
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
