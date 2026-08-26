export const WHATSAPP_NUMBER = "923249413931";

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const CONTACT = {
  phoneDisplay: "0324 9413931",
  phoneLink: "tel:+923249413931",
  email: "siratalmustaqeeminstitute0@gmail.com",
  location: "Lahore, Pakistan",
};

export const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/asiratulmustaqeeminstitute" },
  { name: "YouTube", url: "https://www.youtube.com/@Asirat-ul-mustaqeeminstitute" },
  { name: "TikTok", url: "https://www.tiktok.com/@siratalmustaqeeminstitut?lang=en" },
  { name: "X", url: "https://x.com/asiratulmustaqm" },
  { name: "Instagram", url: "https://www.instagram.com/asiratul_mustaqeeminstitute/" },
];

export const COURSES = [
  {
    id: "tarteel",
    title: "Tarteel-ul-Quran",
    subtitle: "Quran with Tajweed, Duas, Namaz, Islamic Stories",
    arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    translation: "“And recite the Quran with measured recitation.”",
    description:
      "A comprehensive foundation course in Quran recitation, covering the proper rules of Tajweed, essential daily Duas, the correct method of performing Namaz, and enriching Islamic stories that build character. Designed for students of every age beginning their journey with the Quran.",
  },
  {
    id: "arabi",
    title: "Al-Quran-ul-Arabi",
    subtitle: "Quranic Arabic Grammar",
    arabic: "إِنَّآ أَنزَلْنَٰهُ قُرْءَٰنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ",
    translation: "“Indeed, We have sent it down as an Arabic Quran that you might understand.”",
    description:
      "A structured course in Quranic Arabic grammar, covering Nahw (syntax) and Sarf (morphology). Students learn to read and understand the Quran directly from its original Arabic text, rather than relying solely on translation.",
  },
  {
    id: "ilm",
    title: "Ilm-ul-Quran",
    subtitle: "Quran Translation, Tafseer, Authentic (Sahih) Hadith",
    arabic: "الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ",
    translation: "“The Most Merciful taught the Quran.”",
    description:
      "An advanced course covering word-for-word Quran translation, classical Tafseer, and authentic Sahih Hadith. Guides students from recitation and grammar toward a complete understanding and practical application of the Quran's teachings.",
  },
];

export const PLATFORMS = ["Google Meet", "Zoom", "WhatsApp", "Discord"];

export const STEPS = [
  {
    title: "Book a free trial",
    description: "Message us on WhatsApp and tell us your child's (or your own) current level.",
  },
  {
    title: "Get matched with a teacher",
    description: "We pair you with a qualified teacher based on your goals, age, and schedule.",
  },
  {
    title: "Start learning",
    description: "Begin regular classes, 5 days a week, at a time convenient for your timezone.",
  },
];

export const FEATURES = [
  {
    title: "Affordable fees",
    description: "Quality Quran education priced to be accessible to families anywhere in the world.",
  },
  {
    title: "5 days/week classes",
    description: "Consistent, structured learning — not a once-a-week refresher.",
  },
  {
    title: "Qualified & experienced teachers",
    description: "13 years of teaching experience across our teaching staff.",
  },
  {
    title: "Convenient timings",
    description: "Flexible scheduling built around students in 45+ different timezones.",
  },
];

export const STATS = [
  { value: 13, suffix: "+", label: "Years of experience" },
  { value: 45, suffix: "+", label: "Countries reached" },
  { value: 5, suffix: "", label: "Rights of the Quran" },
];

// A representative spread of countries across regions for the Global Reach globe.
// Not exhaustive — illustrates the 45+ country reach with real coordinates.
export const REACHED_COUNTRIES = [
  { name: "Pakistan", lat: 30.3753, lng: 69.3451 },
  { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
  { name: "United States", lat: 37.0902, lng: -95.7129 },
  { name: "Canada", lat: 56.1304, lng: -106.3468 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "United Arab Emirates", lat: 23.4241, lng: 53.8478 },
  { name: "Qatar", lat: 25.3548, lng: 51.1839 },
  { name: "Australia", lat: -25.2744, lng: 133.7751 },
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
  { name: "France", lat: 46.2276, lng: 2.2137 },
  { name: "South Africa", lat: -30.5595, lng: 22.9375 },
  { name: "Malaysia", lat: 4.2105, lng: 101.9758 },
  { name: "Indonesia", lat: -0.7893, lng: 113.9213 },
  { name: "Turkey", lat: 38.9637, lng: 35.2433 },
  { name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { name: "Nigeria", lat: 9.082, lng: 8.6753 },
  { name: "Kenya", lat: -0.0236, lng: 37.9062 },
  { name: "India", lat: 20.5937, lng: 78.9629 },
  { name: "Bangladesh", lat: 23.685, lng: 90.3563 },
  { name: "Norway", lat: 60.472, lng: 8.4689 },
  { name: "Sweden", lat: 60.1282, lng: 18.6435 },
  { name: "New Zealand", lat: -40.9006, lng: 174.886 },
  { name: "Trinidad and Tobago", lat: 10.6918, lng: -61.2225 },
  { name: "Brazil", lat: -14.235, lng: -51.9253 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
];

export const MISSION_STATEMENT =
  "Our mission is to cover the 5 rights of the Quran: Belief (Iman), Recitation (Tilawah), Understanding (Fahm), Application (Amal), and Conveying the Message (Da'wah).";
