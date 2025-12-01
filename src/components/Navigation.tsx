import { Heart, Sparkles, Map, Image, Star, TreePine, MessageSquareHeart, Home } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const sections = [
    { id: "home", icon: Home, label: "Home" },
    { id: "messages", icon: MessageSquareHeart, label: "Messages" },
    { id: "timeline", icon: Sparkles, label: "Timeline" },
    { id: "journey", icon: Map, label: "Journey" },
    { id: "gallery", icon: Image, label: "Gallery" },
    { id: "stars", icon: Star, label: "Stars" },
    { id: "tree", icon: TreePine, label: "Our Tree" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-playfair font-bold text-xl text-foreground">
              For You
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
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu - simplified version */}
          <div className="md:hidden">
            <Heart className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
