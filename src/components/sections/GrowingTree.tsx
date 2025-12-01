import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const GrowingTree = () => {
  const [isGrown, setIsGrown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsGrown(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const daysTogether = Math.floor(
    (new Date().getTime() - new Date("2023-06-15").getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section id="tree" className="min-h-screen py-24 px-6 gradient-soft relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Growing Love
          </h2>
          <p className="text-xl text-muted-foreground">
            Like a tree, our love grows stronger with each passing day
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Tree Visualization */}
          <div className="relative w-64 h-80 flex items-end justify-center">
            {/* Tree Crown */}
            <div
              className={`absolute bottom-32 transition-all duration-[2000ms] ease-out ${
                isGrown ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
                {/* Hearts */}
                {isGrown && (
                  <>
                    <Heart className="absolute top-4 left-8 w-6 h-6 text-primary fill-primary animate-float" />
                    <Heart className="absolute top-8 right-6 w-5 h-5 text-primary fill-primary animate-float-slow" />
                    <Heart className="absolute bottom-10 left-6 w-5 h-5 text-primary fill-primary animate-float" />
                    <Heart className="absolute bottom-6 right-8 w-6 h-6 text-primary fill-primary animate-float-slow" />
                  </>
                )}
              </div>
            </div>

            {/* Trunk */}
            <div
              className={`w-16 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-lg transition-all duration-[1500ms] ease-out ${
                isGrown ? "h-40" : "h-0"
              }`}
            />

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-3 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 rounded-full" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-md">
            <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur border border-border">
              <div className="text-5xl font-playfair font-bold text-primary mb-2">
                {daysTogether}
              </div>
              <p className="text-muted-foreground">Days Together</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur border border-border">
              <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Growing Forever</p>
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg text-center text-muted-foreground italic max-w-lg">
            "Love is like a tree, it grows deeper and stronger with time" 🌳
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowingTree;
