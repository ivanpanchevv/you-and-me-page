import { useState, useEffect } from "react";
import { Heart, Cookie, Hand } from "lucide-react";

interface PetStats {
  happiness: number;
  hunger: number;
  energy: number;
  lastFed: number;
  lastPetted: number;
}

const VirtualPet = () => {
  const [petStats, setPetStats] = useState<PetStats>({
    happiness: 80,
    hunger: 60,
    energy: 70,
    lastFed: Date.now(),
    lastPetted: Date.now(),
  });
  
  const [isBeingPetted, setIsBeingPetted] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [showFeedingTreat, setShowFeedingTreat] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Auto-decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 0.1),
        hunger: Math.max(0, prev.hunger - 0.2),
        energy: Math.max(0, prev.energy - 0.15),
      }));
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine pet's current mood
  const getPetMood = () => {
    if (petStats.energy < 30) return "sleepy";
    if (petStats.hunger < 30) return "hungry";
    if (petStats.happiness > 80) return "very-happy";
    if (petStats.happiness > 60) return "happy";
    if (petStats.happiness < 30) return "sad";
    return "neutral";
  };

  // Get dog emoji based on mood
  const getDogEmoji = () => {
    const mood = getPetMood();
    switch (mood) {
      case "very-happy": return "🐕";
      case "happy": return "🐶";
      case "hungry": return "🐕‍🦺";
      case "sleepy": return "😴";
      case "sad": return "🐕";
      default: return "🐶";
    }
  };

  // Feed the pet
  const feedPet = () => {
    if (isEating) return;
    
    setIsEating(true);
    setShowFeedingTreat(true);
    
    setPetStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 15),
      lastFed: Date.now(),
    }));

    setTimeout(() => {
      setShowFeedingTreat(false);
      setIsEating(false);
    }, 2000);
  };

  // Pet the dog
  const petDog = () => {
    if (isBeingPetted) return;
    
    setIsBeingPetted(true);
    setShowHearts(true);
    
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.min(100, prev.energy + 10),
      lastPetted: Date.now(),
    }));

    setTimeout(() => {
      setShowHearts(false);
      setIsBeingPetted(false);
    }, 1500);
  };

  // Put pet to sleep
  const sleepPet = () => {
    if (isSleeping) return;
    
    setIsSleeping(true);
    
    setPetStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      happiness: Math.min(100, prev.happiness + 10),
    }));

    setTimeout(() => {
      setIsSleeping(false);
    }, 3000);
  };

  const getStatusMessage = () => {
    const mood = getPetMood();
    switch (mood) {
      case "very-happy": return "I'm so happy! Life is great! 🌟";
      case "happy": return "I'm feeling good! Thanks for taking care of me! 😊";
      case "hungry": return "I'm getting hungry... Could you feed me? 🍖";
      case "sleepy": return "I'm feeling tired... Maybe time for a nap? 💤";
      case "sad": return "I need some love and attention... 💙";
      default: return "Just chilling here! What should we do? 🐾";
    }
  };

  const getStatColor = (value: number) => {
    if (value > 70) return "text-green-500";
    if (value > 40) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatBgColor = (value: number) => {
    if (value > 70) return "bg-green-500";
    if (value > 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get appropriate ear animation based on state and mood
  const getEarAnimation = () => {
    if (isSleeping) return '';
    if (isBeingPetted) return 'ear-excited';
    if (isEating) return 'ear-alert';
    
    const mood = getPetMood();
    if (mood === 'very-happy' || mood === 'happy') return 'ear-perky';
    if (mood === 'hungry') return 'ear-alert';
    if (mood === 'sad') return 'ear-droopy';
    return 'ear-idle';
  };

  // Get appropriate eye animation based on state
  const getEyeAnimation = () => {
    if (isSleeping) return 'eye-closed';
    if (isBeingPetted) return 'eye-happy';
    if (isEating) return 'eye-focused';
    
    const mood = getPetMood();
    if (mood === 'very-happy') return 'eye-bright';
    if (mood === 'sad') return 'eye-sad';
    return 'eye-normal';
  };

  // Animated Dog Component
  const AnimatedDog = () => {
    const mood = getPetMood();
    
    return (
      <div className={`relative inline-block cursor-pointer ${isBeingPetted ? 'pet-excited' : ''} ${isEating ? 'pet-eating' : ''}`} onClick={petDog}>
        <svg width="220" height="200" viewBox="0 0 220 200" className="dog-container w-full h-auto max-w-[180px] sm:max-w-[220px]">
          {/* Drop shadow for depth */}
          <ellipse cx="110" cy="185" rx="50" ry="8" fill="rgba(0,0,0,0.2)" className="dog-shadow"/>
          
          {/* Dog Body - Light gray base */}
          <ellipse cx="110" cy="130" rx="50" ry="35" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2" className="dog-body"/>
          
          {/* Body shading for 3D effect */}
          <ellipse cx="105" cy="125" rx="45" ry="30" fill="#D3D3D3" className="dog-body-highlight"/>
          
          {/* Dog markings - darker gray spots */}
          <ellipse cx="90" cy="120" rx="18" ry="25" fill="#808080" className="dog-body-spot"/>
          <ellipse cx="135" cy="135" rx="15" ry="20" fill="#808080" className="dog-body-spot"/>
          <ellipse cx="110" cy="115" rx="12" ry="8" fill="#808080" className="dog-body-spot"/>
          
          {/* Dog Head - Light gray */}
          <circle cx="110" cy="85" r="38" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2" className="dog-head"/>
          
          {/* Head highlight for 3D effect */}
          <ellipse cx="105" cy="80" rx="32" ry="35" fill="#D3D3D3" className="dog-head-highlight"/>
          
          {/* Dog Muzzle - slightly lighter */}
          <ellipse cx="110" cy="95" rx="18" ry="12" fill="#D3D3D3" stroke="#B0B0B0" strokeWidth="1" className="dog-muzzle"/>
          
          {/* Muzzle highlight */}
          <ellipse cx="108" cy="92" rx="12" ry="8" fill="#E0E0E0" className="dog-muzzle-highlight"/>
          
          {/* Dog Ears - Medium gray, more realistic shape */}
          <ellipse cx="85" cy="55" rx="12" ry="22" fill="#A0A0A0" stroke="#808080" strokeWidth="1" 
                   className={`dog-ear-left ${getEarAnimation()}`}/>
          <ellipse cx="135" cy="55" rx="12" ry="22" fill="#A0A0A0" stroke="#808080" strokeWidth="1"
                   className={`dog-ear-right ${getEarAnimation()}`}/>
          
          {/* Ear inner parts */}
          <ellipse cx="87" cy="58" rx="7" ry="15" fill="#B0B0B0" 
                   className={`dog-ear-inner-left ${getEarAnimation()}`}/>
          <ellipse cx="133" cy="58" rx="7" ry="15" fill="#B0B0B0"
                   className={`dog-ear-inner-right ${getEarAnimation()}`}/>
          
          {/* Dog Eyes - larger and more expressive */}
          {isSleeping ? (
            <>
              {/* Sleeping eyes - closed lids that match dog's color */}
              <ellipse cx="100" cy="78" rx="6" ry="1.5" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="0.5" className="dog-eye-closed"/>
              <ellipse cx="120" cy="78" rx="6" ry="1.5" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="0.5" className="dog-eye-closed"/>
              {/* Subtle eyelash lines */}
              <path d="M 94 78 Q 100 76 106 78" stroke="#808080" strokeWidth="1" fill="none" className="eyelash"/>
              <path d="M 114 78 Q 120 76 126 78" stroke="#808080" strokeWidth="1" fill="none" className="eyelash"/>
            </>
          ) : (
            <>
              <ellipse cx="100" cy="78" rx="6" ry="5" fill="#FFF" className="dog-eye-white"/>
              <ellipse cx="120" cy="78" rx="6" ry="5" fill="#FFF" className="dog-eye-white"/>
              <circle cx="100" cy="78" r="4" fill="#2C1810" className="dog-eye"/>
              <circle cx="120" cy="78" r="4" fill="#2C1810" className="dog-eye"/>
              
              {/* Eye pupils and shine */}
              <circle cx="101" cy="78" r="2" fill="#000" className="dog-pupil"/>
              <circle cx="121" cy="78" r="2" fill="#000" className="dog-pupil"/>
              <circle cx="102" cy="76" r="1" fill="#FFF" className="eye-shine"/>
              <circle cx="122" cy="76" r="1" fill="#FFF" className="eye-shine"/>
            </>
          )}
          
          {/* Dog Nose - wet looking */}
          <ellipse cx="110" cy="88" rx="4" ry="3" fill="#2C1810" className="dog-nose"/>
          <ellipse cx="109" cy="87" rx="1.5" ry="1" fill="#4A4A4A" className="nose-highlight"/>
          
          {/* Dog Mouth and smile */}
          <path d="M 110 92 Q 105 96 98 94" stroke="#2C1810" strokeWidth="2" fill="none" 
                className={`dog-mouth ${mood === 'very-happy' || mood === 'happy' ? 'mouth-happy' : 'mouth-neutral'}`}/>
          <path d="M 110 92 Q 115 96 122 94" stroke="#2C1810" strokeWidth="2" fill="none" 
                className={`dog-mouth ${mood === 'very-happy' || mood === 'happy' ? 'mouth-happy' : 'mouth-neutral'}`}/>
          
          {/* Dog Tongue (when eating or very happy, but not sleeping) */}
          {(isEating || mood === 'very-happy') && !isSleeping && (
            <ellipse cx="110" cy="100" rx="8" ry="10" fill="#FF6B9D" stroke="#E55A87" strokeWidth="1" className="dog-tongue"/>
          )}
          
          {/* Dog Legs - more realistic with joints */}
          <rect x="85" y="155" width="10" height="28" rx="5" fill="#B0B0B0" stroke="#909090" strokeWidth="1" className="dog-leg"/>
          <rect x="100" y="155" width="10" height="28" rx="5" fill="#B0B0B0" stroke="#909090" strokeWidth="1" className="dog-leg"/>
          <rect x="115" y="155" width="10" height="28" rx="5" fill="#B0B0B0" stroke="#909090" strokeWidth="1" className="dog-leg"/>
          <rect x="130" y="155" width="10" height="28" rx="5" fill="#B0B0B0" stroke="#909090" strokeWidth="1" className="dog-leg"/>
          
          {/* Leg highlights for 3D effect */}
          <rect x="86" y="156" width="6" height="24" rx="3" fill="#C0C0C0" className="dog-leg-highlight"/>
          <rect x="101" y="156" width="6" height="24" rx="3" fill="#C0C0C0" className="dog-leg-highlight"/>
          <rect x="116" y="156" width="6" height="24" rx="3" fill="#C0C0C0" className="dog-leg-highlight"/>
          <rect x="131" y="156" width="6" height="24" rx="3" fill="#C0C0C0" className="dog-leg-highlight"/>
          
          {/* Paws - darker oval shape */}
          <ellipse cx="90" cy="185" rx="8" ry="5" fill="#808080" stroke="#606060" strokeWidth="1" className="dog-paw"/>
          <ellipse cx="105" cy="185" rx="8" ry="5" fill="#808080" stroke="#606060" strokeWidth="1" className="dog-paw"/>
          <ellipse cx="120" cy="185" rx="8" ry="5" fill="#808080" stroke="#606060" strokeWidth="1" className="dog-paw"/>
          <ellipse cx="135" cy="185" rx="8" ry="5" fill="#808080" stroke="#606060" strokeWidth="1" className="dog-paw"/>
          
          {/* Paw pads for realism */}
          <ellipse cx="90" cy="184" rx="4" ry="2" fill="#606060" className="paw-pad"/>
          <ellipse cx="105" cy="184" rx="4" ry="2" fill="#606060" className="paw-pad"/>
          <ellipse cx="120" cy="184" rx="4" ry="2" fill="#606060" className="paw-pad"/>
          <ellipse cx="135" cy="184" rx="4" ry="2" fill="#606060" className="paw-pad"/>
          
          {/* Dog Tail - curved and fluffy */}
          <path d="M 160 130 Q 180 110 175 90 Q 170 85 165 88" stroke="#A0A0A0" strokeWidth="14" strokeLinecap="round" fill="none" 
                className={`dog-tail ${isSleeping ? '' : isBeingPetted || mood === 'very-happy' || mood === 'happy' ? 'tail-wag-fast' : mood === 'sad' ? 'tail-down' : 'tail-wag-slow'}`}/>
          
          {/* Tail highlight */}
          <path d="M 160 130 Q 180 110 175 90" stroke="#C0C0C0" strokeWidth="8" strokeLinecap="round" fill="none" 
                className={`dog-tail-highlight ${isSleeping ? '' : isBeingPetted || mood === 'very-happy' || mood === 'happy' ? 'tail-wag-fast' : mood === 'sad' ? 'tail-down' : 'tail-wag-slow'}`}/>
        </svg>

        {/* Floating Hearts */}
        {showHearts && (
          <>
            <div className="absolute -top-4 -left-4 text-2xl floating-heart">❤️</div>
            <div className="absolute -top-8 right-0 text-2xl floating-heart" style={{animationDelay: '0.3s'}}>💕</div>
            <div className="absolute -top-6 left-8 text-2xl floating-heart" style={{animationDelay: '0.6s'}}>💖</div>
          </>
        )}

        {/* Feeding Treat */}
        {showFeedingTreat && (
          <div className="absolute -top-6 right-4 text-3xl floating-treat">🍖</div>
        )}

        {/* Sleeping Z's */}
        {isSleeping && (
          <>
            <div className="absolute -top-8 right-2 text-2xl sleeping-z">💤</div>
            <div className="absolute -top-12 right-8 text-xl sleeping-z" style={{animationDelay: '0.5s'}}>💤</div>
          </>
        )}
      </div>
    );
  };

  return (
    <section id="pet" className="py-12 sm:py-24 px-6 gradient-soft">
      <style>{`
        /* Breathing Animation */
        @keyframes breathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.02) translateY(-2px); }
        }

        /* Tail Wagging */
        @keyframes tail-wag-slow {
          0%, 100% { transform-origin: 145px 120px; transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }

        @keyframes tail-wag-fast {
          0%, 100% { transform-origin: 145px 120px; transform: rotate(-5deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }

        @keyframes tail-down {
          0%, 100% { transform-origin: 145px 120px; transform: rotate(20deg); }
        }

        /* Ear Movements - Bottom Fixed, Top Moves */
        @keyframes ear-excited {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
          25% { transform-origin: 50% 100%; transform: rotate(-8deg); }
          75% { transform-origin: 50% 100%; transform: rotate(8deg); }
        }

        @keyframes ear-alert {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
          50% { transform-origin: 50% 100%; transform: rotate(5deg); }
        }

        @keyframes ear-perky {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
          50% { transform-origin: 50% 100%; transform: rotate(3deg); }
        }

        @keyframes ear-droopy {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
          50% { transform-origin: 50% 100%; transform: rotate(-4deg); }
        }

        @keyframes ear-relaxed {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
        }

        @keyframes ear-idle {
          0%, 100% { transform-origin: 50% 100%; transform: rotate(0deg); }
          50% { transform-origin: 50% 100%; transform: rotate(2deg); }
        }

        /* Eye Animations - More Expressive */
        @keyframes eye-normal {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes eye-happy {
          0%, 100% { transform: scaleY(0.7) scaleX(1.1); }
          50% { transform: scaleY(0.9) scaleX(1.2); }
        }

        @keyframes eye-bright {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
        }

        @keyframes eye-sad {
          0%, 100% { transform: scaleY(0.6) translateY(1px); }
          50% { transform: scaleY(0.5) translateY(2px); }
        }

        @keyframes eye-focused {
          0%, 100% { transform: scaleX(0.9); }
          50% { transform: scaleX(0.8); }
        }

        @keyframes eye-closed {
          0%, 100% { transform: scaleY(0.1); }
        }

        @keyframes sleeping-eyelids {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.9); }
        }

        /* Body Animations */
        @keyframes pet-excited {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(-1deg); }
          75% { transform: scale(1.05) rotate(1deg); }
        }

        @keyframes pet-eating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        /* Floating Effects */
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-60px) scale(0.5); opacity: 0; }
        }

        /* CSS Classes */
        .dog-container {
          animation: breathe 3s ease-in-out infinite;
        }

        .pet-excited .dog-container {
          animation: pet-excited 0.6s ease-in-out, breathe 3s ease-in-out infinite;
        }

        .pet-eating .dog-container {
          animation: pet-eating 0.3s ease-in-out infinite, breathe 3s ease-in-out infinite;
        }

        .dog-tail.tail-wag-slow, .dog-tail-tip.tail-wag-slow, .dog-tail-highlight.tail-wag-slow {
          animation: tail-wag-slow 2s ease-in-out infinite;
        }

        .dog-tail.tail-wag-fast, .dog-tail-tip.tail-wag-fast, .dog-tail-highlight.tail-wag-fast {
          animation: tail-wag-fast 0.5s ease-in-out infinite;
        }

        .dog-tail.tail-down, .dog-tail-tip.tail-down, .dog-tail-highlight.tail-down {
          animation: tail-down 1s ease-out;
        }

        /* Ear Animation Classes */
        .dog-ear-left.ear-excited, .dog-ear-right.ear-excited, 
        .dog-ear-inner-left.ear-excited, .dog-ear-inner-right.ear-excited {
          animation: ear-excited 0.4s ease-in-out infinite;
        }

        .dog-ear-left.ear-alert, .dog-ear-right.ear-alert,
        .dog-ear-inner-left.ear-alert, .dog-ear-inner-right.ear-alert {
          animation: ear-alert 1s ease-in-out infinite;
        }

        .dog-ear-left.ear-perky, .dog-ear-right.ear-perky,
        .dog-ear-inner-left.ear-perky, .dog-ear-inner-right.ear-perky {
          animation: ear-perky 2s ease-in-out infinite;
        }

        .dog-ear-left.ear-droopy, .dog-ear-right.ear-droopy,
        .dog-ear-inner-left.ear-droopy, .dog-ear-inner-right.ear-droopy {
          animation: ear-droopy 3s ease-in-out infinite;
        }

        .dog-ear-left.ear-relaxed, .dog-ear-right.ear-relaxed,
        .dog-ear-inner-left.ear-relaxed, .dog-ear-inner-right.ear-relaxed {
          animation: ear-relaxed 1s ease-out forwards;
        }

        .dog-ear-left.ear-idle, .dog-ear-right.ear-idle,
        .dog-ear-inner-left.ear-idle, .dog-ear-inner-right.ear-idle {
          animation: ear-idle 4s ease-in-out infinite;
        }

        /* Eye Animation Classes */
        .dog-eye.eye-normal, .dog-eye-white.eye-normal, .dog-pupil.eye-normal, .eye-shine.eye-normal {
          animation: eye-normal 6s ease-in-out infinite;
        }

        .dog-eye.eye-happy, .dog-eye-white.eye-happy, .dog-pupil.eye-happy, .eye-shine.eye-happy {
          animation: eye-happy 1s ease-in-out infinite;
        }

        .dog-eye.eye-bright, .dog-eye-white.eye-bright, .dog-pupil.eye-bright, .eye-shine.eye-bright {
          animation: eye-bright 0.8s ease-in-out infinite;
        }

        .dog-eye.eye-sad, .dog-eye-white.eye-sad, .dog-pupil.eye-sad, .eye-shine.eye-sad {
          animation: eye-sad 2s ease-in-out infinite;
        }

        .dog-eye.eye-focused, .dog-eye-white.eye-focused, .dog-pupil.eye-focused, .eye-shine.eye-focused {
          animation: eye-focused 0.6s ease-in-out infinite;
        }

        .dog-eye.eye-closed, .dog-eye-white.eye-closed, .dog-pupil.eye-closed, .eye-shine.eye-closed {
          animation: eye-closed 0.5s ease-out forwards;
        }

        .mouth-happy {
          animation: none;
        }

        .dog-tongue {
          animation: pet-eating 0.3s ease-in-out infinite;
        }

        .floating-heart {
          animation: float-up 1.5s ease-out forwards;
        }

        .floating-treat {
          animation: float-up 2s ease-out forwards;
        }

        .sleeping-z {
          animation: float-up 2s ease-in-out infinite;
        }

        /* Hover Effects */
        .dog-container:hover {
          filter: brightness(1.1);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold mb-2 sm:mb-4 text-foreground">
            Meet Our Virtual Pup
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Take care of our adorable companion together!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-8 relative overflow-hidden">
          {/* Pet Display Area */}
          <div className="relative text-center mb-4">
            <AnimatedDog />
            
            {/* Action Buttons - Moved directly under dog */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
              <button
                onClick={feedPet}
                disabled={isEating}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm touch-manipulation"
              >
                <Cookie className="w-5 h-5 sm:w-5 sm:h-5" />
                <span className="min-w-[70px] text-left">
                  {isEating ? "Eating..." : "Feed"}
                </span>
              </button>

              <button
                onClick={petDog}
                disabled={isBeingPetted}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm touch-manipulation"
              >
                <Hand className="w-5 h-5 sm:w-5 sm:h-5" />
                <span className="min-w-[70px] text-left">
                  {isBeingPetted ? "Petting..." : "Pet"}
                </span>
              </button>

              <button
                onClick={sleepPet}
                disabled={isSleeping}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm touch-manipulation"
              >
                <span className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center text-sm">💤</span>
                <span className="min-w-[70px] text-left">
                  {isSleeping ? "Sleeping..." : "Sleep"}
                </span>
              </button>
            </div>

            {/* Status Message */}
            <div className="mt-4 bg-blue-50 rounded-2xl p-3 mx-auto max-w-md">
              <p className="text-blue-800 font-medium text-sm">
                {getStatusMessage()}
              </p>
            </div>
          </div>

          {/* Stats Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {[
              { label: "Happiness", value: petStats.happiness, icon: "❤️" },
              { label: "Hunger", value: petStats.hunger, icon: "🍖" },
              { label: "Energy", value: petStats.energy, icon: "⚡" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm sm:text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getStatBgColor(stat.value)}`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
                <div className={`text-sm font-bold ${getStatColor(stat.value)}`}>
                  {Math.round(stat.value)}%
                </div>
              </div>
            ))}
          </div>

          {/* Care Instructions */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              💡 <strong>Pro tip:</strong> Click on the dog to give it love and attention!
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-muted-foreground italic">
            "A pet's love is pure and unconditional" 🐾
          </p>
        </div>
      </div>
    </section>
  );
};

export default VirtualPet;