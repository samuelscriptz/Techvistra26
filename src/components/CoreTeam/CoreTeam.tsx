import { useState, useEffect, useRef, useId, useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import { X, Sparkles, Building, UserCheck } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./CoreTeam.module.css";

export type GroupId =
  | "technical"
  | "nontechnical"
  | "design"
  | "logistics"
  | "registration";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  committee: string;
  department?: string;
  image: string;
  roleType: "hod" | "faculty" | "coordinator";
  group?: GroupId;
  bio?: string;
}

// ---------------------------------------------------------------------------
// CORE TEAM DATA
// Replace names, titles, committees, bios and images with your real team.
// For local images: put them in `public/team/` and use `image: "/team/name.jpg"`.
// If an image fails to load, the card automatically shows the person's initials.
// ---------------------------------------------------------------------------

const DEPARTMENT = "Department of Data Science";
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=75`;

// Placeholder photo pool (only used by the sample data below)
const PHOTOS = [
  "photo-1539571696357-5a69c17a67c6",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1500648767791-00dcc994a43e",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1517841905240-472988babdf9",
  "photo-1492562080023-ab3db95bfbce",
  "photo-1524504388940-b1c1722653e1",
  "photo-1501196354995-cbb51c65aaea",
  "photo-1534528741775-53994a69daeb",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1544005313-94ddf0286df2",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1513956589380-bad6acb9b9d4",
  "photo-1573496359142-b8d87734a5a2",
].map(unsplash);

/** Committee filters shown above the coordinator grid */
const GROUPS: { id: GroupId; label: string }[] = [
  { id: "technical", label: "Technical" },
  { id: "nontechnical", label: "Non-Technical" },
  { id: "design", label: "Design & Media" },
  { id: "logistics", label: "Logistics & Hospitality" },
  { id: "registration", label: "Registration & Finance" },
];

const HOD_MEMBER: TeamMember = {
  id: "hod-1",
  name: "Dr. M. Senthil Kumar",
  title: "Head of the Department",
  committee: "Symposium Patron & Academic Leadership",
  department: DEPARTMENT,
  image: unsplash("photo-1534528741775-53994a69daeb"),
  roleType: "hod",
  bio: "Guiding the academic vision and strategic research orientation of TechVistra '26, pioneering high-dimensional data exploration and national computational symposiums.",
};

const faculty = (
  n: number,
  name: string,
  committee: string,
  image: string,
  bio: string
): TeamMember => ({
  id: `fac-${n}`,
  name,
  title: "Faculty Coordinator",
  committee,
  department: DEPARTMENT,
  image: unsplash(image),
  roleType: "faculty",
  bio,
});

const FACULTY_MEMBERS: TeamMember[] = [
  faculty(
    1,
    "Dr. S. Rajeshwari",
    "Academic & Technical Advisory",
    "photo-1573496359142-b8d87734a5a2",
    "Mentoring competitive programming arenas, technical track compliance, and inter-collegiate technical relations."
  ),
  faculty(
    2,
    "Prof. K. Anand",
    "Industry & Partner Relations",
    "photo-1560250097-0b93528c311a",
    "Facilitating corporate technology partners, industry keynote speakers, and national innovation sponsorships."
  ),
  faculty(
    3,
    "Dr. V. Deepa",
    "Student Affairs & Operations",
    "photo-1580489944761-15a19d654956",
    "Coordinating student committees, campus hospitality, and seamless stage operations throughout the symposium."
  ),
  faculty(
    4,
    "Prof. R. Lakshmi",
    "Finance & Documentation",
    "photo-1494790108377-be9c29b29330",
    "Overseeing budgets, sponsorship accounts, certificates, and the official records of the symposium."
  ),
];

const coord = (
  n: number,
  group: GroupId,
  name: string,
  title: string,
  committee: string,
  bio: string
): TeamMember => ({
  id: `coord-${n}`,
  name,
  title,
  committee,
  department: DEPARTMENT,
  image: PHOTOS[(n - 1) % PHOTOS.length],
  roleType: "coordinator",
  group,
  bio,
});

const COORDINATOR_MEMBERS: TeamMember[] = [
  // ---- Technical (6) ----
  coord(1, "technical", "Saketh Rayalu", "Lead Event Coordinator", "Technical Events & Hackathons", "Spearheading overall symposium technical challenges, problem architecture, and core event workflow."),
  coord(2, "technical", "Syed Naveed", "Technical Coordinator", "Coding & Algorithm Arenas", "Managing algorithmic track evaluation platforms, server benchmarks, and live competition judging."),
  coord(3, "technical", "Amardeep Samuel", "Web & Systems Lead", "Portal & Digital Infrastructure", "Directing the official TechVistra registration platform, interactive 3D web experience, and cloud deployments."),
  coord(4, "technical", "Yaswanth Krishna", "Technical Coordinator", "AI & Neural Challenge Arena", "Organizing machine learning datasets, model evaluation pipelines, and research colloquium sessions."),
  coord(5, "technical", "P. Rohit Kumar", "Technical Coordinator", "Competitive Coding Track", "Curating dynamic programming and graph theory problems with automated sandbox test suites."),
  coord(6, "technical", "J. Arvind", "Technical Coordinator", "Paper & Project Expo", "Handling paper presentations, project showcases, and reviewer scheduling."),

  // ---- Non-Technical (6) ----
  coord(7, "nontechnical", "K. Divya", "Event Coordinator", "Non-Technical Competitions", "Overseeing participant engagement, creative rounds, and inter-departmental competition structures."),
  coord(8, "nontechnical", "R. Vignesh", "Event Coordinator", "Quiz & Debate Arenas", "Conducting mock parliament proceedings, speed-quiz buzzers, and logic puzzles."),
  coord(9, "nontechnical", "M. Priya", "Event Coordinator", "Junior Events Track", "Mentoring junior participants, orientation workflows, and event schedules."),
  coord(10, "nontechnical", "S. Harish", "Event Coordinator", "Creative & Mystery Arenas", "Managing the Cyber Escape and Black Box problem-solving tracks."),
  coord(11, "nontechnical", "A. Swetha", "Event Coordinator", "Solo Spotlight Arena", "Coordinating solo talent rounds, participant staging, and judging rubrics."),
  coord(12, "nontechnical", "L. Meera", "Event Coordinator", "Fun & Games Zone", "Running the informal games zone and prize rounds between main events."),

  // ---- Design & Media (6) ----
  coord(13, "design", "V. Karthik", "Design Lead", "Media & Brand Identity", "Crafting visual posters, symposium motion identities, and official digital assets."),
  coord(14, "design", "N. Ananya", "Media Coordinator", "Social Media & Outreach", "Managing social handles, teaser campaigns, and college ambassador outreach."),
  coord(15, "design", "B. Dinesh", "Publicity Lead", "Campus Ambassador Network", "Expanding participation across 40+ engineering colleges and national institutes."),
  coord(16, "design", "T. Pooja", "Design Coordinator", "Visual Arts & Graphics", "Designing certificates, stage backdrops, badges, and event brochures."),
  coord(17, "design", "G. Praveen", "Media Coordinator", "Coverage & Documentation", "Directing photo documentation, recap films, and live video feeds."),
  coord(18, "design", "C. Sneha", "Content Coordinator", "Content & Newsletters", "Writing announcements, event descriptions, and the daily symposium bulletin."),

  // ---- Logistics & Hospitality (6) ----
  coord(19, "logistics", "R. Suresh", "Logistics Lead", "Venue & Equipment Infrastructure", "Supervising computer labs, auditorium acoustics, network lines, and lab seating."),
  coord(20, "logistics", "S. Kavitha", "Hospitality Lead", "Guest Relations & Reception", "Welcoming university delegations and keynote guests, and providing campus support."),
  coord(21, "logistics", "P. Gokul", "Logistics Coordinator", "Transport & Accommodation", "Arranging participant transport, accommodation, and guest pick-ups."),
  coord(22, "logistics", "R. Nisha", "Hospitality Coordinator", "Food & Refreshments", "Planning meals, refreshments, and dietary requirements for all attendees."),
  coord(23, "logistics", "H. Imran", "Logistics Coordinator", "Stage & Technical Setup", "Preparing stages, projectors, sound systems, and backup power."),
  coord(24, "logistics", "E. Janani", "Hospitality Coordinator", "Help Desk & Guidance", "Guiding visitors across campus and handling on-the-spot queries."),

  // ---- Registration & Finance (6) ----
  coord(25, "registration", "M. Balaji", "Registration Lead", "Desk & Entry Management", "Managing on-spot kit distribution, badge scanning, and registration desks."),
  coord(26, "registration", "K. Preeti", "Finance Coordinator", "Budget & Cash Prize Desk", "Handling prize distributions, verified winner reconciliations, and merit certificates."),
  coord(27, "registration", "D. Arun", "Volunteer Coordinator", "Floor Operations & Flow", "Directing 50+ student volunteers to keep event transitions smooth across campus."),
  coord(28, "registration", "S. Nandhini", "Registration Coordinator", "Online Registrations", "Verifying online registrations, payments, and participant queries."),
  coord(29, "registration", "V. Tharun", "Finance Coordinator", "Sponsorship & Accounts", "Tracking sponsorship funds, expenses, and vendor payments."),
  coord(30, "registration", "A. Lavanya", "Volunteer Coordinator", "Certificates & Feedback", "Preparing participation certificates and collecting event feedback."),
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const initialsOf = (name: string) =>
  name
    .replace(/^(Dr|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((p) => p.replace(/\./g, "")[0])
    .join("")
    .toUpperCase();

/** Reveals when scrolled into view, hides again when scrolled out (enter + exit animation). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.isVisible : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Member card
// ---------------------------------------------------------------------------

interface MemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  className?: string;
  compact?: boolean;
  index?: number;
}

function MemberCard({
  member,
  onSelect,
  className = "",
  compact = false,
  index = 0,
}: MemberCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [failed, setFailed] = useState(false);

  // Small stagger within a row, so cards ripple in without long waits
  const delay = Math.min(index % 6, 5) * 70;

  return (
    <div
      ref={ref}
      className={[
        styles.memberCard,
        styles.reveal,
        visible ? styles.isVisible : "",
        compact ? styles.compact : "",
        className,
      ].join(" ")}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      onClick={() => onSelect(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(member);
        }
      }}
      aria-label={`View profile details for ${member.name}, ${member.title}`}
    >
      {failed ? (
        <div className={styles.initials} aria-hidden="true">
          {initialsOf(member.name)}
        </div>
      ) : (
        <img
          src={member.image}
          alt={member.name}
          className={styles.memberImage}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}

      <span className={styles.viewBadge}>View</span>

      <div className={styles.cardOverlay}>
        <span className={styles.cardRole}>{member.title}</span>
        <h3 className={styles.cardName}>{member.name}</h3>
        {!compact && <span className={styles.cardCommittee}>{member.committee}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export default function CoreTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeGroup, setActiveGroup] = useState<GroupId | "all">("all");
  const [modalPhotoFailed, setModalPhotoFailed] = useState(false);
  const modalTitleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const visibleCoordinators = useMemo(
    () =>
      activeGroup === "all"
        ? COORDINATOR_MEMBERS
        : COORDINATOR_MEMBERS.filter((m) => m.group === activeGroup),
    [activeGroup]
  );

  const countFor = (id: GroupId | "all") =>
    id === "all"
      ? COORDINATOR_MEMBERS.length
      : COORDINATOR_MEMBERS.filter((m) => m.group === id).length;

  const selectMember = (member: TeamMember | null) => {
    setModalPhotoFailed(false);
    setSelectedMember(member);
  };

  // Close on Escape & lock body scroll while the modal is open
  useEffect(() => {
    if (!selectedMember) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  const tabs: { id: GroupId | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...GROUPS,
  ];

  return (
    <section id="core-team" className={styles.section} aria-labelledby="core-team-title">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <SectionTitle
            id="core-team-title"
            title="The Core "
            className={styles.sectionTitle}
          />
        </Reveal>

        {/* Tier 1: Head of Department */}
        <div className={styles.tierBlock}>
          <Reveal className={styles.tierHead}>
            <span className={styles.tierLabel}>
              <Sparkles size={12} aria-hidden="true" /> Head of the Department
            </span>
          </Reveal>
          <div className={styles.hodRow}>
            <MemberCard
              member={HOD_MEMBER}
              onSelect={selectMember}
              className={styles.hodCard}
            />
          </div>
        </div>

        {/* Tier 2: Faculty Coordinators (4 in a row) */}
        <div className={styles.tierBlock}>
          <Reveal className={styles.tierHead}>
            <span className={styles.tierLabel}>
              <Building size={12} aria-hidden="true" /> Faculty Coordinators
            </span>
          </Reveal>
          <div className={styles.facultyRow}>
            {FACULTY_MEMBERS.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                onSelect={selectMember}
                className={styles.facultyCard}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Tier 3: Student Coordinators (30) with committee filter */}
        <div className={styles.tierBlock}>
          <Reveal className={styles.tierHead}>
            <span className={styles.tierLabel}>
              <UserCheck size={12} aria-hidden="true" /> Student Coordinators
            </span>
          </Reveal>

          <Reveal className={styles.tabsWrap}>
            <div className={styles.tabs} role="tablist" aria-label="Filter student coordinators by committee">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeGroup === tab.id}
                  className={`${styles.tab} ${activeGroup === tab.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveGroup(tab.id)}
                >
                  {tab.label}
                  <span className={styles.tabCount}>{countFor(tab.id)}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* key remounts the grid so the entrance animation replays on every filter change */}
          <div className={styles.coordinatorsGrid} key={activeGroup} role="tabpanel">
            {visibleCoordinators.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                onSelect={selectMember}
                compact
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up modal (left: photo, right: details) */}
      {selectedMember && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) selectMember(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
        >
          <div className={styles.modal}>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeButton}
              onClick={() => selectMember(null)}
              aria-label="Close profile modal"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className={styles.modalPhotoSide}>
              {modalPhotoFailed ? (
                <div className={styles.initials} aria-hidden="true">
                  {initialsOf(selectedMember.name)}
                </div>
              ) : (
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className={styles.modalPhotoImage}
                  onError={() => setModalPhotoFailed(true)}
                />
              )}
            </div>

            <div className={styles.modalDetailsSide}>
              <span className={styles.modalEyebrow}>TechVistra &apos;26 Core Committee</span>

              <div className={styles.modalNameGroup}>
                <h2 id={modalTitleId} className={styles.modalName}>
                  {selectedMember.name}
                </h2>
                <p className={styles.modalRole}>{selectedMember.title}</p>
              </div>

              <div className={styles.modalInfoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Committee</span>
                  <span className={styles.infoValue}>{selectedMember.committee}</span>
                </div>

                {selectedMember.department && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Department</span>
                    <span className={styles.infoValue}>{selectedMember.department}</span>
                  </div>
                )}
              </div>

              {selectedMember.bio && <p className={styles.modalBio}>{selectedMember.bio}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}