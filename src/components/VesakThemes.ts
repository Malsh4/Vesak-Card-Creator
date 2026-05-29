import { CardTemplate, VesakWishPreset } from "../types";

import buddhaImg from "../assets/images/buddha_meditating_bodhi_1780049503649.png";
import lanternImg from "../assets/images/vesak_lantern_kudu_1780049528647.png";
import lotusImg from "../assets/images/blooming_lotus_lamps_1780049550273.png";
import templeLampsImg from "../assets/images/temple_clay_lamps_1780049568177.png";
import bodhiImg from "../assets/images/minimalist_bodhi_leaf_1780049588323.png";
import stupaImg from "../assets/images/illuminated_pagoda_stupa_1780049604215.png";

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: "buddha-bodhi",
    name: "Serene Buddha",
    imageUrl: buddhaImg,
    accentColor: "from-amber-500 to-yellow-600",
    titleColor: "text-amber-100 font-serif",
    messageColor: "text-amber-200/90 font-serif",
    senderReceiverColor: "text-amber-300 font-semibold",
    bgGradient: "from-slate-950 via-slate-900 to-amber-950/30",
    particles: "lotus",
    fontFamily: "var(--font-serif)"
  },
  {
    id: "glowing-lantern",
    name: "Sri Lankan Vesak Kudu",
    imageUrl: lanternImg,
    accentColor: "from-orange-500 to-red-600",
    titleColor: "text-orange-100 font-serif",
    messageColor: "text-orange-200/90 font-serif",
    senderReceiverColor: "text-orange-300 font-semibold",
    bgGradient: "from-neutral-950 via-neutral-900 to-orange-950/30",
    particles: "lantern",
    fontFamily: "var(--font-serif)"
  },
  {
    id: "blooming-lotus",
    name: "Sacred Lotus Bloom",
    imageUrl: lotusImg,
    accentColor: "from-pink-500 to-rose-600",
    titleColor: "text-rose-100 font-serif",
    messageColor: "text-rose-200/90 font-serif",
    senderReceiverColor: "text-rose-300 font-semibold",
    bgGradient: "from-slate-950 via-slate-900 to-rose-950/30",
    particles: "lotus",
    fontFamily: "var(--font-serif)"
  },
  {
    id: "temple-lamps",
    name: "Temple Clay Lamps",
    imageUrl: templeLampsImg,
    accentColor: "from-indigo-500 to-amber-600",
    titleColor: "text-amber-200 font-serif",
    messageColor: "text-amber-100/90 font-serif",
    senderReceiverColor: "text-amber-300 font-semibold",
    bgGradient: "from-zinc-950 via-zinc-900 to-amber-950/20",
    particles: "lamp",
    fontFamily: "var(--font-serif)"
  },
  {
    id: "minimalist-leaf",
    name: "Cosmic Bodhi Leaf",
    imageUrl: bodhiImg,
    accentColor: "from-yellow-400 to-emerald-600",
    titleColor: "text-yellow-100 font-serif",
    messageColor: "text-yellow-200/95 font-serif",
    senderReceiverColor: "text-yellow-300 font-semibold",
    bgGradient: "from-slate-950 via-neutral-950 to-slate-900",
    particles: "stars",
    fontFamily: "var(--font-serif)"
  },
  {
    id: "golden-stupa",
    name: "Illuminated Pagoda",
    imageUrl: stupaImg,
    accentColor: "from-yellow-500 to-amber-700",
    titleColor: "text-amber-100 font-serif",
    messageColor: "text-amber-200/90 font-serif",
    senderReceiverColor: "text-amber-300 font-semibold",
    bgGradient: "from-neutral-950 via-stone-900 to-neutral-800",
    particles: "stars",
    fontFamily: "var(--font-serif)"
  }
];

export const WISH_PRESETS: VesakWishPreset[] = [
  {
    id: "en-peace",
    language: "English",
    title: "Teaching of Peace",
    text: "May the supreme teachings of Lord Buddha guide you and your loved ones on a peaceful path of inner serenity, kindness, and eternal joy. Blessed Vesak!"
  },
  {
    id: "en-gem",
    language: "English",
    title: "Triple Gem Blessings",
    text: "May the blessings of the Noble Triple Gem—the Buddha, the Dhamma, and the Sangha—bring infinite wisdom, health, happiness, and peace to your life. Blessed Vesak!"
  },
  {
    id: "en-light",
    language: "English",
    title: "Light of Wisdom",
    text: "Wishing you a beautiful and contemplative Vesak. May the divine light of the full moon illuminate your heart and dispel all darkness with wisdom and love."
  },
  {
    id: "si-peace",
    language: "Sinhala",
    title: "සාමය සහ සැනසීම",
    text: "තිලෝගුරු සම්මා සම්බුදු පියාණන් වහන්සේගේ ශ්‍රී සද්ධර්මයේ ආශිර්වාදයෙන්, ඔබ සැමටත් පවුලේ සැමටත් සාමය, සැනසීම සහ සතුට සපිරි පින්බර සුබ වෙසක් මංගල්‍යයක් වේවා!"
  },
  {
    id: "si-triple",
    language: "Sinhala",
    title: "උතුම් තෙරුවන් සරණ",
    text: "උතුම් වෙසක් පෝදා ලැබුවා වූ උතුම් තෙරුවන් සරණින්, ඔබේත් ඔබ පවුලේ සියලු දෙනාගේත් සිත් පිරිසිදු වී, සදහම් ආලෝකයෙන් ජීවිතය ආලෝකමත් වේවායි ප්‍රාර්ථනා කරමි!"
  },
  {
    id: "ta-peace",
    language: "Tamil",
    title: "அமைதியும் மகிழ்ச்சியும்",
    text: "புனிதமான வைகாசி விசாகத் திருநாளில், கௌதம புத்தரின் போதனைகள் உங்கள் உள்ளத்திலும் இல்லத்திலும் பேரமைதியையும், எல்லையற்ற மகிழ்ச்சியையும் வழங்கட்டும். இனிய வைகாசி விசாக வாழ்த்துகள்!"
  }
];
