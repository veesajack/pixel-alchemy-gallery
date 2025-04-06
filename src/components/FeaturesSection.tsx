
import { Check } from "lucide-react";

const features = [
  {
    title: "Advanced Image Generation",
    description: "Create highly detailed and realistic images from text descriptions with fine-tuned control over the output.",
    checks: [
      "Multiple AI models to choose from",
      "Adjustable parameters for precise control",
      "High-resolution output options",
      "Fast generation times"
    ]
  },
  {
    title: "Image Transformation",
    description: "Transform existing images with AI guidance, maintaining structure while applying new styles or concepts.",
    checks: [
      "Upload your own images",
      "Apply text-guided transformations",
      "Style transfer capabilities",
      "Preserve image structure"
    ]
  },
  {
    title: "Community Showcase",
    description: "Share your creations with the community and get inspired by what others are making.",
    checks: [
      "Public and private galleries",
      "Like and comment on images",
      "Follow creators you admire",
      "Discover trending creations"
    ]
  }
];

const FeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-bold">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-[42rem] mx-auto">
            Our platform offers a wide range of features to help you create stunning AI-generated images with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col rounded-lg border bg-card shadow-sm p-6 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.checks.map((item, checkIndex) => (
                  <li key={checkIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-ai-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
