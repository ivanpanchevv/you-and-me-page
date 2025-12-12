import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-romantic.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-[10%] w-8 h-8 text-primary/30 animate-float" style={{ animationDelay: "0s" }} />
        <Heart className="absolute top-32 right-[15%] w-6 h-6 text-primary/20 animate-float-slow" style={{ animationDelay: "1s" }} />
        <Heart className="absolute bottom-40 left-[20%] w-10 h-10 text-primary/25 animate-float" style={{ animationDelay: "2s" }} />
        <Heart className="absolute bottom-32 right-[25%] w-7 h-7 text-primary/30 animate-float-slow" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block mb-6 animate-float">
          <Heart className="w-16 h-16 text-primary fill-primary" />
        </div>
        <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 text-foreground">
          {t("hero.title")}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
