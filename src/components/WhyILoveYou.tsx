import { Heart, Sparkles, Smile, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Heart,
    title: "Your Smile",
    description: "The way your face lights up when you laugh is the most beautiful thing I've ever seen. It makes my whole world brighter.",
  },
  {
    icon: Sparkles,
    title: "Your Kindness",
    description: "You have the biggest heart and always think of others. Your compassion and care make you truly special.",
  },
  {
    icon: Smile,
    title: "Your Sense of Humor",
    description: "You make me laugh like no one else can. Every day with you is filled with joy and silly moments I cherish.",
  },
  {
    icon: Star,
    title: "Simply Being You",
    description: "Everything about you is perfect in my eyes. Thank you for being exactly who you are and for letting me love you.",
  },
];

const WhyILoveYou = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Why I Love You
          </h2>
          <p className="text-xl text-muted-foreground">
            Just a few of the countless reasons...
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
