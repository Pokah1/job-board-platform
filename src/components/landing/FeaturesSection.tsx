"use client";

import { Briefcase, Users, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Quality Jobs",
      description: "Hand-picked opportunities from top companies across various industries and locations."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Diverse Community",
      description: "Join a vibrant community of professionals from all backgrounds and experience levels."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Opportunities",
      description: "Access remote, hybrid, and on-site positions with companies worldwide."
    }
  ];

  return (
    <section aria-labelledby="features-heading" className="px-6 py-20 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <header>
          <h2 id="features-heading" className="text-3xl font-bold mb-4">
            Why Choose <span className="text-brand">Talentra?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            We connect talented professionals with amazing opportunities across the continent and beyond.
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <article key={idx} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection
