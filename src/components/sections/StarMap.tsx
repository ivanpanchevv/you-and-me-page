import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const StarMap = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Create naturally distributed stars
  const createStars = (width: number, height: number) => {
    const stars = [];
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        brightness: Math.random() * 0.3 + 0.7,
      });
    }
    
    return stars;
  };

  // Create heart constellation points
  const createHeartConstellation = (width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2 - height * 0.02; // Slightly higher position
    const scale = Math.min(width, height) * 0.18; // Bigger heart for better visibility
    
    const heartPoints = [];
    
    // Generate heart using improved parametric equations
    const numPoints = 16; // More points for smoother shape
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      
      // Enhanced heart equation with better proportions
      const heartX = 16 * Math.pow(Math.sin(t), 3);
      const heartY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      
      const x = centerX + scale * heartX / 16;
      const y = centerY - scale * heartY / 16; // Improved scaling
      
      heartPoints.push({
        x,
        y,
        size: 2.5 + Math.random() * 1.5, // More variation in size
        opacity: 1,
        twinkleSpeed: 0.008 + Math.random() * 0.012,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        brightness: 0.85 + Math.random() * 0.15,
      });
    }
    
    return heartPoints;
  };

  // Create connections between heart points
  const createHeartConnections = () => {
    const connections = [];
    const numPoints = 16;
    
    // Connect each point to the next one to form the heart outline
    for (let i = 0; i < numPoints; i++) {
      connections.push([i, (i + 1) % numPoints]);
    }
    
    // Add some inner connections for more constellation feel (optional)
    // Connect opposite points occasionally for a more complex pattern
    for (let i = 0; i < numPoints; i += 4) {
      if (i + 8 < numPoints) {
        connections.push([i, i + 8]);
      }
    }
    
    return connections;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    const stars = createStars(width, height);
    const heartConstellation = createHeartConstellation(width, height);
    const heartConnections = createHeartConnections();

    const animate = () => {
      // Clear canvas with dark night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(15, 10, 30, 1)");
      gradient.addColorStop(1, "rgba(26, 16, 46, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        // Update twinkling
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleDirection *= -1;
        }

        const currentOpacity = Math.max(0.2, Math.min(1, star.opacity * star.brightness));
        
        // Draw star glow
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.8})`);
        glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.3})`);
        glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add some colored stars occasionally
        if (Math.random() < 0.1) {
          const colors = ["rgba(173, 216, 230, 0.8)", "rgba(255, 182, 193, 0.8)", "rgba(255, 255, 224, 0.8)"];
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Heart constellation connections are now invisible - removed for cleaner look

      // Draw heart constellation stars
      heartConstellation.forEach((star, index) => {
        // Update twinkling
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity > 1 || star.opacity < 0.75) {
          star.twinkleDirection *= -1;
        }

        const currentOpacity = Math.max(0.75, Math.min(1, star.opacity * star.brightness));
        
        // Draw outer glow
        const outerGlowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 6);
        outerGlowGradient.addColorStop(0, `rgba(255, 182, 193, ${currentOpacity * 0.3})`);
        outerGlowGradient.addColorStop(0.3, `rgba(255, 182, 193, ${currentOpacity * 0.2})`);
        outerGlowGradient.addColorStop(1, "rgba(255, 182, 193, 0)");
        
        ctx.fillStyle = outerGlowGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw inner glow
        const innerGlowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        innerGlowGradient.addColorStop(0, `rgba(255, 182, 193, ${currentOpacity * 0.8})`);
        innerGlowGradient.addColorStop(0.5, `rgba(255, 182, 193, ${currentOpacity * 0.4})`);
        innerGlowGradient.addColorStop(1, "rgba(255, 182, 193, 0)");
        
        ctx.fillStyle = innerGlowGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core with gradient
        const coreGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        coreGradient.addColorStop(0.6, `rgba(255, 182, 193, ${currentOpacity})`);
        coreGradient.addColorStop(1, `rgba(255, 150, 150, ${currentOpacity * 0.8})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add bright sparkle center
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      stars.splice(0, stars.length, ...createStars(canvas.offsetWidth, canvas.offsetHeight));
      heartConstellation.splice(0, heartConstellation.length, ...createHeartConstellation(canvas.offsetWidth, canvas.offsetHeight));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="stars" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#16213e] select-none">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-float" />
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            {t("starMap.title")}
          </h2>
          <p className="text-lg text-blue-200/80">
            {t("starMap.subtitle")}
          </p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-[500px] rounded-2xl shadow-xl border border-blue-200/20"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-blue-200/70 italic text-base max-w-xl mx-auto">
            "{t("starMap.quote")}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default StarMap;