
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
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-800">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that best fits your needs. All plans include access to our core features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col rounded-xl border ${plan.popular ? 'border-ai-primary shadow-lg relative' : 'border-gray-200'} bg-white p-8 transition-all hover:shadow-md`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-block rounded-full bg-ai-primary px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-500 mt-3">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 text-ai-primary flex-shrink-0 mt-0.5`} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full h-12 ${plan.popular ? 'bg-ai-primary hover:bg-ai-primary/90' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-8">
          All plans are billed monthly. You can upgrade, downgrade, or cancel at any time.
          <br />
          Need a custom solution? <a href="#" className="text-ai-primary hover:underline">Contact our sales team</a>.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
