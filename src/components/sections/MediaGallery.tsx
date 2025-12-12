import { useState, useEffect, useCallback } from "react";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

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

const MediaGallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const memories = [
    {
      emoji: "📸",
      title: t("mediaGallery.memories.0.title"),
      description: t("mediaGallery.memories.0.description"),
      color: "from-pink-500/20 to-rose-500/20",
      image: firstDateImage,
    },
    {
      emoji: "🎂",
      title: t("mediaGallery.memories.1.title"),
      description: t("mediaGallery.memories.1.description"),
      color: "from-purple-500/20 to-pink-500/20",
      image: birthdayImage,
    },
    {
      emoji: "🌅",
      title: t("mediaGallery.memories.2.title"),
      description: t("mediaGallery.memories.2.description"),
      color: "from-orange-500/20 to-yellow-500/20",
      image: sunriseImage,
    },
    {
      emoji: "🎭",
      title: t("mediaGallery.memories.3.title"),
      description: t("mediaGallery.memories.3.description"),
      color: "from-blue-500/20 to-purple-500/20",
      image: concertImage,
    },
    {
      emoji: "🍝",
      title: t("mediaGallery.memories.4.title"),
      description: t("mediaGallery.memories.4.description"),
      color: "from-red-500/20 to-orange-500/20",
      image: cookingImage,
    },
    {
      emoji: "🌇",
      title: t("mediaGallery.memories.5.title"),
      description: t("mediaGallery.memories.5.description"),
      color: "from-amber-500/20 to-orange-500/20",
      image: sunsetImage,
    },
    {
      emoji: "✈️",
      title: t("mediaGallery.memories.6.title"),
      description: t("mediaGallery.memories.6.description"),
      color: "from-sky-500/20 to-indigo-500/20",
      image: firstTripImage,
    },
    {
      emoji: "🗺️",
      title: t("mediaGallery.memories.7.title"),
      description: t("mediaGallery.memories.7.description"),
      color: "from-green-500/20 to-teal-500/20",
      image: lastTripImage,
    },
    {
      emoji: "🌊",
      title: t("mediaGallery.memories.8.title"),
      description: t("mediaGallery.memories.8.description"),
      color: "from-blue-500/20 to-cyan-500/20",
      image: seaImage,
    },
  ];

  const minSwipeDistance = 50;

  const goToPrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? memories.length - 1 : selectedImage - 1);
    }
  }, [selectedImage, memories.length]);

  const goToNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === memories.length - 1 ? 0 : selectedImage + 1);
    }
  }, [selectedImage, memories.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext]);

  return (
    <section id="gallery" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            {t("mediaGallery.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("mediaGallery.subtitle")}
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
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-20 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-3"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-3"
              onClick={goToNext}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
              {selectedImage + 1} / {memories.length}
            </div>

            {/* Main Content */}
            <div 
              className="max-w-4xl w-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {memories[selectedImage].image ? (
                <div className="relative rounded-3xl overflow-hidden">
                  <img 
                    src={memories[selectedImage].image} 
                    alt={memories[selectedImage].title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-3xl select-none"
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-8 text-center">
                    <h3 className="text-2xl sm:text-4xl font-playfair font-bold text-white mb-2 sm:mb-4">
                      {memories[selectedImage].title}
                    </h3>
                    <p className="text-lg sm:text-xl text-white/90">
                      {memories[selectedImage].description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`bg-gradient-to-br ${memories[selectedImage].color} rounded-3xl p-8 sm:p-12 text-center`}>
                  <div className="text-6xl sm:text-8xl mb-6 animate-float">
                    {memories[selectedImage].emoji}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
                    {memories[selectedImage].title}
                  </h3>
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    {memories[selectedImage].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            {t("mediaGallery.clickHint")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
