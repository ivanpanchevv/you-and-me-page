import { useState } from "react";
import { Heart, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const memories = [
  {
    emoji: "📸",
    title: "First Date",
    description: "That nervous smile I'll never forget",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    emoji: "🎂",
    title: "Your Birthday",
    description: "Making your day special",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    emoji: "🌅",
    title: "Sunrise Together",
    description: "Worth waking up early for",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    emoji: "🎭",
    title: "Concert Night",
    description: "Dancing like nobody's watching",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    emoji: "🍝",
    title: "Cooking Together",
    description: "Messy kitchen, happy hearts",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    emoji: "🌟",
    title: "Stargazing",
    description: "You outshine them all",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    emoji: "🎄",
    title: "First Holiday",
    description: "Creating traditions together",
    color: "from-green-500/20 to-red-500/20",
  },
  {
    emoji: "☔",
    title: "Dancing in Rain",
    description: "Perfect imperfect moment",
    color: "from-blue-500/20 to-teal-500/20",
  },
  {
    emoji: "🎨",
    title: "Art Museum Day",
    description: "You're my favorite masterpiece",
    color: "from-amber-500/20 to-rose-500/20",
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
              <div className={`relative aspect-square bg-gradient-to-br ${memory.color} p-6 flex flex-col items-center justify-center text-center`}>
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
            <div className="max-w-2xl w-full">
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
