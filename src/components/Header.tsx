
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ai-primary to-ai-accent"
          >
            Pixel Alchemy
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/gallery" className="text-sm font-medium hover:text-ai-accent transition-colors">
            Gallery
          </Link>
          <Link to="/community" className="text-sm font-medium hover:text-ai-accent transition-colors">
            Community
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-ai-accent transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-ai-accent transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {/* Login/Register Button - Desktop */}
          <div className="hidden md:flex gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              asChild
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-ai-primary hover:bg-ai-dark text-white"
              asChild
            >
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/gallery">Gallery</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/community">Community</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
