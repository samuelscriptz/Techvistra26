// import { useState, useEffect, useRef, useId, useCallback } from "react";
// import type { CSSProperties, ReactNode, MouseEvent as ReactMouseEvent } from "react";
// import {
//   X,
//   Sparkles,
//   Building,
//   Users,
//   ChevronLeft,
//   ChevronRight,
//   Maximize2,
// } from "lucide-react";
// import SectionTitle from "../SectionTitle/SectionTitle";
// import styles from "./CoreTeam.module.css";

// export interface TeamMember {
//   id: string;
//   name: string;
//   title: string;
//   committee: string;
//   department?: string;
//   image: string;
//   roleType: "hod" | "faculty";
//   bio?: string;
// }

// export interface Committee {
//   id: string;
//   name: string;
//   image: string;
// }

// // ---------------------------------------------------------------------------
// // CORE TEAM DATA
// // All images live in:  public/core/   ->  referenced as "/core/<file name>"
// // If an image is missing, the card shows initials / a placeholder instead.
// // ---------------------------------------------------------------------------

// const DEPARTMENT = "Department of Data Science";

// /** encodeURI so file names with spaces (e.g. "1 maheswari.jpg") still load */
// const coreImg = (file: string) => encodeURI(`/core/${file}`);

// const HOD_MEMBER: TeamMember = {
//   id: "hod-1",
//   name: "Dr. M. Senthil Kumar", // TODO: replace with your real HOD name
//   title: "Head of the Department",
//   committee: "Symposium Patron & Academic Leadership",
//   department: DEPARTMENT,
//   image: coreImg("HOD.jpeg"),
//   roleType: "hod",
//   bio: "Guiding the academic vision and strategic research orientation of TechVistra '26, pioneering high-dimensional data exploration and national computational symposiums.",
// };

// const faculty = (
//   n: number,
//   name: string,
//   committee: string,
//   file: string,
//   bio: string
// ): TeamMember => ({
//   id: `fac-${n}`,
//   name,
//   title: "Faculty Coordinator",
//   committee,
//   department: DEPARTMENT,
//   image: coreImg(file),
//   roleType: "faculty",
//   bio,
// });

// const FACULTY_BIO =
//   "Faculty coordinator for TechVistra '26, supporting the organising committees from planning to the event days.";

// // TODO: replace the names / committees / bios with the real details
// const FACULTY_MEMBERS: TeamMember[] = [
//   faculty(1, "Maheswari", "Faculty Coordinator", "1 maheswari.jpg", FACULTY_BIO),
//   faculty(2, "Akhila", "Faculty Coordinator", "2 akhila.png", FACULTY_BIO),
//   faculty(3, "Priyanga", "Faculty Coordinator", "3 Priyanga.png", FACULTY_BIO),
//   faculty(4, "Praveen", "Faculty Coordinator", "4 Praveen.jpeg", FACULTY_BIO),
// ];

// /** The 8 committees, one 16:9 group photo each */
// const COMMITTEES: Committee[] = [
//   { id: "website", name: "Website Committee", image: coreImg("website.png") },
//   { id: "design", name: "Designing Committee", image: coreImg("design.png") },
//   { id: "media", name: "Media Committee", image: coreImg("media.png") },
//   { id: "decor", name: "Decoration Committee", image: coreImg("decor.png") },
//   { id: "events", name: "Events Coordinators", image: coreImg("events.png") },
//   {
//     id: "registration",
//     name: "Registration & Hospitality Committee",
//     image: coreImg("registration.png"),
//   },
//   { id: "outreach", name: "Outreach Committee", image: coreImg("outreach.png") },
//   {
//     id: "purchase",
//     name: "Purchase & Finance Committee",
//     image: coreImg("purchase.png"),
//   },
// ];

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------

// const initialsOf = (name: string) =>
//   name
//     .replace(/^(Dr|Prof)\.?\s+/i, "")
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(-2)
//     .map((p) => p.replace(/\./g, "")[0])
//     .join("")
//     .toUpperCase();

// /** Fades in once when scrolled into view (and stays). */
// function useReveal<T extends HTMLElement>() {
//   const ref = useRef<T>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce || typeof IntersectionObserver === "undefined") {
//       setVisible(true);
//       return;
//     }

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return { ref, visible };
// }

// function Reveal({
//   children,
//   className = "",
// }: {
//   children: ReactNode;
//   className?: string;
// }) {
//   const { ref, visible } = useReveal<HTMLDivElement>();
//   return (
//     <div
//       ref={ref}
//       className={`${styles.reveal} ${visible ? styles.isVisible : ""} ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// /** Thin gold line + diamond that draws down between two tiers */
// function Connector() {
//   const { ref, visible } = useReveal<HTMLSpanElement>();
//   return (
//     <span
//       ref={ref}
//       className={`${styles.connector} ${visible ? styles.connectorOn : ""}`}
//       aria-hidden="true"
//     />
//   );
// }

// // ---------------------------------------------------------------------------
// // Member card (HOD + faculty)
// // ---------------------------------------------------------------------------

// interface MemberCardProps {
//   member: TeamMember;
//   onSelect: (member: TeamMember) => void;
//   className?: string;
//   index?: number;
// }

// function MemberCard({ member, onSelect, className = "", index = 0 }: MemberCardProps) {
//   const { ref, visible } = useReveal<HTMLDivElement>();
//   const [failed, setFailed] = useState(false);

//   return (
//     <div
//       ref={ref}
//       className={[
//         styles.memberCard,
//         styles.reveal,
//         visible ? styles.isVisible : "",
//         className,
//       ].join(" ")}
//       style={{ "--delay": `${index * 80}ms` } as CSSProperties}
//       onClick={() => onSelect(member)}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           onSelect(member);
//         }
//       }}
//       aria-label={`View profile details for ${member.name}, ${member.title}`}
//     >
//       {failed ? (
//         <div className={styles.initials} aria-hidden="true">
//           {initialsOf(member.name)}
//         </div>
//       ) : (
//         <img
//           src={member.image}
//           alt={member.name}
//           className={styles.memberImage}
//           loading="lazy"
//           onError={() => setFailed(true)}
//         />
//       )}

//       <div className={styles.cardOverlay}>
//         <span className={styles.cardRole}>{member.title}</span>
//         <h3 className={styles.cardName}>{member.name}</h3>
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Committee card (16:9 group photo)
// // ---------------------------------------------------------------------------

// interface CommitteeCardProps {
//   committee: Committee;
//   index: number;
//   onOpen: (index: number) => void;
// }

// function CommitteeCard({ committee, index, onOpen }: CommitteeCardProps) {
//   const { ref, visible } = useReveal<HTMLDivElement>();
//   const [failed, setFailed] = useState(false);

//   return (
//     <div
//       ref={ref}
//       className={`${styles.reveal} ${visible ? styles.isVisible : ""}`}
//       style={{ "--delay": `${(index % 2) * 140}ms` } as CSSProperties}
//     >
//       <button
//         type="button"
//         className={styles.committeeCard}
//         onClick={() => onOpen(index)}
//         aria-label={`Open group photo of the ${committee.name}`}
//       >
//         <span className={styles.committeeFrame}>
//           {failed ? (
//             <span className={styles.committeePlaceholder}>Photo coming soon</span>
//           ) : (
//             <img
//               src={committee.image}
//               alt={`${committee.name} group photo`}
//               className={styles.committeeImage}
//               loading="lazy"
//               onError={() => setFailed(true)}
//             />
//           )}
//           <span className={styles.curtain} aria-hidden="true" />
//           <span className={styles.expandIcon} aria-hidden="true">
//             <Maximize2 size={16} />
//           </span>
//         </span>
//         <span className={styles.committeeCaption}>
//           <span className={styles.committeeRow}>
//             <span className={styles.committeeName}>{committee.name}</span>
//             <span className={styles.committeeTag} aria-hidden="true">
//               {String(index + 1).padStart(2, "0")}
//             </span>
//           </span>
//           <span className={styles.committeeLine} aria-hidden="true" />
//         </span>
//       </button>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Lightbox: large photo, arrows, keyboard, wheel zoom, click anywhere closes
// // ---------------------------------------------------------------------------

// interface LightboxProps {
//   items: Committee[];
//   index: number;
//   onIndexChange: (index: number) => void;
//   onClose: () => void;
// }

// function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
//   const current = items[index];
//   const imgRef = useRef<HTMLImageElement>(null);
//   const touchStartX = useRef<number | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [origin, setOrigin] = useState("50% 50%");
//   const [failed, setFailed] = useState(false);
//   const [dir, setDir] = useState<1 | -1>(1);

//   const go = useCallback(
//     (d: 1 | -1) => {
//       setDir(d);
//       onIndexChange((index + d + items.length) % items.length);
//     },
//     [index, items.length, onIndexChange]
//   );

//   useEffect(() => {
//     setZoom(1);
//     setOrigin("50% 50%");
//     setFailed(false);
//   }, [index]);

//   // ← → navigate, Esc closes, page scroll locked while open
//   useEffect(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") {
//         e.preventDefault();
//         go(1);
//       } else if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         go(-1);
//       } else if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = originalOverflow;
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [go, onClose]);

//   // Mouse wheel zooms towards the cursor
//   const onWheel = (e: React.WheelEvent) => {
//     const img = imgRef.current;
//     if (!img) return;
//     const rect = img.getBoundingClientRect();
//     const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
//     const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
//     setOrigin(`${x}% ${y}%`);
//     setZoom((z) => Math.min(3.5, Math.max(1, +(z - e.deltaY * 0.002).toFixed(3))));
//   };

//   // Swipe on touch screens
//   const onTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const onTouchEnd = (e: React.TouchEvent) => {
//     if (touchStartX.current === null) return;
//     const dx = e.changedTouches[0].clientX - touchStartX.current;
//     touchStartX.current = null;
//     if (Math.abs(dx) > 60 && zoom === 1) go(dx < 0 ? 1 : -1);
//   };

//   const stop = (fn: () => void) => (e: ReactMouseEvent) => {
//     e.stopPropagation();
//     fn();
//   };

//   return (
//     <div
//       className={styles.lightbox}
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${current.name} group photo`}
//       onClick={onClose} // clicking anywhere (photo, background, caption) closes
//       onWheel={onWheel}
//       onTouchStart={onTouchStart}
//       onTouchEnd={onTouchEnd}
//     >
//       <button
//         type="button"
//         className={`${styles.lightboxArrow} ${styles.arrowPrev}`}
//         onClick={stop(() => go(-1))}
//         aria-label="Previous photo"
//       >
//         <ChevronLeft size={28} aria-hidden="true" />
//       </button>

//       <figure className={styles.lightboxFigure}>
//         {failed ? (
//           <div className={styles.lightboxMissing}>Photo for {current.name} not found</div>
//         ) : (
//           <img
//             key={current.id}
//             ref={imgRef}
//             src={current.image}
//             alt={`${current.name} group photo`}
//             className={`${styles.lightboxImage} ${dir === 1 ? styles.fromRight : styles.fromLeft}`}
//             style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
//             draggable={false}
//             onError={() => setFailed(true)}
//           />
//         )}
//         <figcaption className={styles.lightboxCaption}>
//           <span className={styles.lightboxTitle}>{current.name}</span>
//           <span className={styles.lightboxCount}>
//             {index + 1} / {items.length}
//           </span>
//         </figcaption>
//       </figure>

//       <button
//         type="button"
//         className={`${styles.lightboxArrow} ${styles.arrowNext}`}
//         onClick={stop(() => go(1))}
//         aria-label="Next photo"
//       >
//         <ChevronRight size={28} aria-hidden="true" />
//       </button>

//       <button
//         type="button"
//         className={styles.lightboxClose}
//         onClick={stop(onClose)}
//         aria-label="Close photo"
//       >
//         <X size={20} aria-hidden="true" />
//       </button>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Main section
// // ---------------------------------------------------------------------------

// export default function CoreTeam() {
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
//   const [modalPhotoFailed, setModalPhotoFailed] = useState(false);
//   const modalTitleId = useId();
//   const closeBtnRef = useRef<HTMLButtonElement>(null);

//   const selectMember = (member: TeamMember | null) => {
//     setModalPhotoFailed(false);
//     setSelectedMember(member);
//   };

//   const closeLightbox = useCallback(() => setLightboxIndex(null), []);

//   // Profile modal: Escape closes, body scroll locked
//   useEffect(() => {
//     if (!selectedMember) return;

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     closeBtnRef.current?.focus();

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setSelectedMember(null);
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.body.style.overflow = originalOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [selectedMember]);

//   return (
//     <section id="core-team" className={styles.section} aria-labelledby="core-team-title">
//       <div className={styles.ambientGlow} aria-hidden="true" />

//       <div className={styles.inner}>
//         <Reveal>
//           <SectionTitle
//             id="core-team-title"
//             title="The Core "
//             className={styles.sectionTitle}
//           />
//         </Reveal>

//         {/* Head of Department */}
//         <div className={styles.tierBlock}>
//           <Reveal className={styles.tierHead}>
//             <span className={styles.tierLabel}>
//               <Sparkles size={12} aria-hidden="true" /> Head of the Department
//             </span>
//           </Reveal>
//           <div className={styles.hodRow}>
//             <MemberCard
//               member={HOD_MEMBER}
//               onSelect={selectMember}
//               className={styles.hodCard}
//             />
//           </div>
//         </div>

//         {/* Faculty Coordinators */}
//         <div className={styles.tierBlock}>
//           <Connector />
//           <Reveal className={styles.tierHead}>
//             <span className={styles.tierLabel}>
//               <Building size={12} aria-hidden="true" /> Faculty Coordinators
//             </span>
//           </Reveal>
//           <div className={styles.facultyRow}>
//             {FACULTY_MEMBERS.map((member, i) => (
//               <MemberCard
//                 key={member.id}
//                 member={member}
//                 onSelect={selectMember}
//                 className={styles.facultyCard}
//                 index={i}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Committees: 8 group photos, 16:9 */}
//         <div className={styles.tierBlock}>
//           <Connector />
//           <Reveal className={styles.tierHead}>
//             <span className={styles.tierLabel}>
//               <Users size={12} aria-hidden="true" /> Our Committees
//             </span>
//           </Reveal>

//           <div className={styles.committeeGrid}>
//             {COMMITTEES.map((committee, i) => (
//               <CommitteeCard
//                 key={committee.id}
//                 committee={committee}
//                 index={i}
//                 onOpen={setLightboxIndex}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {lightboxIndex !== null && (
//         <Lightbox
//           items={COMMITTEES}
//           index={lightboxIndex}
//           onIndexChange={setLightboxIndex}
//           onClose={closeLightbox}
//         />
//       )}

//       {selectedMember && (
//         <div
//           className={styles.modalBackdrop}
//           onClick={(e) => {
//             if (e.target === e.currentTarget) selectMember(null);
//           }}
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby={modalTitleId}
//         >
//           <div className={styles.modal}>
//             <button
//               ref={closeBtnRef}
//               type="button"
//               className={styles.closeButton}
//               onClick={() => selectMember(null)}
//               aria-label="Close profile modal"
//             >
//               <X size={20} aria-hidden="true" />
//             </button>

//             <div className={styles.modalPhotoSide}>
//               {modalPhotoFailed ? (
//                 <div className={styles.initials} aria-hidden="true">
//                   {initialsOf(selectedMember.name)}
//                 </div>
//               ) : (
//                 <img
//                   src={selectedMember.image}
//                   alt={selectedMember.name}
//                   className={styles.modalPhotoImage}
//                   onError={() => setModalPhotoFailed(true)}
//                 />
//               )}
//             </div>

//             <div className={styles.modalDetailsSide}>
//               <span className={styles.modalEyebrow}>TechVistra &apos;26 Core Committee</span>

//               <div className={styles.modalNameGroup}>
//                 <h2 id={modalTitleId} className={styles.modalName}>
//                   {selectedMember.name}
//                 </h2>
//                 <p className={styles.modalRole}>{selectedMember.title}</p>
//               </div>

//               <div className={styles.modalInfoGrid}>
//                 <div className={styles.infoRow}>
//                   <span className={styles.infoLabel}>Committee</span>
//                   <span className={styles.infoValue}>{selectedMember.committee}</span>
//                 </div>

//                 {selectedMember.department && (
//                   <div className={styles.infoRow}>
//                     <span className={styles.infoLabel}>Department</span>
//                     <span className={styles.infoValue}>{selectedMember.department}</span>
//                   </div>
//                 )}
//               </div>

//               {selectedMember.bio && <p className={styles.modalBio}>{selectedMember.bio}</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


import { useState, useEffect, useRef, useId, useCallback } from "react";
import type { CSSProperties, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import {
  X,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./CoreTeam.module.css";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  image: string;
  roleType: "hod" | "additionalHod" | "faculty";
}

export interface Committee {
  id: string;
  name: string;
  image: string;
}

// ---------------------------------------------------------------------------
// CORE TEAM DATA
// All images live in: public/core/ -> referenced as "/core/<file name>"
// If an image is missing, the card shows initials / a placeholder instead.
// ---------------------------------------------------------------------------

const DEPARTMENT = "Department of Data Science";

/** encodeURI keeps image paths with spaces (e.g. "1 maheswari.jpg") working. */
const coreImg = (file: string) => encodeURI(`/core/${file}`);

const HOD_MEMBER: TeamMember = {
  id: "hod-1",
  name: "Dr. T. KIRUBADEVI",
  title: "Head of the Department (HOD)",
  department: DEPARTMENT,
  image: coreImg("HOD.jpeg"),
  roleType: "hod",
};

const ADDITIONAL_HOD_MEMBER: TeamMember = {
  id: "additional-hod-1",
  name: "Mrs. Maheswari",
  title: "Additional HOD",
  department: DEPARTMENT,
  image: coreImg("1 maheswari.jpeg"),
  roleType: "additionalHod",
};

const FACULTY_MEMBERS: TeamMember[] = [
  ADDITIONAL_HOD_MEMBER,
  {
    id: "faculty-1",
    name: "Mrs. Akhila",
    title: "Faculty Coordinator",
    department: DEPARTMENT,
    image: coreImg("2 akhila.png"),
    roleType: "faculty",
  },
  {
    id: "faculty-2",
    name: "Mrs. Priyanga",
    title: "Faculty Coordinator",
    department: DEPARTMENT,
    image: coreImg("3 Priyanga.png"),
    roleType: "faculty",
  },
  {
    id: "faculty-3",
    name: "Mr. Praveen Kumar",
    title: "Faculty Coordinator",
    department: DEPARTMENT,
    image: coreImg("4 Praveen.jpeg"),
    roleType: "faculty",
  },
];

/** The 8 committees, one 16:9 group photo each */
const COMMITTEES: Committee[] = [
  { id: "website", name: "Website Committee", image: coreImg("website.png") },
  { id: "design", name: "Designing Committee", image: coreImg("design.png") },
  { id: "media", name: "Media Committee", image: coreImg("media.png") },
  { id: "decor", name: "Decoration Committee", image: coreImg("decor.png") },
  { id: "events", name: "Events Coordinators", image: coreImg("events.png") },
  {
    id: "registration",
    name: "Registration & Hospitality Committee",
    image: coreImg("registration.png"),
  },
  { id: "outreach", name: "Outreach Committee", image: coreImg("outreach.png") },
  {
    id: "purchase",
    name: "Purchase & Finance Committee",
    image: coreImg("purchase.png"),
  },
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

/** Fades in once when scrolled into view (and stays). */
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
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
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.isVisible : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Thin gold line + diamond that draws down between two tiers */
function Connector() {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`${styles.connector} ${visible ? styles.connectorOn : ""}`}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Member card (HOD + faculty)
// ---------------------------------------------------------------------------

interface MemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  className?: string;
  index?: number;
}

function MemberCard({ member, onSelect, className = "", index = 0 }: MemberCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [failed, setFailed] = useState(false);

  return (
    <div
      ref={ref}
      className={[
        styles.memberCard,
        styles.reveal,
        visible ? styles.isVisible : "",
        className,
      ].join(" ")}
      style={{ "--delay": `${index * 80}ms` } as CSSProperties}
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

      <div className={styles.cardOverlay}>
        <span className={styles.cardRole}>{member.title}</span>
        <h3 className={styles.cardName}>{member.name}</h3>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Committee card (16:9 group photo)
// ---------------------------------------------------------------------------

interface CommitteeCardProps {
  committee: Committee;
  index: number;
  onOpen: (index: number) => void;
}

function CommitteeCard({ committee, index, onOpen }: CommitteeCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [failed, setFailed] = useState(false);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.isVisible : ""}`}
      style={{ "--delay": `${(index % 2) * 140}ms` } as CSSProperties}
    >
      <button
        type="button"
        className={styles.committeeCard}
        onClick={() => onOpen(index)}
        aria-label={`Open group photo of the ${committee.name}`}
      >
        <span className={styles.committeeFrame}>
          {failed ? (
            <span className={styles.committeePlaceholder}>Photo coming soon</span>
          ) : (
            <img
              src={committee.image}
              alt={`${committee.name} group photo`}
              className={styles.committeeImage}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
          <span className={styles.curtain} aria-hidden="true" />
          <span className={styles.expandIcon} aria-hidden="true">
            <Maximize2 size={16} />
          </span>
        </span>
        <span className={styles.committeeCaption}>
          <span className={styles.committeeRow}>
            <span className={styles.committeeName}>{committee.name}</span>
            <span className={styles.committeeTag} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </span>
          <span className={styles.committeeLine} aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lightbox: large photo, arrows, keyboard, wheel zoom, click anywhere closes
// ---------------------------------------------------------------------------

interface LightboxProps {
  items: Committee[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const current = items[index];
  const imgRef = useRef<HTMLImageElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("50% 50%");
  const [failed, setFailed] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onIndexChange((index + d + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    setZoom(1);
    setOrigin("50% 50%");
    setFailed(false);
  }, [index]);

  // ← → navigate, Esc closes, page scroll locked while open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  // Mouse wheel zooms towards the cursor
  const onWheel = (e: React.WheelEvent) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
    const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
    setOrigin(`${x}% ${y}%`);
    setZoom((z) => Math.min(3.5, Math.max(1, +(z - e.deltaY * 0.002).toFixed(3))));
  };

  // Swipe on touch screens
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 60 && zoom === 1) go(dx < 0 ? 1 : -1);
  };

  const stop = (fn: () => void) => (e: ReactMouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.name} group photo`}
      onClick={onClose} // clicking anywhere (photo, background, caption) closes
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className={`${styles.lightboxArrow} ${styles.arrowPrev}`}
        onClick={stop(() => go(-1))}
        aria-label="Previous photo"
      >
        <ChevronLeft size={28} aria-hidden="true" />
      </button>

      <figure className={styles.lightboxFigure}>
        {failed ? (
          <div className={styles.lightboxMissing}>Photo for {current.name} not found</div>
        ) : (
          <img
            key={current.id}
            ref={imgRef}
            src={current.image}
            alt={`${current.name} group photo`}
            className={`${styles.lightboxImage} ${dir === 1 ? styles.fromRight : styles.fromLeft}`}
            style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}
        <figcaption className={styles.lightboxCaption}>
          <span className={styles.lightboxTitle}>{current.name}</span>
          <span className={styles.lightboxCount}>
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        className={`${styles.lightboxArrow} ${styles.arrowNext}`}
        onClick={stop(() => go(1))}
        aria-label="Next photo"
      >
        <ChevronRight size={28} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.lightboxClose}
        onClick={stop(onClose)}
        aria-label="Close photo"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export default function CoreTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [modalPhotoFailed, setModalPhotoFailed] = useState(false);
  const modalTitleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const selectMember = (member: TeamMember | null) => {
    setModalPhotoFailed(false);
    setSelectedMember(member);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Profile modal: Escape closes, body scroll locked
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

        {/* Head of Department */}
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

        {/* Faculty Coordinators */}
        <div className={styles.tierBlock}>
          <Connector />
          <Reveal className={styles.tierHead}>
            <span className={styles.tierLabel}>
              <Users size={12} aria-hidden="true" /> Faculty Coordinators
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

        {/* Committees: 8 group photos, 16:9 */}
        <div className={styles.tierBlock}>
          <Connector />
          <Reveal className={styles.tierHead}>
            <span className={styles.tierLabel}>
              <Users size={12} aria-hidden="true" /> Our Committees
            </span>
          </Reveal>

          <div className={styles.committeeGrid}>
            {COMMITTEES.map((committee, i) => (
              <CommitteeCard
                key={committee.id}
                committee={committee}
                index={i}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={COMMITTEES}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
        />
      )}

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
                  <span className={styles.infoLabel}>Department</span>
                  <span className={styles.infoValue}>{selectedMember.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}