import React, { useState, useEffect } from "react";
import { CustomizedCardState, CardTemplate } from "./types";
import { CARD_TEMPLATES } from "./components/VesakThemes";
import CardShowcase from "./components/CardShowcase";
import EditorPanel from "./components/EditorPanel";
import EnvelopeView from "./components/EnvelopeView";
import { Compass, Sparkles, PlusCircle, Volume2, Globe, Check } from "lucide-react";

export default function App() {
  // Parse prospective URL parameters for recipient card reveal
  const [recipientMode, setRecipientMode] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  
  // Custom Card configuration state
  const [cardState, setCardState] = useState<CustomizedCardState>({
    templateId: "buddha-bodhi",
    recipientName: "",
    senderName: "",
    message: "May the supreme teachings of Lord Buddha guide you and your loved ones on a peaceful path of inner serenity, kindness, and eternal joy. Blessed Vesak!",
    textPosition: "center",
    textColor: "gold",
    themeFont: "serif",
    showMusic: false
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Parse params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const card = params.get("card");
    const to = params.get("to");
    const from = params.get("from");
    const msg = params.get("msg");
    const pos = params.get("pos") as any;
    const color = params.get("color");
    const font = params.get("font");

    if (to || from || msg) {
      setRecipientMode(true);
      setCardState({
        templateId: card || "buddha-bodhi",
        recipientName: to || "",
        senderName: from || "",
        message: msg || "Wishing you a peaceful and blessed Vesak festival!",
        textPosition: pos || "center",
        textColor: color || "gold",
        themeFont: font || "serif",
        showMusic: true
      });
    }
  }, []);

  // Compute matching template details
  const activeTemplate = CARD_TEMPLATES.find(t => t.id === cardState.templateId) || CARD_TEMPLATES[0];

  // Helper to sync state changes
  const handleStateChange = (newState: CustomizedCardState) => {
    setCardState(newState);
  };

  // Trigger server-side AI blessing generation
  const handleGenerateBlessing = async (language: "English" | "Sinhala" | "Tamil") => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-blessing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: cardState.senderName,
          recipientName: cardState.recipientName,
          language
        })
      });
      const data = await response.json();
      if (data.message) {
        setCardState(prev => ({ ...prev, message: data.message }));
      } else {
        throw new Error(data.error || "Generation returned empty response");
      }
    } catch (err) {
      console.error("Gemini wishing generator failed, loading safe local fallback preset:", err);
      // Beautiful regional fallback presets in case setup keys are undergoing backend setup
      if (language === "Sinhala") {
        setCardState(prev => ({
          ...prev,
          message: "තිලෝගුරු සම්මා සම්බුදු පියාණන් වහන්සේගේ ශ්‍රී සද්ධර්මයේ ආශිර්වාදයෙන්, ඔබ සැමටත් පවුලේ සැමටත් සාමය, සැනසීම සපිරි පින්බර සුබ වෙසක් මංගල්‍යයක් වේවා!"
        }));
      } else if (language === "Tamil") {
        setCardState(prev => ({
          ...prev,
          message: "இந்த புனித வைகாசி விசாக நன்னாளில் உங்கள் வாழ்வில் அமைதியும் மகிழ்ச்சியும் பெருகட்டும். இனிய விசாக தின வாழ்த்துகள்!"
        }));
      } else {
        setCardState(prev => ({
          ...prev,
          message: "May the triple gem of Buddha, Dhamma, and Sangha bless you with endless health, inner wisdom, and peaceful tranquility. Happy Vesak!"
        }));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Compile active URL encoding parameters based on current configuration state
  const getShareUrl = () => {
    const params = new URLSearchParams();
    params.set("card", cardState.templateId);
    if (cardState.recipientName) params.set("to", cardState.recipientName);
    if (cardState.senderName) params.set("from", cardState.senderName);
    if (cardState.message) params.set("msg", cardState.message);
    params.set("pos", cardState.textPosition);
    params.set("color", cardState.textColor);
    params.set("font", cardState.themeFont);
    return `${window.location.origin}/?${params.toString()}`;
  };

  const currentCompiledShareUrl = getShareUrl();

  const handleCreateOwn = () => {
    // Clear URL parameters natively and switch back to editor mode
    window.history.pushState({}, document.title, "/");
    setRecipientMode(false);
    setEnvelopeOpen(false);
    setCardState({
      templateId: "buddha-bodhi",
      recipientName: "",
      senderName: "",
      message: "May the supreme teachings of Lord Buddha guide you and your loved ones on a peaceful path of inner serenity, kindness, and eternal joy. Blessed Vesak!",
      textPosition: "center",
      textColor: "gold",
      themeFont: "serif",
      showMusic: false
    });
  };

  return (
    <div className="min-h-screen bg-bg-app text-txt-main flex flex-col justify-between relative overflow-x-hidden font-serif">
      
      {/* Radiant ambient lighting overlay representing quiet candle light / full moon */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header section (Visual Anchor) */}
      <header className="relative w-full border-b border-border-warm bg-white px-6 md:px-12 py-4 md:py-6 z-20 flex justify-center items-center shadow-sm">
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 bg-gold-accent rounded-full flex items-center justify-center text-white shadow-md">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-txt-coffee">
              Vesak Card Maker
            </h1>
            <p className="text-xs uppercase tracking-widest text-txt-sand font-sans font-semibold">
              Share the Light of Dhamma
            </p>
          </div>
        </div>
      </header>

      {/* Main Body Content viewport */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center relative z-10">
        
        {recipientMode ? (
          /* RECIPIENT REVEAL MODE */
          <div className="w-full flex flex-col items-center justify-center py-6">
            {!envelopeOpen ? (
              <EnvelopeView 
                sender={cardState.senderName} 
                recipient={cardState.recipientName} 
                onOpen={() => setEnvelopeOpen(true)} 
              />
            ) : (
              <div className="flex flex-col items-center animate-fade-in text-center max-w-sm w-full">
                
                {/* Revealing Title Banner */}
                <div className="mb-6 animate-fade-in text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-accent/15 text-txt-coffee text-xs font-sans font-bold border border-gold-accent/30 mb-2 shadow-[0_0_8px_rgba(212,175,55,0.15)]">
                    <Sparkles className="w-3.5 h-3.5 text-gold-accent" /> Opened Card
                  </span>
                  <p className="text-sm text-txt-muted text-center max-w-xs font-sans">
                    Personalized blessing sent by <span className="text-txt-coffee font-semibold">{cardState.senderName || "someone special"}</span>
                  </p>
                </div>

                {/* Main Card View */}
                <CardShowcase state={cardState} template={activeTemplate} isInteractive={true} />

                {/* Return Call-to-action to make their own card */}
                <button
                  onClick={handleCreateOwn}
                  className="mt-8 px-6 py-3.5 rounded-xl bg-gold-accent hover:bg-gold-accent/90 text-white font-sans font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  id="recipient-back-to-creator"
                >
                  <PlusCircle className="w-4 h-4 stroke-[2.5px]" />
                  <span>Create Your Own Vesak Wishes Card</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* CREATOR CUSTOMIZATION MODE */
          <div className="w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-fade-in">
            
            {/* Left Column: Live Card Preview + 6 Cards Grid bottom */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:sticky lg:top-4">
              
              {/* Preview block */}
              <div className="w-full flex flex-col items-center gap-4 bg-white border border-border-warm rounded-2xl p-4 md:p-6 shadow-xs">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#8B7355] bg-[#FAF7F2] border border-border-warm px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-gold-accent animate-pulse" />
                  Live Card Preview
                </span>
                
                <div className="w-full flex justify-center">
                  <CardShowcase state={cardState} template={activeTemplate} isInteractive={true} />
                </div>

                <p className="text-xs text-txt-sand text-center font-serif leading-relaxed max-w-[280px] mt-1">
                  💡 Dynamic particles float continuously! Play the chimes in the corner to experience the card's backdrop music.
                </p>
              </div>

              {/* SECTION 1: Select Card Background (6 Cards - Left Bottom) */}
              <div className="w-full bg-white border border-border-warm rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="mb-4 flex justify-between items-end">
                  <h3 className="text-lg font-bold tracking-tight text-[#5C4033] font-display flex items-center gap-1.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-gold-accent shadow-[0_0_8px_rgba(212,175,55,0.6)] animate-pulse" />
                    1. Select Card Theme
                  </h3>
                  <span className="text-[10px] text-txt-sand font-sans font-bold uppercase tracking-wider">Step 1 of 3</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2.5" id="template-selection-grid">
                  {CARD_TEMPLATES.map((item) => {
                    const isSelected = cardState.templateId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleStateChange({ ...cardState, templateId: item.id })}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden border-4 transition-all active:scale-95 cursor-pointer bg-white p-1 shadow-xs ${
                          isSelected 
                            ? "border-gold-accent scale-[1.03] shadow-[0_4px_12px_rgba(212,175,55,0.22)]" 
                            : "border-transparent hover:border-gold-accent hover:opacity-100 opacity-90"
                        }`}
                        title={item.name}
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden relative">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-1 bottom-1 bg-black/60 py-1 text-[8px] font-sans font-bold text-slate-100 text-center truncate px-1 rounded">
                            {item.name}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-gold-accent text-white p-0.5 rounded-full z-15 shadow-md">
                            <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Customization Input Panel Column (Right Side) */}
            <div className="lg:col-span-7 w-full">
              <EditorPanel 
                state={cardState}
                onChange={handleStateChange}
                onGenerateBlessing={handleGenerateBlessing}
                isGeneratingBlessing={isGenerating}
                shareUrl={currentCompiledShareUrl}
              />
            </div>

          </div>
        )}

      </main>

      {/* Styled Footer (Humble, clean branding) */}
      <footer className="relative w-full border-t border-border-warm bg-white py-6 px-12 text-center text-[10px] uppercase tracking-[0.2em] text-txt-sand z-20">
        <p>Created for the Vesak Festival • Sabbe Satta Bhavantu Sukhitatta</p>
      </footer>

      {/* Global CSS declarations for smoother fade transitions */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(245, 158, 11, 0.25);
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: transparent;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
