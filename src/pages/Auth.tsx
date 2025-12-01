import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Auth = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  // Set your special date here (format: YYYY-MM-DD)
  const SPECIAL_DATE = "2005-12-16"; // Change this to your actual date!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (date === SPECIAL_DATE) {
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("authDate", new Date().toISOString());
      toast.success("Welcome, my love! ❤️");
      setTimeout(() => navigate("/home"), 500);
    } else {
      toast.error("Hmm, that's not quite right. Think about our special day...");
      setDate("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-soft relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-soft p-8 border border-border/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-romantic mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-playfair font-bold mb-2 text-foreground">
              A Special Date
            </h1>
            <p className="text-muted-foreground">
              Enter our special day to unlock your surprise
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-foreground">
                What's the date? 📅
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-center text-lg"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-romantic text-white hover:opacity-90 transition-opacity"
              size="lg"
            >
              Unlock My Surprise
              <Heart className="ml-2 w-5 h-5 fill-white" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground italic">
              Hint: Think about when we first...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
