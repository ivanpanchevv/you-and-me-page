import { useEffect, useRef } from "react";
import { Star, Heart } from "lucide-react";

const StarMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number; twinkleSpeed: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Create constellation (simple heart shape)
    const heartConstellation = [
      { x: 0.45, y: 0.4 },
      { x: 0.47, y: 0.35 },
      { x: 0.5, y: 0.33 },
      { x: 0.53, y: 0.35 },
      { x: 0.55, y: 0.4 },
      { x: 0.5, y: 0.5 },
      { x: 0.45, y: 0.4 },
    ].map(point => ({
      x: point.x * canvas.width,
      y: point.y * canvas.height,
    }));

    let frame = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(15, 10, 30, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0) {
          star.twinkleSpeed *= -1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw constellation lines
      ctx.strokeStyle = "rgba(251, 113, 133, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      heartConstellation.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      // Draw constellation stars (bigger and brighter)
      heartConstellation.forEach((point) => {
        const pulse = Math.sin(frame * 0.05) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(251, 113, 133, ${pulse})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.fillStyle = `rgba(251, 113, 133, ${pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="stars" className="min-h-screen py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2e]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-float" />
            <Heart className="w-8 h-8 text-primary fill-primary animate-float-slow" />
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-white">
            Our Constellation
          </h2>
          <p className="text-xl text-pink-200">
            Like stars aligned, we were meant to find each other
          </p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-[600px] rounded-3xl shadow-2xl"
          />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-white/80 text-lg font-playfair mb-2">
                June 15, 2023
              </p>
              <p className="text-pink-300 text-sm">
                The night the stars aligned for us
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-pink-200 italic text-lg">
            "Under the same sky, dreaming the same dreams" ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default StarMap;
