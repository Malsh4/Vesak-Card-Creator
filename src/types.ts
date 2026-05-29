export interface CardTemplate {
  id: string;
  name: string;
  imageUrl: string;
  accentColor: string;
  titleColor: string;
  messageColor: string;
  senderReceiverColor: string;
  bgGradient: string;
  particles: "lotus" | "lamp" | "lantern" | "stars";
  fontFamily: string;
}

export interface VesakWishPreset {
  id: string;
  language: "English" | "Sinhala" | "Tamil" | "Custom";
  title: string;
  text: string;
}

export interface CustomizedCardState {
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
  textPosition: "top" | "center" | "bottom";
  textColor: string;
  themeFont: string;
  showMusic: boolean;
}
