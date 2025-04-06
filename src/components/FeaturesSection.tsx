
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need to Create</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform offers a wide range of features to help you create stunning AI-generated images with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="n8n-card p-6">
              <CardContent className="p-0 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <feature.icon className="h-6 w-6 text-ai-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 mt-2">{feature.description}</p>
                </div>
                <div className="flex items-center text-ai-primary font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
