import { Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Import images
import corfuImage from "@/assets/corfu.jpg";
import petkovoImage from "@/assets/petkovo.jpg";
import nimesImage from "@/assets/nimes.jpg";
import antwerpImage from "@/assets/antwerp.jpg";
import borovetsImage from "@/assets/borovets.jpg";
import sozopolImage from "@/assets/sozopol.jpg";

const places = [
  {
    name: "Corfu",
    description: "Island paradise with crystal waters",
    emoji: "🏝️",
    image: corfuImage,
  },
  {
    name: "Petkovo",
    description: "Mountain adventures and fresh air",
    emoji: "🏔️",
    image: petkovoImage,
  },
  {
    name: "Nimes",
    description: "French charm and ancient history",
    emoji: "🏛️",
    image: nimesImage,
  },
  {
    name: "Antwerp",
    description: "Belgian beauty and diamond city",
    emoji: "💎",
    image: antwerpImage,
  },
  {
    name: "Borovets",
    description: "Snowy peaks and mountain magic",
    emoji: "⛷️",
    image: borovetsImage,
  },
  {
    name: "Sozopol",
    description: "Seaside memories and old town magic",
    emoji: "🌊",
    image: sozopolImage,
  },
];

const JourneyMap = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="min-h-screen py-24 px-6 gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Places We've Been Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Every journey is an adventure with you
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
                  loading="lazy"
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
            "Not all who wander are lost - especially when wandering with you" 🗺️
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyMap;
