import { useState } from "react";
import { Heart, X } from "lucide-react";
import { Card } from "@/components/ui/card";

// Import images
import firstDateImage from "@/assets/first-date-photo.jpg";
import birthdayImage from "@/assets/birthday-celebration.jpg";
import sunriseImage from "@/assets/sunrise-together.jpg";
import concertImage from "@/assets/concert-together.jpg";
import cookingImage from "@/assets/cooking-together.jpg";
import sunsetImage from "@/assets/sunset-together.jpg";
import firstTripImage from "@/assets/first-trip.jpg";
import lastTripImage from "@/assets/last-trip.jpg";
import seaImage from "@/assets/sea-together.jpg";

const memories = [
  {
    emoji: "📸",
    title: "First Date",
    description: "That nervous smile I'll never forget",
    color: "from-pink-500/20 to-rose-500/20",
    image: firstDateImage,
  },
  {
    emoji: "🎂",
    title: "Your Birthday",
    description: "Making your day special",
    color: "from-purple-500/20 to-pink-500/20",
    image: birthdayImage,
  },
  {
    emoji: "🌅",
    title: "Sunrise Together",
    description: "Worth waking up early for",
    color: "from-orange-500/20 to-yellow-500/20",
    image: sunriseImage,
  },
  {
    emoji: "🎭",
    title: "Concert Together",
    description: "Dancing like nobody's watching",
    color: "from-blue-500/20 to-purple-500/20",
    image: concertImage,
  },
  {
    emoji: "🍝",
    title: "Cooking Together",
    description: "Messy kitchen, happy hearts",
    color: "from-red-500/20 to-orange-500/20",
    image: cookingImage,
  },
  {
    emoji: "🌇",
    title: "Sunset Together",
    description: "Golden hour with my favorite person",
    color: "from-amber-500/20 to-orange-500/20",
    image: sunsetImage,
  },
  {
    emoji: "✈️",
    title: "First Trip",
    description: "Adventures begin with you",
    color: "from-sky-500/20 to-indigo-500/20",
    image: firstTripImage,
  },
  {
    emoji: "🗺️",
    title: "Last Trip",
    description: "Making memories around the world",
    color: "from-green-500/20 to-teal-500/20",
    image: lastTripImage,
  },
  {
    emoji: "🌊",
    title: "Sea Together",
    description: "Waves and endless horizons",
    color: "from-blue-500/20 to-cyan-500/20",
    image: seaImage,
  },
];

const MediaGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Beautiful Moments
          </h2>
          <p className="text-xl text-muted-foreground">
            A gallery of memories we've created together
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((memory, index) => (
            <Card
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group cursor-pointer overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-soft border-border/50"
            >
              <div className="relative aspect-square overflow-hidden">
                {memory.image ? (
                  <>
                    <img 
                      src={memory.image} 
                      alt={memory.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-end text-center">
                      <h3 className="font-playfair font-bold text-lg md:text-xl text-white mb-2">
                        {memory.title}
                      </h3>
                      <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                        {memory.description}
                      </p>
                      <Heart className="absolute top-3 right-3 w-5 h-5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity fill-white/80" />
                    </div>
                  </>
                ) : (
                  <div className={`relative h-full bg-gradient-to-br ${memory.color} p-6 flex flex-col items-center justify-center text-center`}>
                    <div className="text-6xl md:text-7xl mb-4 group-hover:scale-110 transition-transform">
                      {memory.emoji}
                    </div>
                    <h3 className="font-playfair font-bold text-lg md:text-xl text-foreground mb-2">
                      {memory.title}
                    </h3>
                    <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {memory.description}
                    </p>
                    <Heart className="absolute top-3 right-3 w-5 h-5 text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full">
              {memories[selectedImage].image ? (
                <div className="relative rounded-3xl overflow-hidden">
                  <img 
                    src={memories[selectedImage].image} 
                    alt={memories[selectedImage].title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-3xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-center">
                    <h3 className="text-4xl font-playfair font-bold text-white mb-4">
                      {memories[selectedImage].title}
                    </h3>
                    <p className="text-xl text-white/90">
                      {memories[selectedImage].description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`bg-gradient-to-br ${memories[selectedImage].color} rounded-3xl p-12 text-center`}>
                  <div className="text-8xl mb-6 animate-float">
                    {memories[selectedImage].emoji}
                  </div>
                  <h3 className="text-4xl font-playfair font-bold text-foreground mb-4">
                    {memories[selectedImage].title}
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    {memories[selectedImage].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            Click on any moment to relive the memory 💕
          </p>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
