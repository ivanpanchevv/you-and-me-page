import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ParticleCanvas from "@/components/ParticleCanvas";
import Hero from "@/components/Hero";
import WhyILoveYou from "@/components/WhyILoveYou";
import MessageGenerator from "@/components/sections/MessageGenerator";
import InteractiveTimeline from "@/components/sections/InteractiveTimeline";
import JourneyMap from "@/components/sections/JourneyMap";
import MediaGallery from "@/components/sections/MediaGallery";
import StarMap from "@/components/sections/StarMap";
import HeartLock from "@/components/sections/HeartLock";
import VirtualPet from "@/components/VirtualPet";
import LoveLetter from "@/components/LoveLetter";

const Home = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("authenticated");
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "messages", "timeline", "journey", "gallery", "stars", "heart-lock", "pet", "letter"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleCanvas />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div className="relative z-10">
        <div id="home">
          <Hero />
          <WhyILoveYou />
        </div>
        <MessageGenerator />
        <InteractiveTimeline />
        <JourneyMap />
        <MediaGallery />
        <StarMap />
        <HeartLock />
        <VirtualPet />
        <LoveLetter />
      </div>
    </div>
  );
};

export default Home;
