import { Heart, Sparkles, Map, Image, Star, MessageSquareHeart, Home, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const { t } = useTranslation();
  
  const sections = [
    { id: "home", icon: Home, label: t("navigation.home") },
    { id: "messages", icon: MessageSquareHeart, label: t("navigation.messages") },
    { id: "timeline", icon: Sparkles, label: t("navigation.timeline") },
    { id: "journey", icon: Map, label: t("navigation.journey") },
    { id: "gallery", icon: Image, label: t("navigation.gallery") },
    { id: "stars", icon: Star, label: t("navigation.stars") },
    { id: "heart-lock", icon: Heart, label: t("navigation.heartLock") },
    { id: "pet", icon: "🐶", label: t("navigation.virtualPet") },
    { id: "letter", icon: Mail, label: t("navigation.loveLetter") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-playfair font-bold text-xl text-foreground">
              {t("navigation.brand")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {typeof Icon === "string" ? (
                    <span className="w-4 h-4 text-sm">{Icon}</span>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Valentine's Day link */}
            <a
              href="/valentine.html"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-lg">💝</span>
              <span className="text-sm font-medium">Valentine's Special</span>
            </a>
            
            {/* Language switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
