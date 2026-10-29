import EventsHosted, { type EventItem } from "./EventsHosted";

/** About the Event content, dropped into the Events Hosted template. */
export const ABOUT_ITEMS: EventItem[] = [
  {
    id: "edition",
    number: "01",
    eyebrow: "National Level Symposium",
    title: "2nd Edition",
    description: (
      <>
        Building on the success of{" "}
        <a
          href="https://www.techvistra.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>TechVistra '25</b>
        </a>
        , this edition welcomes students from universities across India.
      </>
    ),
    area: "tech",
    tone: "dark",
  },
  {
    id: "tracks",
    number: "02",
    eyebrow: "More than 18 events",
    title: "18+ Events",
    description:
      "Technical, non-technical, and junior events give students a chance to showcase their skills, creativity, and talent.",
    area: "workshops",
    tone: "navy",
  },
  {
    id: "awards",
    number: "03",
    eyebrow: "Cash prizes & trophies",
    title: "₹1,00,000+ Prize Pool",
    description:
      "Compete for cash prizes and merit awards across the events. Every participant receives a certificate.",
    area: "hack",
    tone: "dark",
  },
  {
    id: "host",
    number: "04",
    eyebrow: "Host & organizer",
    title: "Department of Data Science",
    description:
      "The symposium is organized by the faculty, researchers, and student innovators of the Department of Data Science.",
    area: "dept",
    tone: "navy",
  },
];

const INTRO = "";

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
