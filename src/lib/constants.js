export const WHATSAPP_NUMBER = "923249413931";

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const CONTACT = {
  phoneDisplay: "+923249413931",
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
    languages: ["Urdu", "English"],
    formats: ["Group", "Individual"],
    // Fixed terms for the group batch (shown on the course and enrollment pages).
    // `price` is per month; `PK` is shown only to visitors in Pakistan.
    groupDetails: {
      durationMonths: 6,
      daysPerWeek: 2,
      classMinutes: 60,
      price: { default: 15, PK: 2000 },
    },
  },
  {
    id: "arabi",
    title: "Al-Quran-ul-Arabi",
    subtitle: "Quranic Arabic Grammar",
    arabic: "إِنَّآ أَنزَلْنَٰهُ قُرْءَٰنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ",
    translation: "“Indeed, We have sent it down as an Arabic Quran that you might understand.”",
    description:
      "A simple, grammar-light path into Quranic Arabic, built around real Quranic examples. This course helps students understand the Quran directly and read other Arabic Islamic books with confidence.",
    languages: ["Urdu", "English"],
    formats: ["Group", "Individual"],
    groupDuration: "About 1 year",
    comingSoon: true,
    comingSoonNote: "Our course book is being written and will be ready soon.",
  },
  {
    id: "hifz",
    title: "Hifz-ul-Quran",
    subtitle: "Quran Memorization",
    arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
    translation:
      "“And We have certainly made the Qur’an easy for remembrance, so is there any who will remember?”",
    description:
      "A dedicated memorization course guiding students to commit the Quran to memory correctly, portion by portion, with a structured revision cycle so what's memorized is retained for life.",
    languages: ["Urdu", "English"],
    formats: ["Individual"],
  },
];

export const PLATFORMS = ["Google Meet", "Zoom", "WhatsApp", "Discord"];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const STEPS = [
  {
    title: "Book a free individual trial",
    description:
      "Message us on WhatsApp — individual classes start with a free trial lesson, or we'll let you know when the next group batch opens for enrollment.",
  },
  {
    title: "Get matched with a teacher",
    description: "We pair you with a qualified teacher based on your goals, age, and schedule.",
  },
  {
    title: "Start learning",
    description: "Begin regular classes at a time convenient for your timezone.",
  },
];

export const FEATURES = [
  {
    title: "Affordable fees",
    description: "Quality Quran education priced to be accessible to families anywhere in the world.",
  },
  {
    title: "Live interactive lessons",
    description: "Real-time classes with your teacher, not pre-recorded lectures.",
  },
  {
    title: "Qualified & experienced teachers",
    description: "13 years of teaching experience across our teaching staff.",
  },
  {
    title: "Choice of Group or Individual Classes",
    description: "Learn one-to-one or join a group — pick whichever fits how you learn best.",
  },
];

export const STATS = [
  { value: 2013, suffix: "", label: "Since" },
  { value: 45, suffix: "+", label: "Countries reached" },
];

// Length of every one-to-one class, in minutes.
const CLASS_MINUTES = 30;

export const LEARNING_FORMATS = [
  {
    id: "group",
    title: "Group Classes",
    points: [
      "New batches announced before they start",
      "Classes held as per a fixed schedule",
      "Fixed timings",
      "Held on Zoom",
      "All courses available",
      "Recordings available",
    ],
  },
  {
    id: "individual",
    title: "Individual Classes",
    points: [
      "Free trial lesson included",
      "Customised timetable",
      `${CLASS_MINUTES}-minute classes`,
      "Flexible timings",
      "Choose your own platform",
      "All courses available",
      "Focus on your understanding, not a fixed timeline",
    ],
  },
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

// One-to-one fees are charged per class day a week, per month, so a student can
// pick any days (up to maxDays). `PK` rates are shown only to visitors in
// Pakistan (see useCountry); everyone else sees `default` (USD). With these
// rates a full Mon-Fri week is $50 / 5,000 PKR and Sat + Sun is $30 / 3,000 PKR.
export const PRICING = {
  classMinutes: CLASS_MINUTES,
  maxDays: 5,
  weekendDays: ["Saturday", "Sunday"],
  perDay: {
    weekday: { default: 10, PK: 1000 },
    weekend: { default: 15, PK: 1500 },
  },
};

// The "action" URL from MailerLite's embedded-form code (a public endpoint, not
// a secret). If this is ever emptied, the email popup stays hidden.
export const MAILERLITE_FORM_URL =
  "https://assets.mailerlite.com/jsonp/2691946/forms/200652234456826919/subscribe";

export const MISSION_STATEMENT =
  "Our mission is to cover the 5 rights of the Quran: Belief (Iman), Recitation (Tilawah), Understanding (Fahm), Application (Amal), and Conveying the Message (Da'wah).";

// The five rights of the Quran that the institute teaches around.
export const MISSION_RIGHTS = [
  {
    title: "Belief",
    term: "Iman",
    description:
      "We help students trust the Quran as the word of Allah and build a firm, loving faith in it from the start.",
  },
  {
    title: "Recitation",
    term: "Tilawah",
    description:
      "We teach correct, beautiful recitation with Tajweed, patiently and one-to-one, so students read with confidence.",
  },
  {
    title: "Understanding",
    term: "Fahm",
    description:
      "We go beyond the words to the meaning, so students know what they are reciting and why it matters.",
  },
  {
    title: "Application",
    term: "Amal",
    description:
      "We help students bring the Quran into daily life, in their character, their prayer, and their choices at home.",
  },
  {
    title: "Conveying the Message",
    term: "Da’wah",
    description:
      "We prepare students to share what they’ve learned with their family and community, with kindness and with knowledge.",
  },
];

// Full "Who We Are" story, shown on /who-we-are.
export const STORY_PARAGRAPHS = [
  "Assiratul Mustaqeem Institute began at home, with a family that loved Deen-e-Islam. Our mother, a qualified teacher who completed her Alima course with Arabic and Tajweed training, began teaching at a young age, after her marriage. She raised her children with Islamic values and taught them Tajweed, and in 2013 she began teaching the Quran online. She taught her own children first, and since then our family has taught students living abroad.",
  "Today that family tradition has grown into a proper institute. We know how hard it can be to find a patient, qualified Quran teacher where you live, especially for families raising children far from home. So we bring the classroom to you, with a teacher who gives your child her full attention and never rushes them.",
  "Every student learns at their own pace. We don’t compare learners or hurry anyone. We teach for as long as it takes, because the goal is not finishing a book but building a lasting bond with the Quran.",
];

export const MISSION_HEADING = "To give the Quran its five rights, in every student’s life.";
export const MISSION_INTRO =
  "At Assiratul Mustaqeem Institute, we don’t teach the Quran as only a book to read. We teach it as a way of life, through five rights it holds over every believer:";
