/**
 * Central event configuration — single source of truth for all event facts.
 * Bracketed values are placeholders awaiting organizer confirmation.
 * Do not render placeholder strings as real public content.
 */

export interface EventConfig {
  name: string;
  edition: string;
  descriptor: string;
  organizer: string;
  registrationUrl: string;
  registrationState: "not_confirmed" | "opens_on_date" | "open" | "closed";
  registrationOpenDate: string;
  eventDates: string;
  venue: string;
  contactEmail: string;
  contactPhone: string;
  facebookUrl?: string;
  socialLinks: { platform: string; url: string; label: string }[];
  eventSummary: string;
  faq: { question: string; answer: string }[];
  programTracks: {
    title: string;
    description: string;
    icon?: string;
  }[];
  schedule: {
    day: string;
    events: { time: string; title: string; description?: string }[];
  }[];
  speakers: {
    name: string;
    role: string;
    image?: string;
    bio?: string;
  }[];
  partners: { name: string; logo?: string; url?: string }[];
}

export const eventConfig: EventConfig = {
  name: "Techvistra Q-Vortex",
  edition: "Techvistra '26",
  descriptor: "2nd National Level Technical Symposium",
  organizer: "Department of Data Science",
  registrationUrl: "#events",
  registrationState: "not_confirmed",
  registrationOpenDate: "[REGISTRATION_OPEN_DATE]",
  eventDates: "November 16 & 17, 2026",
  venue:
    "Dr. MGR Educational and Research Institute, Poonamallee High Rd, Vishwas Nagar, Maduravoyal, Chennai, Tamil Nadu - 600095",
  contactEmail: "techvistra@drmgrdu.ac.in",
  contactPhone: "+91 97909 49122",
  // 🔗 PASTE FACEBOOK URL HERE (OR IN ContentSections.tsx):
  facebookUrl: "",
  socialLinks: [],
  eventSummary:
    "At the intersection of computational power, high-dimensional data, and human purpose. TECHVISTRA '26 brings together leading student engineers, researchers, and algorithmic pioneers from institutions across the nation to explore the quantum horizon of intelligent systems.",
  faq: [
    {
      question: "Who is eligible to participate?",
      answer:
        "TECHVISTRA '26 is open to undergraduate and postgraduate students from engineering, computer science, data science, and affiliated technical departments across all recognized universities in India.",
    },
    {
      question: "How do team registrations work?",
      answer:
        "Team sizes vary by track (1 to 4 members). Detailed team guidelines and eligibility criteria will be specified on the official registration portal for each competitive arena.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "Track registration fees, kit details, and prize pool distributions will be officially published once the registration portal goes live.",
    },
    {
      question: "What technical setup should participants bring?",
      answer:
        "Participants competing in hackathons and coding arenas must bring their laptops, chargers, and verified institutional photo ID. Campus Wi-Fi and high-speed lab networks will be provided.",
    },
    {
      question: "Will participants receive certificates and awards?",
      answer:
        "Every registered participant receives an official certificate of participation from the Department of Data Science. Winning teams receive merit trophies, certificates, and cash prizes.",
    },
  ],
  programTracks: [
    {
      title: "AI & Neural Hackathon",
      description:
        "24-hour sprint engineering multimodal intelligence, fine-tuned LLM agents, and real-time computer vision pipelines.",
      icon: "⚡",
    },
    {
      title: "Algorithmic Code Sprint",
      description:
        "Intense competitive programming battle solving dynamic programming, graph theory, and mathematical optimization challenges.",
      icon: "💻",
    },
    {
      title: "Quantum & Data Colloquium",
      description:
        "National research symposium presenting peer-reviewed student papers in quantum algorithms, NLP, and predictive modeling.",
      icon: "🔬",
    },
    {
      title: "Web3 & Cloud Architectures",
      description:
        "Design scalable microservices, zero-knowledge verification systems, and distributed ledger solutions.",
      icon: "🌐",
    },
    {
      title: "Data Visualization Arena",
      description:
        "Transform high-dimensional raw datasets into captivating, real-time interactive analytical dashboards.",
      icon: "📊",
    },
    {
      title: "Tech Quiz & Debugging",
      description:
        "Rapid-fire architectural trivia, esoteric bug hunts, and high-speed system debugging rounds.",
      icon: "🎯",
    },
  ],
  schedule: [
    {
      day: "Day 1 — Main Symposium Day [Date TBC]",
      events: [
        {
          time: "08:30 AM",
          title: "Delegate Check-in & Welcome Kit Distribution",
          description: "Registration verification and team badge issuance.",
        },
        {
          time: "09:30 AM",
          title: "Inaugural Ceremony & Quantum Keynote",
          description: "Opening addresses by dignitaries and Department leadership.",
        },
        {
          time: "11:00 AM",
          title: "Preliminary Rounds: Code Sprint & Paper Screening",
          description: "Competitive arenas commence simultaneously across computing labs.",
        },
        {
          time: "01:00 PM",
          title: "Networking Luncheon & Tech Exhibitions",
          description: "Interactive project demos and departmental showcase.",
        },
        {
          time: "02:00 PM",
          title: "Hackathon Final Evaluations & Defense",
          description: "Top finalist teams present to the industry jury panel.",
        },
        {
          time: "04:30 PM",
          title: "Valedictory Ceremony & Grand Prize Awards",
          description: "Felicitation of winners, runners-up, and concluding remarks.",
        },
      ],
    },
  ],
  speakers: [],
  partners: [],
};

/** Check if a config value is still a placeholder */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("[") && value.endsWith("]");
}

/** Theme words from the logo */
export const themeWords = [
  "Quantum Technologies",
  "Visualization",
  "Optimization",
  "Research",
  "Technology",
  "Exploration",
] as const;
