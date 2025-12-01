import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";

const GrowingTree = () => {
  const [growth, setGrowth] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowth((prev) => {
        if (prev >= 100) {
          setShowHearts(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const daysTogetherr = Math.floor((new Date().getTime() - new Date("2023-06-15").getTime()) / (1000 * 60 * 60 * 24));

  return (
    <section id="tree" className="min-h-screen py-24 px-6 gradient-soft relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Growing Love
          </h2>
          <p className="text-xl text-muted-foreground">
            Like a tree, our love grows stronger with each passing day
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Tree Container */}
          <div className="relative h-[500px] flex items-end justify-center">
            {/* Trunk */}
            <div
              className="relative transition-all duration-1000 ease-out"
              style={{
                width: "60px",
                height: `${growth * 2}px`,
                background: "linear-gradient(to top, #8B4513, #A0522D)",
                borderRadius: "30px 30px 0 0",
              }}
            >
              {/* Tree Crown */}
              {growth > 50 && (
                <div className="absolute -top-40 left-1/2 transform -translate-x-1/2">
                  <div
                    className="relative transition-all duration-1000"
                    style={{
                      width: `${(growth - 50) * 4}px`,
                      height: `${(growth - 50) * 4}px`,
                      background: "radial-gradient(circle, #10b981, #059669)",
                      borderRadius: "50%",
                      opacity: (growth - 50) / 50,
                    }}
                  >
                    {/* Hearts on tree */}
                    {showHearts && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <Heart
                            key={i}
                            className="absolute text-primary fill-primary animate-float"
                            style={{
                              width: "20px",
                              height: "20px",
                              left: `${20 + Math.cos(i * Math.PI / 4) * 40}%`,
                              top: `${20 + Math.sin(i * Math.PI / 4) * 40}%`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Branches */}
              {growth > 30 && (
                <>
                  <div
                    className="absolute top-1/3 -left-8 w-12 h-2 bg-gradient-to-l from-[#A0522D] to-transparent rounded-full transition-all"
                    style={{ opacity: (growth - 30) / 70 }}
                  />
                  <div
                    className="absolute top-1/3 -right-8 w-12 h-2 bg-gradient-to-r from-[#A0522D] to-transparent rounded-full transition-all"
                    style={{ opacity: (growth - 30) / 70 }}
                  />
                  <div
                    className="absolute top-1/2 -left-10 w-14 h-2 bg-gradient-to-l from-[#A0522D] to-transparent rounded-full transition-all"
                    style={{ opacity: (growth - 40) / 60 }}
                  />
                  <div
                    className="absolute top-1/2 -right-10 w-14 h-2 bg-gradient-to-r from-[#A0522D] to-transparent rounded-full transition-all"
                    style={{ opacity: (growth - 40) / 60 }}
                  />
                </>
              )}
            </div>

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-green-800 via-green-700 to-green-800 rounded-full" />
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-5xl font-playfair font-bold text-primary mb-2">
                {daysTogetherr}
              </div>
              <p className="text-muted-foreground">Days Together</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-playfair font-bold text-primary mb-2">
                {growth}%
              </div>
              <p className="text-muted-foreground">Love Growth</p>
            </div>
          </div>

          {showHearts && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">
                  Our love is fully bloomed!
                </span>
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground italic">
            "Love is like a tree, it grows deeper and stronger with time" 🌳
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowingTree;
