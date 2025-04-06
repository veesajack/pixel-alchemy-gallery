
import { useState } from 'react';
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

interface ImageGalleryProps {
  images: {
    id: string;
    url: string;
    prompt: string;
    likes: number;
    user: string;
    isLiked: boolean;
  }[];
  onToggleLike: (id: string) => void;
  isLoading?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ImageGallery = ({ 
  images = [], 
  onToggleLike,
  isLoading = false,
  activeTab = 'trending',
  onTabChange = () => {}
}: ImageGalleryProps) => {
  const [loading, setLoading] = useState(false);
  
  const loadMore = () => {
    setLoading(true);
    
    // In a real app, this would trigger loading more images from the database
    // For now, we'll just simulate loading state
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="w-full space-y-6">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={onTabChange}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeleton loading state
              Array(6).fill(0).map((_, i) => (
                <Card key={`skeleton-${i}`} className="overflow-hidden h-full">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <CardFooter className="flex justify-between items-center p-4">
                    <div className="w-2/3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : images.length > 0 ? (
              images.map((image) => (
                <ImageCard 
                  key={image.id}
                  image={image}
                  onToggleLike={onToggleLike}
                />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-lg text-muted-foreground">No images found. Be the first to generate and share!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="newest" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={`skeleton-${i}`} className="overflow-hidden h-full">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <CardFooter className="flex justify-between items-center p-4">
                    <div className="w-2/3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : images.length > 0 ? (
              images.map((image) => (
                <ImageCard 
                  key={image.id}
                  image={image}
                  onToggleLike={onToggleLike}
                />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-lg text-muted-foreground">No images found. Be the first to generate and share!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="following" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={`skeleton-${i}`} className="overflow-hidden h-full">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <CardFooter className="flex justify-between items-center p-4">
                    <div className="w-2/3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : images.length > 0 ? (
              images.map((image) => (
                <ImageCard 
                  key={image.id}
                  image={image}
                  onToggleLike={onToggleLike}
                />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-lg text-muted-foreground">No images found yet. Follow creators to see their work here!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {images.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={loadMore}
            disabled={loading || isLoading}
            className="min-w-[150px]"
          >
            {loading ? (
              <>
                <svg className="loader mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
      )}
    </div>
  );
};

export default ImageGallery;
