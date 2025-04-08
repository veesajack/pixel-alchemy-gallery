
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

  // For demo purposes, using updated static images with Unsplash URLs that work
  const mockImages = [
    {
      id: 'img1',
      user_id: 'user1',
      prompt: 'Futuristic cityscape with flying cars and neon lights',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 125,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-01T12:00:00Z',
      user: { username: 'techvision' },
      isLiked: false
    },
    {
      id: 'img2',
      user_id: 'user2',
      prompt: 'Underwater city with bioluminescent architecture',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 93,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-02T14:30:00Z',
      user: { username: 'oceandreamer' },
      isLiked: true
    },
    {
      id: 'img3',
      user_id: 'user3',
      prompt: 'Cyberpunk market scene with holographic displays',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1675703868369-7cc625a36cd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 87,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-03T09:15:00Z',
      user: { username: 'cyberpunker' },
      isLiked: false
    },
    {
      id: 'img4',
      user_id: 'user4',
      prompt: 'Fantasy landscape with floating islands and waterfalls',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 142,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-04T16:45:00Z',
      user: { username: 'fantasyartist' },
      isLiked: false
    },
    {
      id: 'img5',
      user_id: 'user5',
      prompt: 'Steampunk airship battle in the clouds',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 118,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-05T11:20:00Z',
      user: { username: 'steampunklover' },
      isLiked: true
    },
    {
      id: 'img6',
      user_id: 'user6',
      prompt: 'Alien landscape with exotic flora and fauna',
      model: 'diffusion-xl',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 105,
      status: 'completed',
      is_public: true,
      created_at: '2023-04-06T13:50:00Z',
      user: { username: 'alienworldcreator' },
      isLiked: false
    }
  ];

  // Mock fetch function that returns the static images
  const fetchPublicImages = async ({ queryKey }: any) => {
    const [_, tab] = queryKey;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Different sorting based on tab
    if (tab === 'trending') {
      return [...mockImages].sort((a, b) => b.likes - a.likes);
    } else if (tab === 'newest') {
      return [...mockImages].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    } else {
      // For 'following' tab, return fewer images
      return mockImages.slice(0, 3);
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
