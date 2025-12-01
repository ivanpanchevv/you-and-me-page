import { useEffect, useState } from "react";
import { Heart, Key, Sparkles } from "lucide-react";

const HeartLock = () => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlockTimer = setTimeout(() => {
      setIsUnlocking(true);
      setTimeout(() => setIsUnlocked(true), 1500);
    }, 500);
    return () => clearTimeout(unlockTimer);
  }, []);

  const daysTogether = Math.floor(
    (new Date().getTime() - new Date("2023-06-15").getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section id="heart-lock" className="min-h-screen py-24 px-6 gradient-soft relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Unlocking Our Love
          </h2>
          <p className="text-xl text-muted-foreground">
            You hold the key to my heart
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Lock & Key Animation */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Sparkles when unlocked */}
            {isUnlocked && (
              <>
                <Sparkles className="absolute top-8 left-12 w-6 h-6 text-primary animate-float" />
                <Sparkles className="absolute top-12 right-16 w-5 h-5 text-primary animate-float-slow" />
                <Sparkles className="absolute bottom-16 left-16 w-5 h-5 text-primary animate-float" />
                <Sparkles className="absolute bottom-12 right-12 w-6 h-6 text-primary animate-float-slow" />
              </>
            )}

            {/* Heart Lock */}
            <div className="relative">
              {/* Outer heart */}
              <div
                className={`transition-all duration-1000 ${
                  isUnlocked ? "scale-110" : "scale-100"
                }`}
              >
                <Heart
                  className={`w-48 h-48 transition-all duration-1000 ${
                    isUnlocked
                      ? "text-primary fill-primary"
                      : "text-muted-foreground fill-muted"
                  }`}
                  style={{
                    filter: isUnlocked ? "drop-shadow(0 0 30px hsl(var(--primary) / 0.6))" : "none",
                  }}
                />
              </div>

              {/* Keyhole */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isUnlocked ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              >
                <div className="relative">
                  {/* Circle part of keyhole */}
                  <div className="w-8 h-8 rounded-full bg-background border-4 border-foreground" />
                  {/* Rectangle part of keyhole */}
                  <div className="w-4 h-6 bg-background border-4 border-t-0 border-foreground mx-auto" />
                </div>
              </div>

              {/* Days counter (revealed when unlocked) */}
              {isUnlocked && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in">
                  <div className="text-5xl font-playfair font-bold text-background">
                    {daysTogether}
                  </div>
                  <p className="text-xs text-background font-semibold mt-1">Days</p>
                </div>
              )}
            </div>

            {/* Key Animation */}
            <Key
              className={`absolute w-20 h-20 text-primary transition-all duration-1500 ${
                isUnlocking
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-0"
                  : "bottom-4 right-8 -rotate-45"
              }`}
              style={{
                filter: "drop-shadow(0 4px 12px hsl(var(--primary) / 0.4))",
              }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md animate-fade-in">
            <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover-scale">
              <Key className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">You're My Key</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover-scale">
              <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-2 animate-pulse" />
              <p className="text-muted-foreground text-sm">
                {isUnlocked ? "Heart Unlocked! 💕" : "Unlocking..."}
              </p>
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg text-center text-muted-foreground italic max-w-lg animate-fade-in">
            "You opened my heart and unlocked a love I never knew existed"
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeartLock;
