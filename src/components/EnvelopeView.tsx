import React, { useState } from "react";
import { Sparkles, MailOpen, Compass } from "lucide-react";

interface EnvelopeViewProps {
  sender: string;
  recipient: string;
  onOpen: () => void;
}

export default function EnvelopeView({ sender, recipient, onOpen }: EnvelopeViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Play sound from a short, beautiful chime sound
    try {
      const chime = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
      chime.volume = 0.4;
      chime.play();
    } catch (e) {
      console.log("Audio autoplay blocked, normal safety behavior");
    }

    // Delay setting fully opened so cards can transition up
    setTimeout(() => {
      setIsFullyOpened(true);
      onOpen();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md w-full mx-auto select-none" id="envelope-layout-view">
      {!isFullyOpened ? (
        <div className="w-full flex flex-col items-center justify-center text-center">
          
          {/* Greeting Prompt */}
          <div className="mb-8 animate-fade-in text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-accent/15 text-txt-coffee text-xs font-sans font-bold border border-gold-accent/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.12)]">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent animate-pulse" />
              A Blessed Message Received
            </span>
            <h2 className="text-3xl font-serif text-txt-coffee font-semibold tracking-wide drop-shadow-xs mb-1">
              Vesak Blessing is Waiting
            </h2>
            <p className="text-txt-muted text-sm max-w-[300px] mx-auto mt-2 leading-relaxed font-sans">
              <span className="text-txt-coffee font-bold">{sender || "Someone special"}</span> has created a customized Vesak Greeting Card just for <span className="text-txt-coffee font-bold">{recipient || "you"}</span>.
            </p>
          </div>

          {/* Interactive Envelope Graphic Wrapper */}
          <div 
            onClick={!isOpen ? handleOpenEnvelope : undefined}
            className={`relative w-72 h-52 bg-white rounded-xl border border-border-warm shadow-[0_16px_45px_rgba(139,115,85,0.16)] cursor-pointer transition-all duration-700 ease-in-out hover:scale-[1.03] hover:border-gold-accent ${
              isOpen ? "scale-95 opacity-50 translate-y-8" : "animate-bounce-subtle"
            }`}
            id="envelope-graphic-container"
          >
            {/* Top flap of the envelope */}
            <div 
              className={`absolute top-0 inset-x-0 h-0 w-0 border-t-[90px] border-x-[144px] border-t-[#FAF7F2] border-x-transparent transform origin-top transition-transform duration-700 ${
                isOpen ? "-rotate-x-180 -translate-y-[40px] z-0" : "z-20"
              }`}
              style={{
                borderTopColor: "rgba(230, 213, 195, 0.95)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Left and Right overlapping panels of envelope */}
            <div className="absolute inset-0 bg-transparent rounded-xl overflow-hidden z-10 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-1/2 border-l-[144px] border-b-[208px] border-l-[#FAF7F2]/55 border-b-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 border-r-[144px] border-b-[208px] border-r-[#FAF7F2]/55 border-b-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#E6D5C3]/35 to-transparent" />
            </div>

            {/* Wax Seal / Center Glowing Button */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="relative">
                {/* Radiant backing glow */}
                <div className="absolute inset-0 rounded-full bg-gold-accent blur-md opacity-45 animate-ping duration-1000" />
                
                {/* Metal wax seal */}
                <button 
                  className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-gold-accent to-amber-700 border-2 border-amber-300 shadow-[0_4px_12px_rgba(212,175,55,0.3)] flex items-center justify-center select-none cursor-pointer transition-all ${
                    isOpen ? "scale-50 opacity-0" : "hover:scale-110 active:scale-95"
                  }`}
                  id="open-envelope-seal"
                >
                  <Compass className="w-8 h-8 text-white animate-spin-slow" />
                </button>
              </div>
            </div>

            {/* Recipient Ribbon */}
            <div className="absolute bottom-6 inset-x-4 text-center z-25">
              <span className="font-sans text-[9px] tracking-widest text-[#8B7355] font-bold uppercase block">
                Deliver to
              </span>
              <span className="font-serif text-base font-semibold tracking-wide text-txt-coffee">
                {recipient || "Recipient Name"}
              </span>
            </div>

            {/* Hidden Card slipping upward hint */}
            <div className={`absolute inset-x-4 top-2 h-44 bg-gradient-to-b from-amber-500/10 to-amber-600/5 border border-amber-400/20 rounded-lg -z-10 transition-transform duration-1000 ${
              isOpen ? "-translate-y-24 scale-105" : ""
            }`} />
          </div>

          <p className="mt-6 text-txt-sand font-sans text-[10px] tracking-widest uppercase font-bold animate-pulse">
            Click the golden dharma seal to open
          </p>

        </div>
      ) : null}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
