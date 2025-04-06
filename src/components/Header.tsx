
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
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="font-bold text-2xl n8n-gradient-text"
          >
            Pixel Alchemy
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/generate" className="text-base font-medium text-gray-700 hover:text-ai-primary transition-colors">
            Generate
          </Link>
          <Link to="/gallery" className="text-base font-medium text-gray-700 hover:text-ai-primary transition-colors">
            Gallery
          </Link>
          <Link to="/pricing" className="text-base font-medium text-gray-700 hover:text-ai-primary transition-colors">
            Pricing
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-base font-medium text-gray-700 hover:text-ai-primary transition-colors">
              Resources
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/docs">Documentation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tutorials">Tutorials</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/blog">Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/about" className="text-base font-medium text-gray-700 hover:text-ai-primary transition-colors">
            About
          </Link>
        </nav>
        
        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-gray-200 hover:bg-gray-50 hover:text-ai-primary"
            asChild
          >
            <Link to="/login">Log in</Link>
          </Button>
          <Button 
            className="bg-ai-primary hover:bg-ai-primary/90 text-white"
            asChild
          >
            <Link to="/register">Sign Up Free</Link>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden inline-flex items-center justify-center text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4">
          <div className="container space-y-4">
            <Link 
              to="/generate" 
              className="block text-lg font-medium text-gray-700 hover:text-ai-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Generate
            </Link>
            <Link 
              to="/gallery" 
              className="block text-lg font-medium text-gray-700 hover:text-ai-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/pricing" 
              className="block text-lg font-medium text-gray-700 hover:text-ai-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block text-lg font-medium text-gray-700 hover:text-ai-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-center"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button 
                className="w-full justify-center bg-ai-primary hover:bg-ai-primary/90 text-white"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/register">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
