
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic access for personal projects.",
    features: [
      "5 image generations per day",
      "Standard resolution (512x512)",
      "Basic models only",
      "Community access",
      "24-hour generation history"
    ],
    popular: false,
    buttonText: "Start Free"
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "Perfect for creators and enthusiasts.",
    features: [
      "100 image generations per day",
      "High resolution (up to 1024x1024)",
      "All models including SDXL",
      "Private gallery",
      "Priority rendering",
      "Image-to-image transformations",
      "30-day generation history"
    ],
    popular: true,
    buttonText: "Upgrade to Pro"
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For professionals and businesses.",
    features: [
      "Unlimited image generations",
      "Maximum resolution support",
      "All current and beta models",
      "API access",
      "Commercial usage rights",
      "Dedicated support",
      "90-day generation history",
      "Custom model fine-tuning"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const PricingSection = () => {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-bold">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-[42rem] mx-auto">
            Choose the plan that best fits your needs. All plans include access to our core features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col rounded-lg border ${plan.popular ? 'border-ai-primary shadow-lg' : 'shadow-sm'} bg-card p-6 transition-all hover:shadow-md`}
            >
              {plan.popular && (
                <div className="inline-block rounded-full bg-ai-primary px-3 py-1 text-xs font-medium text-white mb-4 w-fit">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-2 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 ${plan.popular ? 'text-ai-primary' : 'text-foreground'} shrink-0 mt-0.5`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'bg-ai-primary hover:bg-ai-dark text-white' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground pt-6">
          All plans are billed monthly. You can upgrade, downgrade, or cancel at any time.
          <br />
          Need a custom solution? <a href="#" className="text-ai-primary hover:underline">Contact our sales team</a>.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
