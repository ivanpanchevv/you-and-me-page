import { useEffect, useState } from "react";
import { Heart, Flame } from "lucide-react";

const THERMOMETER_CONFIG = {
  height: 320, // Thermometer height in pixels
  width: 80, // Thermometer width
  bulbSize: 100, // Bottom bulb diameter
  fillDuration: 2000, // Animation duration
  maxLevel: 100, // Maximum fill percentage
};

const LoveThermometer = () => {
  const [fillLevel, setFillLevel] = useState(0);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFillLevel(100);
      setTimeout(() => setIsFilled(true), THERMOMETER_CONFIG.fillDuration);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const daysTogether = Math.floor(
    (new Date().getTime() - new Date("2023-06-15").getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section id="thermometer" className="min-h-screen py-24 px-6 gradient-soft relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Love Meter
          </h2>
          <p className="text-xl text-muted-foreground">
            Measuring the warmth of our growing love
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Thermometer Visualization */}
          <div className="relative flex flex-col items-center">
            {/* Floating hearts at top */}
            {isFilled && (
              <div className="absolute -top-20 flex gap-4 animate-fade-in">
                <Heart className="w-8 h-8 text-primary fill-primary animate-float" />
                <Flame className="w-10 h-10 text-primary animate-float-slow" />
                <Heart className="w-8 h-8 text-primary fill-primary animate-float" />
              </div>
            )}

            {/* Thermometer tube */}
            <div
              className="relative bg-card border-4 border-border rounded-full overflow-hidden shadow-lg"
              style={{
                width: `${THERMOMETER_CONFIG.width}px`,
                height: `${THERMOMETER_CONFIG.height}px`,
              }}
            >
              {/* Fill */}
              <div
                className="absolute bottom-0 w-full transition-all ease-out rounded-full"
                style={{
                  height: `${fillLevel}%`,
                  background: "linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.6))",
                  transitionDuration: `${THERMOMETER_CONFIG.fillDuration}ms`,
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
                }}
              >
                {/* Animated hearts inside fill */}
                {fillLevel > 30 && (
                  <>
                    <Heart 
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-5 h-5 text-background fill-background animate-float" 
                    />
                    <Heart 
                      className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-4 text-background fill-background animate-float-slow" 
                    />
                    <Heart 
                      className="absolute top-32 left-1/2 -translate-x-1/2 w-5 h-5 text-background fill-background animate-float" 
                    />
                  </>
                )}
              </div>

              {/* Measurement marks */}
              <div className="absolute inset-0 pointer-events-none">
                {[25, 50, 75, 100].map((mark) => (
                  <div
                    key={mark}
                    className="absolute right-0 w-6 h-0.5 bg-border"
                    style={{ bottom: `${mark}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Thermometer bulb */}
            <div
              className="relative -mt-8 rounded-full border-4 border-border shadow-lg overflow-hidden"
              style={{
                width: `${THERMOMETER_CONFIG.bulbSize}px`,
                height: `${THERMOMETER_CONFIG.bulbSize}px`,
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                  background: fillLevel > 0
                    ? "radial-gradient(circle at center, hsl(var(--primary)), hsl(var(--primary) / 0.8))"
                    : "hsl(var(--card))",
                  boxShadow: fillLevel > 0 ? "0 0 40px hsl(var(--primary) / 0.6)" : "none",
                }}
              >
                {isFilled && (
                  <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-background animate-pulse" />
                )}
              </div>
            </div>

            {/* Temperature label */}
            <div className="mt-6 text-center">
              <div className="text-6xl font-playfair font-bold text-primary">
                {fillLevel}°
              </div>
              <p className="text-muted-foreground text-sm mt-1">of Pure Love</p>
            </div>
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
              <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-2 animate-pulse" />
              <p className="text-muted-foreground text-sm">Temperature: Hot! 🔥</p>
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg text-center text-muted-foreground italic max-w-lg animate-fade-in">
            "The temperature of love keeps rising with every moment together"
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveThermometer;
