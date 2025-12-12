import { Heart, Sparkles, Smile, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";


const WhyILoveYou = () => {
  const { t } = useTranslation();
  
  const reasons = [
    {
      icon: Heart,
      title: t("whyILoveYou.reasons.smile.title"),
      description: t("whyILoveYou.reasons.smile.description"),
    },
    {
      icon: Sparkles,
      title: t("whyILoveYou.reasons.kindness.title"),
      description: t("whyILoveYou.reasons.kindness.description"),
    },
    {
      icon: Smile,
      title: t("whyILoveYou.reasons.humor.title"),
      description: t("whyILoveYou.reasons.humor.description"),
    },
    {
      icon: Star,
      title: t("whyILoveYou.reasons.beingYou.title"),
      description: t("whyILoveYou.reasons.beingYou.description"),
    },
  ];
  
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            {t("whyILoveYou.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("whyILoveYou.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index}
              className="border-border/50 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full gradient-romantic flex items-center justify-center">
                      <reason.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold mb-3 text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyILoveYou;
