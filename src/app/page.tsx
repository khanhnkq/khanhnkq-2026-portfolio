import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { GameHUD } from "@/components/layout/GameHUD";
import { ParallaxSection } from "@/components/layout/ParallaxSection";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Globe } from "@/registry/magicui/globe";

export default function Home() {
  return (
    <main className="relative bg-black font-rajdhani">
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <AuroraBackground>
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-10" />
            <div className="absolute inset-0 bg-black/40" /> 
            
            {/* Global Globe - Adjusted position to be subtle background */}
            <Globe className="opacity-100 scale-[2] left-[-20%] top-[20%] z-0 mix-blend-screen" />
         </AuroraBackground>
      </div>

      <GameHUD />
      
      {/* LAYER 1: HERO (Base) - STATUS */}
      <ParallaxSection id="hero" className="z-10 bg-transparent">
        <Hero />
      </ParallaxSection>
      
      {/* LAYER 2: SKILLS - TECH STACK */}
      <ParallaxSection id="tech-stack" className="z-20 bg-transparent">
        <TechStack />
      </ParallaxSection>

      {/* LAYER 3: QUESTS - PROJECTS */}
      <ParallaxSection id="projects" className="z-30 bg-transparent">
        <Projects />
      </ParallaxSection>

      {/* LAYER 4: TROPHY HALL - ACHIEVEMENTS */}
      <ParallaxSection id="achievements" className="z-40 bg-transparent">
        <Achievements />
      </ParallaxSection>
      
      {/* LAYER 5: GUILD - CONTACT */}
      <ParallaxSection id="contact" className="z-50 bg-transparent">
        <Contact />
      </ParallaxSection>
    </main>
  );
}
