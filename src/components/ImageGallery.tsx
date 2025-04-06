
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, MoreVertical, Download, Link } from "lucide-react";

// Mock image data
const mockImages = [
  {
    id: '1',
    url: 'https://source.unsplash.com/random/512x512?fantasy',
    prompt: 'A magical castle in the clouds with rainbow bridges',
    likes: 124,
    user: 'artistic_ai',
    isLiked: false
  },
  {
    id: '2',
    url: 'https://source.unsplash.com/random/512x512?scifi',
    prompt: 'Futuristic city with flying cars and neon lights',
    likes: 89,
    user: 'future_dreamer',
    isLiked: true
  },
  {
    id: '3',
    url: 'https://source.unsplash.com/random/512x512?nature',
    prompt: 'Enchanted forest with glowing mushrooms and fairy lights',
    likes: 201,
    user: 'nature_lover',
    isLiked: false
  },
  {
    id: '4',
    url: 'https://source.unsplash.com/random/512x512?abstract',
    prompt: 'Abstract fractal patterns in vibrant colors',
    likes: 56,
    user: 'abstract_mind',
    isLiked: false
  },
  {
    id: '5',
    url: 'https://source.unsplash.com/random/512x512?portrait',
    prompt: 'Cyberpunk character with glowing cybernetic implants',
    likes: 167,
    user: 'cyber_punk',
    isLiked: false
  },
  {
    id: '6',
    url: 'https://source.unsplash.com/random/512x512?space',
    prompt: 'Nebula with stars and planets in deep space',
    likes: 143,
    user: 'space_explorer',
    isLiked: true
  },
];

const ImageGallery = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [images, setImages] = useState(mockImages);
  const [loading, setLoading] = useState(false);
  
  const toggleLike = (id: string) => {
    setImages(images.map(img => {
      if (img.id === id) {
        return { 
          ...img, 
          isLiked: !img.isLiked, 
          likes: img.isLiked ? img.likes - 1 : img.likes + 1 
        };
      }
      return img;
    }));
  };
  
  // Simulating loading more images
  const loadMore = () => {
    setLoading(true);
    
    // In a real app, this would be an API call to fetch more images
    setTimeout(() => {
      const newImages = [...mockImages].map((img, index) => ({
        ...img,
        id: `new-${index}`,
        url: `${img.url}&t=${Date.now()}`,
      }));
      
      setImages([...images, ...newImages]);
      setLoading(false);
    }, 1500);
  };
  
  // Simulate fetching different images when tab changes
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const shuffledImages = [...mockImages]
        .sort(() => Math.random() - 0.5)
        .map((img, index) => ({
          ...img,
          id: `tab-${index}`,
          url: `${img.url.split('?')[0]}?${activeTab}&t=${Date.now()}`,
        }));
      
      setImages(shuffledImages);
      setLoading(false);
    }, 800);
  }, [activeTab]);
  
  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="trending" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <ImageCard 
                key={image.id}
                image={image}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="newest" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <ImageCard 
                key={image.id}
                image={image}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="following" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <ImageCard 
                key={image.id}
                image={image}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          onClick={loadMore}
          disabled={loading}
          className="min-w-[150px]"
        >
          {loading ? (
            <>
              <svg className="loader mr-2 h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : "Load More"}
        </Button>
      </div>
    </div>
  );
};

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    prompt: string;
    likes: number;
    user: string;
    isLiked: boolean;
  };
  onToggleLike: (id: string) => void;
}

const ImageCard = ({ image, onToggleLike }: ImageCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <CardContent className="p-0 flex-grow">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
            loading="lazy"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-card">
        <div className="truncate max-w-[180px]">
          <p className="text-xs text-muted-foreground">@{image.user}</p>
          <p className="text-sm font-medium truncate" title={image.prompt}>
            {image.prompt}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onToggleLike(image.id)}
          >
            <Heart 
              className={`h-5 w-5 ${image.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span className="sr-only">Like</span>
          </Button>
          <span className="text-xs">{image.likes}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span>Copy link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageGallery;
