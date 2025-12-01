import { Heart } from "lucide-react";

const memories = [
  {
    title: "Our First Date",
    description: "The moment I knew you were special",
    emoji: "🌟",
  },
  {
    title: "That Perfect Day",
    description: "When we laughed until our cheeks hurt",
    emoji: "😊",
  },
  {
    title: "Cozy Nights In",
    description: "Just us, good food, and great company",
    emoji: "🏠",
  },
  {
    title: "Adventures Together",
    description: "Every journey is better with you",
    emoji: "✨",
  },
];

const MemoriesGallery = () => {
  return (
    <section className="py-24 px-6 gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Beautiful Moments
          </h2>
          <p className="text-xl text-muted-foreground">
            Memories that make my heart smile
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {memories.map((memory, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 min-h-[200px] flex flex-col justify-center items-center text-center relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  {[...Array(20)].map((_, i) => (
                    <Heart 
                      key={i}
                      className="absolute text-primary"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-float">
                    {memory.emoji}
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold mb-2 text-foreground">
                    {memory.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground italic">
            "Every moment spent with you becomes a cherished memory..."
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemoriesGallery;
