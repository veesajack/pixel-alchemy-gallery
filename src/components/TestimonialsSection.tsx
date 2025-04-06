
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "This AI image generator is revolutionary! I've used it for my design projects and the results are incredible. The control over the output is unmatched.",
    author: "Alex Chen",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    quote: "As a content creator, this platform has changed my workflow completely. I can generate custom illustrations for my blog in minutes instead of days.",
    author: "Sarah Johnson",
    role: "Content Creator",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    quote: "The image quality and versatility of styles available is simply amazing. I've tried other AI tools but none compare to the results I get here.",
    author: "Michael Torres",
    role: "Digital Artist",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    quote: "Our marketing team relies heavily on this platform for quick concept visualization. It has cut our ideation time in half and improved our creative output.",
    author: "Emily Zhang",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/35.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="w-full py-12 md:py-24 bg-hero-pattern">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what creators and professionals are saying about our platform.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="min-w-full p-6"
                >
                  <div className="bg-card border rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-20 h-20 rounded-full border-4 border-background mb-6" 
                    />
                    <blockquote className="text-lg md:text-xl italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-background shadow-sm"
            onClick={prevTestimonial}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background shadow-sm"
            onClick={nextTestimonial}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next testimonial</span>
          </Button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === activeIndex ? 'bg-ai-primary' : 'bg-muted'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
