import React, { useRef, useState } from "react";
import { CustomizedCardState, CardTemplate } from "../types";
import ParticleEffect from "./ParticleEffect";
import { Volume2, VolumeX, Sparkles, Heart } from "lucide-react";

interface CardShowcaseProps {
  state: CustomizedCardState;
  template: CardTemplate;
  isInteractive?: boolean;
}

export default function CardShowcase({ state, template, isInteractive = true }: CardShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Atmospheric, royalty-free Buddhist wooden flute / meditation atmosphere loop
      audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav"); // Temple bell chime
      // Alternative: peaceful meditation background loop
      audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"; // Gentle instrumental loop
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked by browser policy. Interaction needed.", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Determine font classes based on state
  const getFontClass = (font: string) => {
    switch (font) {
      case "serif":
        return "font-serif tracking-tight";
      case "sinhala":
        return "font-sans leading-relaxed tracking-wide font-medium";
      case "tamil":
        return "font-sans leading-relaxed tracking-wider";
      case "modern":
      default:
        return "font-sans tracking-tight font-medium";
    }
  };

  // Decide alignment layout based on position setting
  const getPositionClasses = (pos: "top" | "center" | "bottom") => {
    switch (pos) {
      case "top":
        return "justify-start pt-12 pb-24";
      case "center":
        return "justify-center py-16";
      case "bottom":
      default:
        return "justify-end pt-24 pb-12";
    }
  };

  const activeFont = getFontClass(state.themeFont);
  const positionClass = getPositionClasses(state.textPosition);

  // Parse color option
  const getTextColorHex = (col: string) => {
    switch (col) {
      case "gold": return "text-[#fcd34d] shadow-amber-900/30";
      case "amber": return "text-[#f59e0b] shadow-orange-950/20";
      case "orange": return "text-[#fb923c] shadow-red-950/20";
      case "crimson": return "text-[#fda4af] shadow-rose-950/20";
      case "white":
      default:
        return "text-[#f8fafc] shadow-slate-900/30";
    }
  };

  const textColorClass = getTextColorHex(state.textColor);

  return (
    <div 
      id="vesak-card-target"
      className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(139,115,85,0.25)] bg-slate-950 border border-gold-accent/50 select-none animate-fade-in group"
    >
      {/* Background Image Template */}
      <img
        src={template.imageUrl}
        alt={template.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* Dynamic Ambient Particles overlay */}
      <ParticleEffect type={template.particles} />

      {/* Soft overlay gradients for guaranteed text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none z-10" />

      {/* Interactive Controls layer */}
      {isInteractive && (
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          <button
            onClick={toggleMusic}
            className="p-2.5 rounded-full bg-black/65 hover:bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/35 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
            title="Toggle peaceful temple music"
            id="music-toggle-btn"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-bounce" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Traditional Temple Corner Borders - Visual Accent */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl pointer-events-none z-20" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr pointer-events-none z-20" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl pointer-events-none z-20" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br pointer-events-none z-20" />

      {/* Card Content Layout */}
      <div className={`absolute inset-0 px-8 z-20 flex flex-col ${positionClass} text-center`}>
        
        {/* Recipient Portion */}
        {state.recipientName && (
          <div className="mb-4 animate-fade-in-up">
            <span className="text-[10px] tracking-[0.25em] text-amber-400/80 font-sans uppercase block mb-1">
              Dear
            </span>
            <h3 className={`text-xl font-bold tracking-wide break-words border-b border-dashed border-amber-400/20 pb-2 ${textColorClass} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
              {state.recipientName}
            </h3>
          </div>
        )}

        {/* Core customized Wish Message */}
        <div className="my-auto py-2 overflow-y-auto max-h-[50%] scrollbar-none flex flex-col justify-center">
          <p className={`text-base leading-relaxed break-words text-white filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] ${activeFont}`}>
            {state.message || "Wishing you a peaceful and blessed Vesak!"}
          </p>
        </div>

        {/* Sender Portion */}
        {state.senderName && (
          <div className="mt-4 animate-fade-in-up">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span className="text-[10px] tracking-[0.2em] text-amber-400/80 font-sans uppercase block">
                With Metta
              </span>
            </div>
            <h4 className={`text-lg font-bold tracking-wide break-words ${textColorClass} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
              {state.senderName}
            </h4>
          </div>
        )}

      </div>

      {/* Watermark/App Tagline */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
        <span className="text-[8px] font-mono tracking-widest text-amber-500/50 block">
          VESAK WISHES ☸ VESAK GREETING CREATOR
        </span>
      </div>
    </div>
  );
}
