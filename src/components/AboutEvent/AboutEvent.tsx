import EventsHosted, { type EventItem } from "./EventsHosted";

/** About the Event content, dropped into the Events Hosted template. */
export const ABOUT_ITEMS: EventItem[] = [
  { id: "edition", number: "01", eyebrow: "National Level Symposium", title: "2nd Edition", description: "Following the success of TechVistra '25, expanding national participation across Indian universities.", area: "tech", tone: "dark" },
  { id: "tracks", number: "02", eyebrow: "Competitive Arenas", title: "6+ Tracks", description: "Spanning AI Hackathons, Competitive Coding, Quantum Research Colloquiums, and Web3 Architectures.", area: "workshops", tone: "navy" },
  { id: "awards", number: "03", eyebrow: "Cash Prizes & Trophies", title: "Grand Awards", description: "Exciting cash prizes and merit awards for winning teams, with verified participation certificates for all.", area: "hack", tone: "dark" },
  { id: "host", number: "04", eyebrow: "Host & Organizer", title: "Dept. of Data Science", description: "Organized with pride by the faculty, researchers, and student innovators of the Department of Data Science.", area: "dept", tone: "navy" },
];

const INTRO =
  "";

interface AboutEventProps {
  items?: EventItem[];
  intro?: string;
  scrollPerItem?: number;
}

export default function AboutEvent({
  items = ABOUT_ITEMS,
  intro = INTRO,
  scrollPerItem,
}: AboutEventProps) {
  return (
    <EventsHosted
      id="about"
      heading="ABOUT"
      intro={intro}
      events={items}
      scrollPerItem={scrollPerItem}
    />
  );
}
