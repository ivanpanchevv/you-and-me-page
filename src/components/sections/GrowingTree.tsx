import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

// Design constants for easy maintenance
const TREE_CONFIG = {
  canopy: {
    size: 200, // Canopy diameter in pixels
    color: "hsl(var(--primary))", // Using semantic token
  },
  trunk: {
    width: 48, // Trunk width in pixels
    height: 160, // Trunk height in pixels
  },
  hearts: [
    { top: "15%", left: "50%", size: 20, delay: 0 },
    { top: "35%", left: "25%", size: 16, delay: 0.2 },
    { top: "35%", right: "25%", size: 16, delay: 0.4 },
    { top: "60%", left: "35%", size: 18, delay: 0.6 },
    { top: "60%", right: "35%", size: 18, delay: 0.8 },
  ],
  animation: {
    duration: 1500, // Growth animation duration in ms
    delay: 300, // Initial delay before animation starts
  },
};

const GrowingTree = () => {
  const [isGrown, setIsGrown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsGrown(true), TREE_CONFIG.animation.delay);
    return () => clearTimeout(timer);
  }, []);

  const daysTogether = Math.floor(
    (new Date().getTime() - new Date("2023-06-15").getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section id="tree" className="min-h-screen py-24 px-6 gradient-soft relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Growing Love
          </h2>
          <p className="text-xl text-muted-foreground">
            Like a tree, our love grows stronger with each passing day
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Tree Visualization */}
          <div 
            className="relative flex items-end justify-center"
            style={{ 
              width: `${TREE_CONFIG.canopy.size + 64}px`,
              height: `${TREE_CONFIG.trunk.height + TREE_CONFIG.canopy.size + 40}px` 
            }}
          >
            {/* Canopy */}
            <div
              className={`absolute transition-all ease-out ${
                isGrown ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                bottom: `${TREE_CONFIG.trunk.height - 20}px`,
                width: `${TREE_CONFIG.canopy.size}px`,
                height: `${TREE_CONFIG.canopy.size}px`,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.8))`,
                transitionDuration: `${TREE_CONFIG.animation.duration}ms`,
                boxShadow: "0 20px 40px hsl(var(--primary) / 0.2)",
              }}
            >
              {/* Hearts positioned within canopy */}
              {isGrown && TREE_CONFIG.hearts.map((heart, i) => (
                <Heart
                  key={i}
                  className="absolute text-background fill-background animate-float"
                  style={{
                    width: `${heart.size}px`,
                    height: `${heart.size}px`,
                    top: heart.top,
                    left: heart.left,
                    right: heart.right,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${heart.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Trunk */}
            <div
              className={`bg-gradient-to-b from-muted to-muted-foreground rounded-t-2xl transition-all ease-out ${
                isGrown ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: `${TREE_CONFIG.trunk.width}px`,
                height: isGrown ? `${TREE_CONFIG.trunk.height}px` : "0px",
                transitionDuration: `${TREE_CONFIG.animation.duration * 0.8}ms`,
                boxShadow: "0 10px 20px hsl(var(--foreground) / 0.1)",
              }}
            />

            {/* Ground line */}
            <div 
              className="absolute bottom-0 h-1 rounded-full bg-muted-foreground/20"
              style={{ width: `${TREE_CONFIG.canopy.size + 32}px` }}
            />

            {/* Subtle shadow */}
            <div
              className={`absolute bottom-0 rounded-full bg-foreground/5 blur-md transition-opacity duration-1000 ${
                isGrown ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: `${TREE_CONFIG.canopy.size * 0.8}px`,
                height: "16px",
              }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md animate-fade-in">
            <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover-scale">
              <div className="text-5xl font-playfair font-bold text-primary mb-2">
                {daysTogether}
              </div>
              <p className="text-muted-foreground text-sm">Days Together</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover-scale">
              <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Forever Growing</p>
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg text-center text-muted-foreground italic max-w-lg animate-fade-in">
            "Love is like a tree, it grows deeper and stronger with time"
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowingTree;
