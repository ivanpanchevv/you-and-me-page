import { useEffect, useState, useRef } from "react";
import { Heart, Key, Sparkles, Lock, Infinity } from "lucide-react";

const HeartLock = () => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isNearHeart, setIsNearHeart] = useState(false);
  const keyRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDate = new Date("2022-05-25");
  const today = new Date();
  const daysTogether = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const monthsTogether = Math.floor(daysTogether / 30);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isUnlocked) return;
    
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragPosition({
        x: e.clientX - rect.left - 40,
        y: e.clientY - rect.top - 40
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isUnlocked) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - 40;
      const y = e.clientY - rect.top - 40;
      setDragPosition({ x, y });
      
      const heartRect = heartRef.current?.getBoundingClientRect();
      const keyRect = keyRef.current?.getBoundingClientRect();
      
      if (heartRect && keyRect && rect) {
        const heartCenterX = heartRect.left + heartRect.width / 2 - rect.left;
        const heartCenterY = heartRect.top + heartRect.height / 2 - rect.top;
        const keyCenterX = keyRect.left + keyRect.width / 2 - rect.left;
        const keyCenterY = keyRect.top + keyRect.height / 2 - rect.top;
        
        const distance = Math.sqrt(
          Math.pow(heartCenterX - keyCenterX, 2) + 
          Math.pow(heartCenterY - keyCenterY, 2)
        );
        
        setIsNearHeart(distance < 100);
        
        if (distance < 50) {
          handleUnlock();
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (!isUnlocked) {
      setIsDragging(false);
      setIsNearHeart(false);
      setDragPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isUnlocked) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragPosition({
        x: touch.clientX - rect.left - 40,
        y: touch.clientY - rect.top - 40
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || isUnlocked) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left - 40;
      const y = touch.clientY - rect.top - 40;
      setDragPosition({ x, y });
      
      const heartRect = heartRef.current?.getBoundingClientRect();
      
      if (heartRect && rect) {
        const heartCenterX = heartRect.left + heartRect.width / 2 - rect.left;
        const heartCenterY = heartRect.top + heartRect.height / 2 - rect.top;
        const keyCenterX = x + 40;
        const keyCenterY = y + 40;
        
        const distance = Math.sqrt(
          Math.pow(heartCenterX - keyCenterX, 2) + 
          Math.pow(heartCenterY - keyCenterY, 2)
        );
        
        setIsNearHeart(distance < 100);
        
        if (distance < 50) {
          handleUnlock();
        }
      }
    }
  };

  const handleUnlock = () => {
    if (!isUnlocked) {
      setIsUnlocking(true);
      setIsDragging(false);
      setTimeout(() => {
        setIsUnlocked(true);
        setIsUnlocking(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, isUnlocked]);

  return (
    <section id="heart-lock" className="min-h-screen py-24 px-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-transparent to-purple-100/20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Our Love Story
          </h2>
          <p className="text-xl text-muted-foreground">
            {isUnlocked ? `${daysTogether} days of pure happiness` : "Drag the key to the heart to unlock our journey"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div ref={containerRef} className="relative w-80 h-80 flex items-center justify-center">
            {isUnlocked && (
              <>
                <Sparkles className="absolute top-8 left-12 w-6 h-6 text-yellow-400 animate-float" />
                <Sparkles className="absolute top-12 right-16 w-5 h-5 text-pink-400 animate-float-slow" />
                <Sparkles className="absolute bottom-16 left-16 w-5 h-5 text-purple-400 animate-float" />
                <Sparkles className="absolute bottom-12 right-12 w-6 h-6 text-blue-400 animate-float-slow" />
                <Sparkles className="absolute top-1/2 left-4 w-4 h-4 text-pink-500 animate-pulse" />
                <Sparkles className="absolute top-1/2 right-4 w-4 h-4 text-purple-500 animate-pulse" />
              </>
            )}

            <div ref={heartRef} className="relative">
              <div
                className={`transition-all duration-1000 ${
                  isUnlocked ? "scale-110" : isNearHeart ? "scale-105" : "scale-100"
                }`}
              >
                <Heart
                  className={`w-48 h-48 transition-all duration-1000 ${
                    isUnlocked
                      ? "text-pink-500 fill-pink-500"
                      : isNearHeart
                      ? "text-pink-400 fill-pink-400"
                      : "text-gray-400 fill-gray-300"
                  }`}
                  style={{
                    filter: isUnlocked 
                      ? "drop-shadow(0 0 40px rgba(236, 72, 153, 0.6))" 
                      : isNearHeart
                      ? "drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))"
                      : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>

              {!isUnlocked && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Lock className={`w-12 h-12 transition-all duration-300 ${
                    isNearHeart ? "text-pink-400 scale-110" : "text-gray-600"
                  }`} />
                </div>
              )}

              {isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center animate-fade-in">
                    <div className="text-5xl font-playfair font-bold text-white drop-shadow-lg">
                      {daysTogether}
                    </div>
                    <p className="text-xs text-white font-semibold mt-1 drop-shadow">Days of Love</p>
                  </div>
                </div>
              )}
            </div>

            <div
              ref={keyRef}
              className={`absolute transition-all ${
                isUnlocking
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-150"
                  : isUnlocked
                  ? "bottom-0 left-1/2 -translate-x-1/2 rotate-0 opacity-50"
                  : isDragging
                  ? "cursor-grabbing"
                  : "bottom-8 right-8 cursor-grab hover:scale-110"
              }`}
              style={{
                transform: isDragging 
                  ? `translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${isNearHeart ? '45deg' : '0deg'})`
                  : isUnlocking
                  ? 'translate(-50%, -50%) rotate(90deg) scale(1.5)'
                  : isUnlocked
                  ? 'translateX(-50%) rotate(0deg)'
                  : undefined,
                left: isDragging ? '0' : undefined,
                top: isDragging ? '0' : undefined,
                bottom: isDragging ? 'auto' : undefined,
                right: isDragging ? 'auto' : undefined,
                transition: isDragging ? 'none' : 'all 0.5s',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <Key
                className={`w-20 h-20 select-none transition-colors duration-300 ${
                  isUnlocked 
                    ? "text-gray-400" 
                    : isNearHeart
                    ? "text-yellow-500"
                    : isDragging 
                    ? "text-yellow-500" 
                    : "text-yellow-400"
                }`}
                style={{
                  filter: isUnlocked 
                    ? "none" 
                    : isNearHeart
                    ? "drop-shadow(0 0 30px rgba(250, 204, 21, 0.8))"
                    : "drop-shadow(0 4px 20px rgba(250, 204, 21, 0.5))",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur border border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-3xl mb-3">🐌</span>
              <p className="text-2xl font-bold text-gray-800">{(daysTogether * 0.03 * 24).toFixed(0)} km</p>
              <p className="text-sm text-gray-600">A snail could travel</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-10 h-10 text-purple-500 fill-purple-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">{monthsTogether}</p>
              <p className="text-sm text-gray-600">Months of Joy</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <Infinity className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">∞</p>
              <p className="text-sm text-gray-600">Years to Come</p>
            </div>
          </div>

          <div className="max-w-lg mx-auto text-center space-y-4">
            <p className="text-lg text-gray-700 italic font-medium">
              "Every day with you feels like unlocking a new chapter of happiness"
            </p>
            
            {isUnlocked && (
              <div className="animate-fade-in space-y-3 mt-8 p-6 bg-white/60 backdrop-blur rounded-2xl border border-pink-100">
                <p className="text-sm text-gray-600">
                  Since {startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  And counting every moment...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeartLock;