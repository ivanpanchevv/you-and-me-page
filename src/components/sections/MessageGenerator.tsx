import { useState, useEffect } from "react";
import { Heart, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const messages = [
  "You make every day brighter just by being in it.",
  "Your smile is my favorite view in the whole world.",
  "I fall in love with you more every single day.",
  "You're the best thing that ever happened to me.",
  "Every moment with you is a treasure I cherish.",
  "You're not just my love, you're my best friend.",
  "Your laugh is the most beautiful sound I know.",
  "I love how you make ordinary moments magical.",
  "You inspire me to be a better person every day.",
  "Thank you for being exactly who you are.",
];

const compliments = [
  "You're absolutely gorgeous, inside and out.",
  "Your kindness makes the world a better place.",
  "You have the most amazing sense of humor.",
  "Your strength and resilience inspire me.",
  "You're incredibly talented at everything you do.",
];

const MessageGenerator = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageType, setMessageType] = useState<"message" | "compliment">("message");

  const generateMessage = (type: "message" | "compliment") => {
    setMessageType(type);
    const list = type === "message" ? messages : compliments;
    const randomMessage = list[Math.floor(Math.random() * list.length)];
    setCurrentMessage(randomMessage);
    setDisplayText("");
    setIsTyping(true);
  };

  useEffect(() => {
    // Initial message
    generateMessage("message");
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (displayText.length < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentMessage.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayText, currentMessage, isTyping]);

  return (
    <section id="messages" className="min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Messages of Love
          </h2>
          <p className="text-xl text-muted-foreground">
            Random reminders of how much you mean to me
          </p>
        </div>

        <Card className="shadow-soft border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-12">
            <div className="flex items-start gap-4 mb-8">
              <Heart className="w-8 h-8 text-primary fill-primary flex-shrink-0 animate-float" />
              <p className="text-2xl md:text-3xl font-playfair text-foreground leading-relaxed min-h-[120px]">
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => generateMessage("message")}
                className="gradient-romantic text-white hover:opacity-90"
                disabled={isTyping}
              >
                <RefreshCw className="mr-2 w-4 h-4" />
                New Love Message
              </Button>
              <Button
                onClick={() => generateMessage("compliment")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                disabled={isTyping}
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Random Compliment
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Click to receive a new message anytime you need a reminder 💕
          </p>
        </div>
      </div>
    </section>
  );
};

export default MessageGenerator;
