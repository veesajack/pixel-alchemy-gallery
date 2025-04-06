
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h4 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-ai-primary to-ai-accent">
            Pixel Alchemy
          </h4>
          <p className="text-sm text-muted-foreground">
            Transform your imagination into stunning visuals with our AI image generation platform.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-semibold text-base">Product</h5>
            <ul className="space-y-1">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-base">Company</h5>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-2">
          <h5 className="font-semibold text-base">Legal</h5>
          <ul className="space-y-1">
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Pixel Alchemy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-muted-foreground hover:text-ai-accent transition-colors">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-ai-accent transition-colors">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-ai-accent transition-colors">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
