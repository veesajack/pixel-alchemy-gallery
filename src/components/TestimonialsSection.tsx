
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "This AI image generator has completely transformed my creative process. I can create stunning visuals for my clients in minutes rather than hours.",
    author: "Alex Chen",
    role: "Graphic Designer",
    company: "DesignCraft Studio",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    quote: "As a content creator, this platform has changed my workflow completely. The image quality and versatility of styles available is simply amazing.",
    author: "Sarah Johnson",
    role: "Content Creator",
    company: "CreativeMinds",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    quote: "The control over the output is unmatched. I've tried other AI tools but none compare to the results and customization options I get here.",
    author: "Michael Torres",
    role: "Digital Artist",
    company: "ArtFusion",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    quote: "Our marketing team relies heavily on this platform for quick concept visualization. It has cut our ideation time in half and improved our creative output.",
    author: "Emily Zhang",
    role: "Marketing Director",
    company: "GrowthLabs",
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
    <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Creators Worldwide</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See what professionals and creators are saying about our platform.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
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
                  <div className="n8n-card p-8 flex flex-col items-center text-center">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Quote className="h-6 w-6 text-ai-primary" />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-3xl">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex flex-col items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-full mb-4" 
                      />
                      <div>
                        <p className="font-bold text-lg">{testimonial.author}</p>
                        <p className="text-gray-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-sm z-10 rounded-full h-12 w-12"
            onClick={prevTestimonial}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-sm z-10 rounded-full h-12 w-12"
            onClick={nextTestimonial}
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-ai-primary w-6' : 'bg-gray-300'
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
