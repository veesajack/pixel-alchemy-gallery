
import { ArrowRight, Image, Sparkles, Palette, Share2, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Advanced AI Models",
    description: "Access cutting-edge image generation models like Stable Diffusion XL, optimized for quality and speed."
  },
  {
    icon: Palette,
    title: "Style Control",
    description: "Fine-tune your creations with adjustable parameters, style presets, and advanced customization options."
  },
  {
    icon: Image,
    title: "Image Transformation",
    description: "Upload your own images and transform them with AI guidance while maintaining structure and enhancing features."
  },
  {
    icon: Share2,
    title: "Community Sharing",
    description: "Share your creations, get inspired by others, and join a thriving community of AI artists and designers."
  },
  {
    icon: Zap,
    title: "Fast Generation",
    description: "Generate high-quality images in seconds with our optimized infrastructure and priority processing."
  },
  {
    icon: Users,
    title: "Collaboration Tools",
    description: "Work together on projects, share prompt collections, and build on each other's creations."
  }
];

const FeaturesSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-ai-dark relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block glass px-4 py-1 text-sm text-white/70 mb-4">
            Powerful Features
          </div>
          <h2 className="gradient-text text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Everything You Need to Create
          </h2>
          <p className="max-w-2xl text-white/70 text-lg md:text-xl">
            Our platform offers a wide range of features to help you create stunning AI-generated images with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 group transition-all hover:translate-y-[-4px]">
              <div className="space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ai-primary/20 group-hover:bg-ai-primary/30 transition-colors">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
                <div className="flex items-center text-ai-accent font-medium group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-ai-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-ai-accent/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
