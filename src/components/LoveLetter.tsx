import { Heart, Mail, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoveLetter = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const letterContent = [
    { text: t("loveLetter.content.greeting"), isGreeting: true },
    { text: t("loveLetter.content.paragraph1") },
    { text: t("loveLetter.content.paragraph2") },
    { text: t("loveLetter.content.paragraph3") },
    { text: t("loveLetter.content.signOff"), isSignOff: true },
    { text: "❤️", isHeart: true }
  ];

  useEffect(() => {
    if (isOpen && currentParagraph < letterContent.length) {
      const paragraph = letterContent[currentParagraph];
      const words = paragraph.text.split(' ');
      
      if (visibleWords < words.length) {
        const timer = setTimeout(() => {
          setVisibleWords(prev => prev + 1);
        }, paragraph.isGreeting || paragraph.isSignOff ? 200 : 100);
        return () => clearTimeout(timer);
      } else if (currentParagraph < letterContent.length - 1) {
        const timer = setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
          setVisibleWords(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, visibleWords, currentParagraph]);

  const handleEnvelopeClick = () => {
    if (!isOpen && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(true);
        setVisibleWords(0);
        setCurrentParagraph(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCloseLetter = () => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setVisibleWords(0);
        setCurrentParagraph(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const renderParagraph = (paragraph: typeof letterContent[0], index: number) => {
    if (index > currentParagraph) return null;
    
    const words = paragraph.text.split(' ');
    const displayWords = index === currentParagraph ? words.slice(0, visibleWords) : words;
    
    const getClassName = () => {
      if (paragraph.isGreeting) return "mb-6 sm:mb-8 text-xl sm:text-2xl font-playfair font-semibold text-gray-800";
      if (paragraph.isSignOff) return "pt-6 sm:pt-8 mt-6 sm:mt-8 text-lg sm:text-xl font-playfair font-medium text-right text-gray-700";
      if (paragraph.isHeart) return "text-3xl sm:text-4xl text-center mt-4";
      return "mb-4 sm:mb-6 leading-relaxed text-gray-700";
    };
    
    return (
      <p key={index} className={getClassName()}>
        {displayWords.map((word, wordIndex) => (
          <span 
            key={wordIndex} 
            className="inline-block mr-1 animate-fade-in"
            style={{
              animationDelay: `${wordIndex * 50}ms`
            }}
          >
            {word}
          </span>
        ))}
      </p>
    );
  };

  return (
    <section id="letter" className="py-24 px-6">
      <style>{`        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popup-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes popup-out {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .letter-popup {
          animation: popup-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .letter-popup-out {
          animation: popup-out 0.3s ease-in forwards;
        }
        
        .envelope {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .envelope:hover {
          transform: scale(1.05);
        }
        
        .envelope-flap {
          transform-origin: top center;
          transition: transform 0.6s ease;
        }
        
        .envelope-open .envelope-flap {
          transform: rotateX(180deg);
        }
        
        .letter-paper {
          transform-origin: bottom center;
          transition: all 0.8s ease;
        }
        
        .envelope-open .letter-paper {
          transform: translateY(-50px) scale(1);
          opacity: 1;
        }

        .letter-overlay {
          backdrop-filter: blur(8px);
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-400 fill-pink-400 animate-float" />
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent">
            {t("loveLetter.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("loveLetter.subtitle")}
          </p>
        </div>

        {!isOpen ? (
          <div 
            className="relative mx-auto w-64 h-40 sm:w-80 sm:h-48 envelope"
            onClick={handleEnvelopeClick}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-2xl border border-pink-300 ${isOpen ? 'envelope-open' : ''}`}>
              <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-t-lg envelope-flap border-b border-pink-400" 
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)' }}>
                <div className="flex justify-center items-center h-full">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 fill-pink-600" />
                </div>
              </div>
              
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-pink-700">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">{t("loveLetter.openButton")}</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            {t("loveLetter.footer")}
          </p>
        </div>
      </div>

      {/* Letter Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 letter-overlay"
            onClick={handleCloseLetter}
          />
          
          {/* Letter Content */}
          <div className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl ${isAnimating ? 'letter-popup-out' : 'letter-popup'}`}>
            {/* Close Button */}
            <button
              onClick={handleCloseLetter}
              className="absolute top-4 right-4 z-10 w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-md"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
            </button>

            <div className="p-6 sm:p-12 relative overflow-hidden">
              <Heart className="absolute top-4 left-4 w-8 h-8 text-pink-200 animate-float" />
              <Heart className="absolute bottom-4 right-4 w-6 h-6 text-pink-200 animate-float-slow" />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500">
                    <Heart className="w-5 h-5 text-white fill-white" />
                    <span className="text-white font-semibold">{t("loveLetter.noteLabel")}</span>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-800 font-serif">
                  {letterContent.map((paragraph, index) => renderParagraph(paragraph, index))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoveLetter;