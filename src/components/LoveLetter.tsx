import { Heart } from "lucide-react";

const LoveLetter = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft p-12 border border-border/50 relative overflow-hidden">
          {/* Decorative Elements */}
          <Heart className="absolute top-4 right-4 w-8 h-8 text-primary/20 animate-float" />
          <Heart className="absolute bottom-4 left-4 w-6 h-6 text-primary/20 animate-float-slow" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-romantic">
                <Heart className="w-5 h-5 text-white fill-white" />
                <span className="text-white font-semibold">A Note For You</span>
              </div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-foreground">
              <p>
                My Dearest,
              </p>
              
              <p>
                Words can hardly capture what you mean to me, but I'll try anyway. From the moment you came into my life, 
                everything changed. The world became brighter, colors more vivid, and every day an adventure worth living.
              </p>
              
              <p>
                You inspire me to be better, to dream bigger, and to love deeper. Your presence in my life is a gift 
                I'm grateful for every single day. The way you see the world, your strength, your gentleness, your laughter – 
                everything about you is a masterpiece.
              </p>
              
              <p>
                Thank you for being you, for choosing me, and for all the beautiful moments we've shared. This is just 
                the beginning of our story, and I can't wait to write more chapters together.
              </p>
              
              <p className="pt-4">
                Forever yours,
              </p>
              
              <p className="font-playfair text-2xl text-primary">
                ❤️
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Made with love, just for you
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
