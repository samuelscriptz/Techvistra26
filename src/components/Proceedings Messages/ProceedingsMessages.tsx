import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./ProceedingsMessages.module.css";

type ProceedingsMessage = {
  id: string;
  role: string;
  name: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
};

const messages: ProceedingsMessage[] = [
  {
    id: "president",
    role: "President",
    name: "President Name",
    image: "/proceedings-messages/president.svg",
    excerpt:
      "It gives me great pleasure to welcome you to Techvistra '26, a celebration of curiosity, creativity, and emerging technology.",
    paragraphs: [
      "It gives me great pleasure to welcome you to Techvistra '26, the National-Level Technical Symposium hosted by the Department of Data Science. This gathering is a celebration of curiosity, creativity, and the ideas shaping our future.",
      "I commend the faculty members and students for creating a platform where knowledge can be shared, new perspectives explored, and meaningful connections formed. May every participant find inspiration in the exchange of ideas and carry that enthusiasm into their future work.",
      "My best wishes to the organizing team and all participants for a memorable and successful symposium.",
    ],
  },
  {
    id: "vice-chancellor",
    role: "Vice-Chancellor",
    name: "Vice-Chancellor Name",
    image: "/proceedings-messages/vice-chancellor.svg",
    excerpt:
      "Techvistra '26 brings learners and innovators together to explore the possibilities of data, intelligence, and technology.",
    paragraphs: [
      "I am delighted that the Department of Data Science is bringing together students, academics, and industry voices through Techvistra '26.",
      "In a rapidly changing world, the ability to ask thoughtful questions, work collaboratively, and use technology responsibly is more important than ever. I hope the symposium's sessions and activities encourage participants to experiment, exchange perspectives, and turn promising ideas into practical solutions.",
      "I wish the organizers and participants every success and hope this event proves both enriching and inspiring.",
    ],
  },
  {
    id: "conference-chair",
    role: "Conference Chair",
    name: "Conference Chair Name",
    image: "/proceedings-messages/conference-chair.svg",
    excerpt:
      "This symposium is an invitation to learn from one another, share bold ideas, and build a stronger community of innovators.",
    paragraphs: [
      "Welcome to Techvistra '26. We have designed this symposium as an opportunity for learners and practitioners to come together, share their work, and discover fresh ways to approach the challenges around us.",
      "The program reflects the energy and imagination of our community. I encourage every participant to take part wholeheartedly, ask questions, connect with fellow attendees, and make the most of each opportunity to learn.",
      "Thank you to everyone who has contributed to the event. I look forward to an engaging and rewarding symposium.",
    ],
  },
  {
    id: "department-head",
    role: "Head of Department, Data Science",
    name: "Head of Department Name",
    image: "/proceedings-messages/department-head.svg",
    excerpt:
      "Our students and faculty are proud to welcome you to a forum for discovery, collaboration, and thoughtful innovation.",
    paragraphs: [
      "On behalf of the Department of Data Science, I warmly welcome you to Techvistra '26. Our students and faculty are proud to host a forum dedicated to discovery, collaboration, and thoughtful innovation.",
      "We hope the symposium gives every attendee a chance to learn beyond the classroom, share experiences, and appreciate the many ways data science and emerging technologies can contribute to society.",
      "I extend my sincere thanks to the organizing team, our guests, and all participants. May the conversations begun here continue well beyond the event.",
    ],
  },
];

export default function ProceedingsMessages() {
  const [activeMessage, setActiveMessage] =
    useState<ProceedingsMessage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeMessage && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [activeMessage]);

  return (
    <section
      className={styles.section}
      id="proceedings"
      aria-labelledby="proceedings-title"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A warm welcome to Techvistra '26</p>
        <SectionTitle
          id="proceedings-title"
          title="Proceedings Messages"
          className={styles.heading}
        />
        <p className={styles.intro}>
          Read messages from the leaders and organizers welcoming you to our
          symposium.
        </p>

        <div className={styles.grid}>
          {messages.map((message) => (
            <article className={styles.card} key={message.id}>
              <button
                className={styles.cardTrigger}
                type="button"
                onClick={() => setActiveMessage(message)}
                aria-haspopup="dialog"
                aria-label={`Read message from ${message.name}, ${message.role}`}
              >
                <span className={styles.srOnly}>
                  Read message from {message.name}, {message.role}
                </span>
              </button>
              <img
                className={styles.portrait}
                src={message.image}
                alt=""
                width="96"
                height="112"
              />
              <div className={styles.cardContent}>
                <span className={styles.messageLabel}>A message from</span>
                <h3 className={styles.role}>{message.role}</h3>
                <h4 className={styles.name}>{message.name}</h4>
                <p className={styles.excerpt}>{message.excerpt}</p>
                <span className={styles.readButton}>
                  Read message <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="proceedings-message-title"
        onClose={() => setActiveMessage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        {activeMessage && (
          <div className={styles.dialogContent}>
            <button
              className={styles.closeButton}
              type="button"
              aria-label="Close message"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <p className={styles.dialogEyebrow}>Proceedings message</p>
            <div className={styles.dialogPerson}>
              <img
                className={styles.dialogPortrait}
                src={activeMessage.image}
                alt={`${activeMessage.name}, ${activeMessage.role}`}
                width="96"
                height="112"
              />
              <div>
                <h2 id="proceedings-message-title" className={styles.dialogTitle}>
                  {activeMessage.name}
                </h2>
                <p className={styles.dialogName}>{activeMessage.role}</p>
              </div>
            </div>
            <div className={styles.messageBody}>
              {activeMessage.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className={styles.signature}>Techvistra '26</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
