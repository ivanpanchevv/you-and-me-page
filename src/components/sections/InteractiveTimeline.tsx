import { useState } from "react";
import { Heart, Calendar, MapPin, Star, Palette, Plane, Mountain, Waves, Music, Zap, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const InteractiveTimeline = () => {
  const { t } = useTranslation();
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const milestones = [
    {
      date: "January 16, 2023",
      title: t("interactiveTimeline.milestones.0.title"),
      description: t("interactiveTimeline.milestones.0.description"),
      icon: Heart,
      location: "Spaghetti Kitchen",
    },
    {
      date: "January 27, 2023",
      title: t("interactiveTimeline.milestones.1.title"),
      description: t("interactiveTimeline.milestones.1.description"),
      icon: Palette,
      location: t("interactiveTimeline.milestones.1.location"),
    },
    {
      date: "April 14, 2023",
      title: t("interactiveTimeline.milestones.2.title"),
      description: t("interactiveTimeline.milestones.2.description"),
      icon: Plane,
      location: t("interactiveTimeline.milestones.2.location"),
    },
    {
      date: "July 8, 2023",
      title: t("interactiveTimeline.milestones.3.title"),
      description: t("interactiveTimeline.milestones.3.description"),
      icon: Mountain,
      location: t("interactiveTimeline.milestones.3.location"),
    },
    {
      date: "July 15, 2023",
      title: t("interactiveTimeline.milestones.4.title"),
      description: t("interactiveTimeline.milestones.4.description"),
      icon: Waves,
      location: t("interactiveTimeline.milestones.4.location"),
    },
    {
      date: "August 6, 2023",
      title: t("interactiveTimeline.milestones.5.title"),
      description: t("interactiveTimeline.milestones.5.description"),
      icon: Music,
      location: t("interactiveTimeline.milestones.5.location"),
    },
    {
      date: "August 23, 2024",
      title: t("interactiveTimeline.milestones.6.title"),
      description: t("interactiveTimeline.milestones.6.description"),
      icon: Zap,
      location: t("interactiveTimeline.milestones.6.location"),
    },
    {
      date: "July 21, 2025",
      title: t("interactiveTimeline.milestones.7.title"),
      description: t("interactiveTimeline.milestones.7.description"),
      icon: Car,
      location: t("interactiveTimeline.milestones.7.location"),
    },
  ];

  return (
    <section id="timeline" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-foreground">
            {t("interactiveTimeline.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("interactiveTimeline.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary transform -translate-x-1/2" />
          
          {/* Timeline Line - Mobile */}
          <div className="block md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary" />

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
                  {/* Timeline dot - Desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-background transition-all ${
                        isSelected
                          ? "bg-primary scale-150 shadow-lg shadow-primary/50"
                          : "bg-primary/50 hover:scale-125"
                      }`}
                    />
                  </div>
                  
                  {/* Timeline dot - Mobile */}
                  <div className="block md:hidden absolute left-8 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-background transition-all ${
                        isSelected
                          ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                          : "bg-primary/50"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className={`md:w-5/12 w-full pl-20 md:pl-0 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                        isSelected
                          ? "shadow-lg border-primary bg-primary/5"
                          : "shadow-soft border-border/50 bg-card/80 hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className={`flex items-start gap-4 flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}>
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
