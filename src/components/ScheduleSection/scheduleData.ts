export type Level = "Junior" | "Senior";
export type Category = "Technical" | "Non-Technical";

export interface EventItem {
  name: string;
  category: Category;
  venue: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  events: EventItem[];
}

export interface DaySchedule {
  day: number;
  slots: TimeSlot[];
}

export const TBC = "To Be Confirmed";

export const schedule: Record<Level, DaySchedule[]> = {
  Junior: [
    {
      day: 2,
      slots: [
        {
          start: "10:00 AM",
          end: "11:00 AM",
          events: [
            { name: "Cyber Escape", category: "Technical", venue: "AP Lab" },
            { name: "Pixel Paradox", category: "Technical", venue: "CAD Lab" },
            { name: "Prompt Master", category: "Technical", venue: "Garuda Lab" },
            { name: "Code Relay", category: "Technical", venue: TBC },
          ],
        },
        {
          start: "11:15 AM",
          end: "12:00 PM",
          events: [
            { name: "Mission Impossible", category: "Non-Technical", venue: "AP Lab" },
            { name: "Guess the Sound", category: "Non-Technical", venue: "VOC 208" },
            { name: "Blind Art", category: "Non-Technical", venue: "Garuda Lab" },
            { name: "Hidden Secret", category: "Non-Technical", venue: "VOC 209, VOC 210" },
          ],
        },
      ],
    },
  ],
  Senior: [
    {
      day: 1,
      slots: [
        {
          start: "10:30 AM",
          end: "12:00 PM",
          events: [
            { name: "Data Heist", category: "Technical", venue: "AP Lab" },
            { name: "Black Box", category: "Technical", venue: "Garuda Lab" },
            { name: "Risk or Reason", category: "Technical", venue: "AI Lab" },
          ],
        },
        {
          start: "12:30 PM",
          end: "2:00 PM",
          events: [
            { name: "Crack the Four", category: "Non-Technical", venue: "AP Lab" },
            { name: "Survey Feud", category: "Non-Technical", venue: "Garuda Lab" },
            { name: "Mock Parliament", category: "Non-Technical", venue: "AI Lab" },
          ],
        },
        {
          start: "3:00 PM",
          end: "4:30 PM",
          events: [
            { name: "Viz Showdown", category: "Technical", venue: "Garuda Lab" },
            { name: "Solo Dance", category: "Non-Technical", venue: TBC },
          ],
        },
      ],
    },
    {
      day: 2,
      slots: [
        {
          start: "10:30 AM",
          end: "12:00 PM",
          events: [{ name: "Algorithm Auction", category: "Technical", venue: "AI Lab" }],
        },
        {
          start: "12:30 PM",
          end: "2:00 PM",
          events: [{ name: "Throw n Know", category: "Non-Technical", venue: TBC }],
        },
      ],
    },
  ],
};

// Heading shown above each day. Add the real dates here, e.g. { 1: "Day 1 — 12 Nov 2026", ... }
export const dayLabels: Record<number, string> = {
  1: "Day 1",
  2: "Day 2",
};
