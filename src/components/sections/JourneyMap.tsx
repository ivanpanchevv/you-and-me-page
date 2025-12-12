import { Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Import images
import corfuImage from "@/assets/corfu.jpg";
import petkovoImage from "@/assets/petkovo.jpg";
import nimesImage from "@/assets/nimes.jpg";
import antwerpImage from "@/assets/antwerp.jpg";
import borovetsImage from "@/assets/borovets.jpg";
import sozopolImage from "@/assets/sozopol.jpg";

const JourneyMap = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const places = [
    {
      name: t("journeyMap.places.0.name"),
      description: t("journeyMap.places.0.description"),
      emoji: "🏝️",
      image: corfuImage,
    },
    {
      name: t("journeyMap.places.1.name"),
      description: t("journeyMap.places.1.description"),
      emoji: "🏔️",
      image: petkovoImage,
    },
    {
      name: t("journeyMap.places.2.name"),
      description: t("journeyMap.places.2.description"),
      emoji: "🏛️",
      image: nimesImage,
    },
    {
      name: t("journeyMap.places.3.name"),
      description: t("journeyMap.places.3.description"),
      emoji: "💎",
      image: antwerpImage,
    },
    {
      name: t("journeyMap.places.4.name"),
      description: t("journeyMap.places.4.description"),
      emoji: "⛷️",
      image: borovetsImage,
    },
    {
      name: t("journeyMap.places.5.name"),
      description: t("journeyMap.places.5.description"),
      emoji: "🌊",
      image: sozopolImage,
    },
  ];

  return (
    <section id="journey" className="min-h-screen py-24 px-6 gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            {t("journeyMap.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("journeyMap.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {places.map((place, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-soft border-border/50 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              {/* Content Overlay */}
              <CardContent className="relative p-6 text-center h-[280px] flex flex-col justify-end">
                {/* Floating emoji on hover */}
                <div className={`absolute top-6 right-6 text-4xl transition-all duration-500 ${
                  hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  {place.emoji}
                </div>
                
                {/* Map pin icon */}
                <MapPin className="absolute top-6 left-6 w-6 h-6 text-white/80" />
                
                {/* Text content */}
                <div className="transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-white">
                    {place.name}
                  </h3>
                  <p className="text-white/90 mb-4 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    {place.description}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-white fill-white" />
                    <span className="text-sm text-white font-semibold">Visited Together</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground italic">
            "{t("journeyMap.quote")}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyMap;
