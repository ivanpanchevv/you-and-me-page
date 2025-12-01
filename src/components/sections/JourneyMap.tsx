import { MapPin, Plane, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const places = [
  {
    name: "The Mountains",
    description: "Our first adventure together",
    emoji: "🏔️",
    status: "visited",
  },
  {
    name: "Beach Paradise",
    description: "Sun, sand, and unforgettable sunsets",
    emoji: "🏖️",
    status: "visited",
  },
  {
    name: "City of Lights",
    description: "Exploring streets hand in hand",
    emoji: "🌆",
    status: "visited",
  },
  {
    name: "Tropical Paradise",
    description: "Dream destination on our bucket list",
    emoji: "🌴",
    status: "planned",
  },
  {
    name: "European Adventure",
    description: "Can't wait to wander these streets with you",
    emoji: "🗼",
    status: "planned",
  },
  {
    name: "Northern Lights",
    description: "One day, under the aurora together",
    emoji: "✨",
    status: "dream",
  },
];

const JourneyMap = () => {
  return (
    <section id="journey" className="min-h-screen py-24 px-6 gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Places We've Been & Will Go
          </h2>
          <p className="text-xl text-muted-foreground">
            Every journey is an adventure with you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {places.map((place, index) => (
            <Card
              key={index}
              className={`group hover:-translate-y-2 transition-all duration-300 shadow-soft border-border/50 ${
                place.status === "visited"
                  ? "bg-primary/5 border-primary/30"
                  : place.status === "planned"
                  ? "bg-accent/30"
                  : "bg-card/80"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {place.emoji}
                </div>
                <h3 className="text-xl font-playfair font-bold mb-2 text-foreground">
                  {place.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {place.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  {place.status === "visited" ? (
                    <>
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm text-primary font-semibold">Visited</span>
                    </>
                  ) : place.status === "planned" ? (
                    <>
                      <Plane className="w-4 h-4 text-accent-foreground" />
                      <span className="text-sm text-accent-foreground font-semibold">
                        Planned
                      </span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-semibold">
                        Dream Destination
                      </span>
                    </>
                  )}
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
