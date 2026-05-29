import React, { useState } from "react";
import { CustomizedCardState, VesakWishPreset } from "../types";
import { WISH_PRESETS } from "./VesakThemes";
import { Sparkles, Send, Copy, Check, RefreshCw, Type as FontIcon, AlignCenter, Palette, Download } from "lucide-react";
import { toPng } from "html-to-image";

interface EditorPanelProps {
  state: CustomizedCardState;
  onChange: (newState: CustomizedCardState) => void;
  onGenerateBlessing: (language: "English" | "Sinhala" | "Tamil") => Promise<void>;
  isGeneratingBlessing: boolean;
  shareUrl: string;
}

export default function EditorPanel({
  state,
  onChange,
  onGenerateBlessing,
  isGeneratingBlessing,
  shareUrl
}: EditorPanelProps) {
  const [copied, setCopied] = useState(false);
  const [activeLangFilter, setActiveLangFilter] = useState<"All" | "English" | "Sinhala" | "Tamil">("All");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...state, [name]: value });
  };

  const handlePresetSelect = (preset: VesakWishPreset) => {
    onChange({ ...state, message: preset.text });
  };

  const handleStyleChange = (name: keyof CustomizedCardState, value: any) => {
    onChange({ ...state, [name]: value });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCard = async () => {
    const element = document.getElementById("vesak-card-target");
    if (!element) return;
    setIsDownloading(true);
    try {
      // Small pause to guarantee font loads & animation stabilizes
      await new Promise((resolve) => setTimeout(resolve, 150));
      const dataUrl = await toPng(element, { 
        cacheBust: true,
        backgroundColor: "#020617",
        style: {
          transform: "scale(1)",
        },
        filter: (node) => {
          if (node instanceof HTMLElement) {
            if (node.id === "music-toggle-btn") {
              return false;
            }
          }
          return true;
        }
      });
      const link = document.createElement("a");
      link.download = `Vesak-Card-${state.recipientName || "Wish"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error creating image:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    // Highly tailored preset text for WhatsApp including Sender and Recipient names
    const sender = state.senderName ? `*${state.senderName}*` : "Someone special";
    const receiver = state.recipientName ? `*${state.recipientName}*` : "you";
    
    const introText = `☸️ *Happy Vesak Festival!* 🪷\n\n${sender} has sent a beautiful personalized Vesak Blessing Card to ${receiver}.\n\n👉 View your live interactive card here (with background music and floating lantern lights!):\n${shareUrl}`;
    
    const encodedText = encodeURIComponent(introText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredPresets = WISH_PRESETS.filter(p => 
    activeLangFilter === "All" || p.language === activeLangFilter
  );

  return (
    <div className="w-full bg-white border border-[#E6D5C3] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6" id="editor-control-panel">
      
      {/* SECTION 2: Personalization Inputs */}
      <div>
        <div className="mb-3 flex justify-between items-end">
          <h3 className="text-xl font-semibold text-[#5C4033] font-display">
            2. Personalize Names
          </h3>
          <span className="text-xs text-txt-sand font-sans font-bold uppercase tracking-wider">Step 2 of 3</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="block font-sans text-xs font-bold uppercase tracking-widest text-[#8B7355]">Recipient (To)</label>
            <input
              type="text"
              name="recipientName"
              placeholder="Enter name..."
              value={state.recipientName}
              onChange={handleTextChange}
              maxLength={25}
              className="w-full bg-[#FAF7F2] border-b-2 border-border-warm p-3 text-txt-main focus:outline-none focus:border-gold-accent outline-hidden font-serif text-base md:text-lg transition-all rounded-t-lg placeholder:text-txt-sand/40"
              id="recipient-name-input"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="block font-sans text-xs font-bold uppercase tracking-widest text-[#8B7355]">Sender (From)</label>
            <input
              type="text"
              name="senderName"
              placeholder="Your name..."
              value={state.senderName}
              onChange={handleTextChange}
              maxLength={25}
              className="w-full bg-[#FAF7F2] border-b-2 border-border-warm p-3 text-txt-main focus:outline-none focus:border-gold-accent outline-hidden font-serif text-base md:text-lg transition-all rounded-t-lg placeholder:text-txt-sand/40"
              id="sender-name-input"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Content and Wish selector */}
      <div className="border-t border-[#E6D5C3]/60 pt-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-[#5C4033] font-display">
              3. Compose Wish Blessing
            </h3>
          </div>
          <span className="text-xs text-txt-sand font-sans font-bold uppercase tracking-wider">Step 3 of 3</span>
        </div>

        {/* Text Area */}
        <textarea
          name="message"
          rows={4}
          placeholder="Type your own Vesak wish, or select a preset below to generate a beautiful, spiritually serene Buddhist wishing message!"
          value={state.message}
          onChange={handleTextChange}
          maxLength={300}
          className="w-full p-4 rounded-xl bg-[#FAF7F2] border-b-2 border-border-warm text-txt-main text-base focus:outline-none focus:border-gold-accent transition-all leading-relaxed resize-none font-serif placeholder:text-txt-sand/40 font-medium"
          id="custom-message-textarea"
        />

        {/* Wishing Presets Categories Toggle */}
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="flex gap-2 border-b border-border-warm pb-2 overflow-x-auto scrollbar-none">
            {(["All", "English", "Sinhala", "Tamil"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLangFilter(lang)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeLangFilter === lang 
                    ? "bg-gold-accent/15 text-txt-coffee border border-gold-accent/30" 
                    : "text-txt-muted hover:text-txt-coffee hover:bg-[#FAF7F2]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Presets List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className="p-3 text-left rounded-xl bg-[#FFF9E6] border border-[#F2E8CF] hover:border-gold-accent hover:shadow-xs transition-all text-xs text-txt-main font-serif cursor-pointer group flex flex-col gap-1.5"
                title={preset.text}
              >
                <span className="font-sans font-bold text-gold-accent block truncate text-[11px] uppercase tracking-wider group-hover:text-[#D4AF37]">
                  {preset.title}
                </span>
                <span className="opacity-90 italic block leading-relaxed line-clamp-2">{preset.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Style Settings */}
      <div className="border-t border-[#E6D5C3]/60 pt-5 flex flex-col gap-3">
        <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-[#8B7355] flex items-center gap-1.5">
          <FontIcon className="w-4 h-4 text-gold-accent" />
          4. Fine-Tune Typography & Colors
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Font choice */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-txt-muted">Font Styling</span>
            <select
              value={state.themeFont}
              onChange={(e) => handleStyleChange("themeFont", e.target.value)}
              className="w-full bg-[#FAF7F2] border-b-2 border-border-warm p-2.5 text-txt-main text-xs focus:outline-none focus:border-gold-accent font-serif cursor-pointer rounded-t-md"
              id="font-select-input"
            >
              <option value="serif">Lora Serif</option>
              <option value="sinhala">සිංහල (Bodhi)</option>
              <option value="tamil">தமிழ் (Classic)</option>
              <option value="modern">Modern Clean</option>
            </select>
          </div>

          {/* Color choice */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-txt-muted">Text Color</span>
            <select
              value={state.textColor}
              onChange={(e) => handleStyleChange("textColor", e.target.value)}
              className="w-full bg-[#FAF7F2] border-b-2 border-border-warm p-2.5 text-txt-main text-xs focus:outline-none focus:border-gold-accent font-serif cursor-pointer rounded-t-md"
              id="color-select-input"
            >
              <option value="white">Lotus White</option>
              <option value="gold">Dharma Gold</option>
              <option value="amber">Warm Amber</option>
              <option value="orange">Saffron Saffron</option>
              <option value="crimson">Blossom Pink</option>
            </select>
          </div>

          {/* Align positions */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-txt-muted">Message Position</span>
            <select
              value={state.textPosition}
              onChange={(e) => handleStyleChange("textPosition", e.target.value)}
              className="w-full bg-[#FAF7F2] border-b-2 border-border-warm p-2.5 text-txt-main text-xs focus:outline-none focus:border-gold-accent font-serif cursor-pointer rounded-t-md"
              id="position-select-input"
            >
              <option value="top">Top Layout</option>
              <option value="center">Center Layout</option>
              <option value="bottom">Bottom Layout</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 5: Share and launch controls */}
      <div className="border-t border-[#E6D5C3]/60 pt-5 flex flex-col gap-4">
        
        {/* Action button container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* WhatsApp Button from design specs */}
          <button
            onClick={handleWhatsAppShare}
            className="bg-[#24d366] text-white font-sans font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md hover:bg-[#128c7e] transition-colors cursor-pointer border-none"
            id="whatsapp-share-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="tracking-wide text-sm font-sans font-bold">SHARE VIA WHATSAPP</span>
          </button>

          {/* Download Card option */}
          <button
            onClick={handleDownloadCard}
            disabled={isDownloading}
            className="bg-gold-accent hover:bg-gold-accent/90 text-white font-sans font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer border-none disabled:opacity-50"
            id="download-card-btn"
          >
            {isDownloading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span className="tracking-wide text-sm">GENERATING IMAGE...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span className="tracking-wide text-sm">DOWNLOAD CARD (PNG)</span>
              </>
            )}
          </button>
        </div>

        <div className="flex gap-2">
          {/* Quick link preview */}
          <div className="flex-1 bg-[#FAF7F2] border border-[#E6D5C3] rounded-xl px-3 py-2.5 flex items-center justify-between overflow-hidden">
            <span className="text-[11px] font-mono text-txt-muted select-all truncate max-w-[240px]">
              {shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="p-1 px-3 rounded-lg bg-gold-accent/15 hover:bg-gold-accent/25 text-txt-coffee border border-gold-accent/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-sans font-bold"
              title="Copy customized card URL"
              id="copy-link-btn"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-[#FFF9E6] p-4 rounded-xl border border-[#F2E8CF] text-xs text-txt-sand leading-relaxed font-serif">
          💡 <strong>Tip for sending Card image on WhatsApp:</strong> First click <strong>DOWNLOAD CARD (PNG)</strong> to save the card directly to your device, then use the <strong>SHARE VIA WHATSAPP</strong> button to send the beautiful live link and attach your card image to your message!
        </div>
      </div>

    </div>
  );
}
