import { useState } from "react";
import { Heart, Calendar, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const milestones = [
  {
    date: "June 15, 2023",
    title: "Our First Date",
    description: "The day everything changed. Coffee turned into hours of conversation.",
    icon: Heart,
    location: "That Cozy Café",
  },
  {
    date: "July 4, 2023",
    title: "First 'I Love You'",
    description: "Under the fireworks, I knew I had to tell you how I felt.",
    icon: Star,
    location: "City Park",
  },
  {
    date: "September 10, 2023",
    title: "Our First Trip",
    description: "Adventures are better with you. The beginning of many journeys.",
    icon: MapPin,
    location: "The Mountains",
  },
  {
    date: "December 25, 2023",
    title: "Best Holiday Ever",
    description: "Celebrating together made everything more special.",
    icon: Calendar,
    location: "Home Sweet Home",
  },
  {
    date: "Today",
    title: "Every Day With You",
    description: "And many more beautiful moments to come...",
    icon: Heart,
    location: "Wherever We Are",
  },
];

const InteractiveTimeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  return (
    <section id="timeline" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            Our Journey Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Every moment is a milestone when I'm with you
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary transform -translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = index % 2 === 0;
              const isSelected = selectedMilestone === index;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8`}
                  onClick={() => setSelectedMilestone(index)}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-background transition-all ${
                        isSelected
                          ? "bg-primary scale-150 shadow-lg shadow-primary/50"
                          : "bg-primary/50 hover:scale-125"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className={`md:w-5/12 w-full ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                        isSelected
                          ? "shadow-lg border-primary bg-primary/5"
                          : "shadow-soft border-border/50 bg-card/80 hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className={`flex items-start gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full gradient-romantic flex items-center justify-center ${
                              isSelected ? "animate-float" : ""
                            }`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-primary font-semibold mb-1">
                              {milestone.date}
                            </div>
                            <h3 className="text-xl font-playfair font-bold mb-2 text-foreground">
                              {milestone.title}
                            </h3>
                            <p className="text-muted-foreground mb-3">
                              {milestone.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {milestone.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
