import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./ProceedingsMessages.module.css";

type ProceedingsMessage = {
  id: string;
  order: number;
  role: string;
  name: string;
  people?: string[];
  image?: string;
  images?: string[];
  excerpt: string;
  paragraphs: string[];
};

const messages: ProceedingsMessage[] = [
  {
    id: "advisor",
    order: 6,
    role: "Advisor",
    name: "Prof.K.M.Mehata",
    image: "/proceedings-messages/advisor.jpg",
    excerpt:
      "It gives me immense pleasure to extend my warm greetings on the occasion of Techvistra Q-Vortex, the 2nd National Level Technical Symposium organized by the Department of Data Science.",
    paragraphs: [
      "It gives me immense pleasure to extend my warm greetings on the occasion of Techvistra Q-Vortex, the 2nd National Level Technical Symposium organized by the Department of Data Science at Dr. M.G.R. Educational and Research Institute.",
      "The symposium highlights the growing importance of innovation, research, and interdisciplinary learning in the rapidly evolving fields of Data Science, Artificial Intelligence, and emerging technologies. Its focus on Quantum Technologies, Visualization, Optimization, Research, Technology, and Exploration reflects a spirit of curiosity and intellectual excellence.",
      "I am confident that Techvistra Q-Vortex will provide a valuable platform for academicians, researchers, industry experts, and students to exchange ideas, share knowledge, and encourage collaboration that contributes meaningfully to scientific and technological advancement.",
      "I sincerely appreciate the dedicated efforts of the organizing committee, faculty members, scholars, and students in making this event possible. I extend my best wishes to all participants and hope that Techvistra Q-Vortex will be a memorable and enriching academic experience for everyone.",
    ],
  },
  {
    id: "president",
    order: 1,
    role: "President",
    name: "Er. A.C.S. Arun Kumar",
    image: "/proceedings-messages/president.jpg",
    excerpt:
      "The work of the Department of Data Science, its staff, and students continues to create opportunities for events, workshops, and symposiums such as Techvistra Q-Vortex.",
    paragraphs: [
      "The work of the Department of Data Science, its staff members, and students enables it to bring people together through events, workshops, and symposiums.",
      "I am pleased to support Techvistra Q-Vortex, the 2nd National Level Technical Symposium, and congratulate the Department of Data Science on bringing together students and the wider technical community to explore new ideas in technology and research.",
      "An initiative of this kind can encourage innovative solutions for the digital age. I congratulate everyone involved and wish the symposium every success in achieving its goals.",
    ],
  },
  {
    id: "vice-chancellor",
    order: 2,
    role: "Vice-Chancellor",
    name: "Dr.S.Geethalakshmi",
    image: "/proceedings-messages/vice-chancellor.jpg",
    excerpt:
      "I appreciate that the Department of Data Science is organizing Techvistra Q-Vortex on November 16 and 17, 2026.",
    paragraphs: [
      "I appreciate that the Department of Data Science is organizing Techvistra Q-Vortex, the 2nd National Level Technical Symposium, on November 16 and 17, 2026.",
      "A symposium like this provides a platform for presenting, discussing, and exchanging ideas in an intellectually stimulating and open environment, while giving participants the opportunity to learn from one another and from experts.",
      "The symposium's focus on Quantum Technologies, Visualization, Optimization, Research, Technology, and Exploration speaks to the important role these fields play in a changing digital world. I am confident that Techvistra Q-Vortex will bring together researchers, academicians, students, and industry experts to share ideas and consider the possibilities of emerging technologies.",
      "I congratulate the organizing team of the Department of Data Science and wish the symposium a grand success.",
    ],
  },
  {
    id: "pro-vice-chancellor",
    order: 3,
    role: "Pro Vice-Chancellor",
    name: "Dr. M.Ravichandran",
    image: "/proceedings-messages/pro-vice-chancellor.jpg",
    excerpt:
      "It gives me great pleasure to offer my support and best wishes to Techvistra Q-Vortex, organized by our Institute’s Department of Data Science.",
    paragraphs: [
      "It gives me great pleasure to offer my sincere support and best wishes to Techvistra Q-Vortex, the 2nd National Level Technical Symposium organized by our Institute’s Department of Data Science. I commend the organizing team, headed by Dr. T. Kirupadevi, for creating an opportunity to engage with emerging themes in Data Science and technology.",
      "A symposium is a place to inspire and be inspired, to build connections, and to shape a shared vision. In the tradition of open academic exchange, I thank every participant, presenter, session chair, discussant, and audience member for contributing their time and ideas.",
      "I conclude with the words of the Bhagavad Gita: “The more extensive a man’s knowledge of what has been done, the greater will be his power.” I am confident that Techvistra Q-Vortex will further this spirit of learning. I wish the organizers and their dynamic team a fruitful and rewarding symposium.",
    ],
  },
  {
    id: "registrar",
    order: 4,
    role: "Registrar",
    name: "Dr C.B. Palanivelu",
    image: "/proceedings-messages/registrar.jpg",
    excerpt:
      "I am delighted that the Department of Data Science is bringing together students, faculty, and research scholars at Techvistra Q-Vortex.",
    paragraphs: [
      "I am delighted that the Department of Data Science is bringing together students, faculty, and research scholars from our Institution and beyond through Techvistra Q-Vortex, the 2nd National Level Technical Symposium.",
      "I am sure the symposium will encourage new ideas and thoughtful exploration across the broad and rapidly advancing fields of technology and Data Science.",
      "I congratulate the Department of Data Science for its efforts and team spirit in undertaking this venture, and I wish the symposium every success.",
    ],
  },
  {
    id: "rector",
    order: 5,
    role: "Rector",
    name: "Dr.D.Viswanathan",
    image: "/proceedings-messages/rector.png",
    excerpt:
      "Welcome to Techvistra Q-Vortex. I am delighted to invite you to our Institution for the 2nd National Level Technical Symposium.",
    paragraphs: [
      "Welcome to Techvistra Q-Vortex.",
      "I am delighted to invite you to our Institution for this 2nd National Level Technical Symposium, an opportunity to share expertise, exchange ideas, and learn from one another.",
      "In today’s fast-changing world, there is a constant demand for new technologies and innovations in every sphere of industry. The nation can progress if scientists and technocrats utilize their knowledge to explore newer fields of research and development. New developments emerge every day and every moment. Technology keeps changing, and new areas of research are continually coming up.",
      "The significance of a symposium like Techvistra Q-Vortex lies in exploring ideas that can help advance many fields. Such gatherings bring fresh perspectives to technology and research, and this symposium is a welcome step in that direction.",
      "I wholeheartedly appreciate the team behind Techvistra Q-Vortex for its sincere efforts and wish the symposium a grand success. Best wishes.",
    ],
  },
  {
    id: "dean-et",
    order: 7,
    role: "DEAN – E & T",
    name: "Dr.N.Ethiraj",
    image: "/proceedings-messages/dean-et.jpg",
    excerpt:
      "As data-driven technologies advance, extracting insight from large datasets while protecting digital privacy remains an important responsibility.",
    paragraphs: [
      "Methods, processes, algorithms, and systems for extracting knowledge from data are advancing rapidly. At the same time, processing large and varied datasets while protecting digital privacy remains an important responsibility for everyone working with technology.",
      "Edge computing brings processing closer to where data is generated, enabling greater speed and capacity and supporting more timely, useful results.",
      "The enthusiasm of students who approach these important challenges with integrity gives me great confidence in the future. I convey my best wishes to all the team members and to Dr. T. Kirubadevi, HOD of Data Science, for the success of Techvistra Q-Vortex.",
    ],
  },
  {
    id: "conference-chair",
    order: 8,
    role: "DEAN - CSE",
    name: "Dr. S. Geetha M.E., Ph. D",
    image: "/proceedings-messages/dean-cse.jpg",
    excerpt:
      "Techvistra Q-Vortex brings together young minds, diverse ideas, creativity, and hard work around the possibilities of technology.",
    paragraphs: [
      "Numerous young minds, diverse ideas, different approaches, and plentiful hard work come together at Techvistra Q-Vortex, the 2nd National Level Technical Symposium. The response and enthusiasm of students reflect the possibilities that continued technological advancement can bring.",
      "Organizations look forward to welcoming emerging engineers and innovators who are ready to explore new ideas. The Department of Data Science is creating a valuable opportunity for students to learn, participate, and contribute through this symposium.",
      "I extend my regards to all participating teams and heartfelt congratulations to the organizing committee, faculty, and students who have worked to make Techvistra Q-Vortex possible.",
    ],
  },
  {
    id: "department-head",
    order: 9,
    role: "HOD - DATA SCIENCE",
    name: "Dr.T.Kirubadevi M.TECH , Ph.D",
    image: "/core/HOD.jpeg",
    excerpt:
      "It is my immense pleasure to welcome all participants, researchers, academicians, industry experts, and students to Techvistra Q-Vortex.",
    paragraphs: [
      "It is my immense pleasure to extend a warm welcome to all participants, researchers, academicians, industry experts, and students to Techvistra Q-Vortex, the 2nd National Level Technical Symposium organized by the Department of Data Science. This symposium is a platform for intellectual exchange, innovative thinking, and collaborative learning across the rapidly evolving fields of science, technology, and interdisciplinary research.",
      "The primary objective of Techvistra Q-Vortex is to encourage the sharing of new ideas and engagement with emerging technologies in ways that contribute to academic excellence and societal development. The participation of students and professionals from different institutions reflects the growing enthusiasm for research and innovation in the academic community.",
      "I sincerely appreciate the dedicated efforts of the organizing committee, faculty members, student volunteers, and contributors whose commitment and hard work have made this symposium possible. I extend my gratitude to all participants for sharing their knowledge and enriching the event. I wish Techvistra Q-Vortex a grand success and hope every participant gains valuable insights and memorable experiences.",
    ],
  },
  {
    id: "conference-committee",
    order: 10,
    role: "Conference Committee",
    name: "Mr.S.Praveen Kumar, Mrs.M.Priyanga, and Mrs.PC.Akhila",
    people: ["Mr.S.Praveen Kumar", "Mrs.M.Priyanga", "Mrs.PC.Akhila"],
    images: [
      "/core/4 Praveen.jpeg",
      "/core/3 Priyanga.png",
      "/core/2 akhila.png",
    ],
    excerpt:
      "Welcome all! We are proud to present Techvistra Q-Vortex, the 2nd National Level Technical Symposium organized by the Department of Data Science.",
    paragraphs: [
      "Welcome All!",
      "The Department of Data Science is proud to organize Techvistra Q-Vortex, the 2nd National Level Technical Symposium. Its theme brings together Quantum Technologies, Visualization, Optimization, Research, Technology, and Exploration.",
      "The symposium offers students, specialists, and researchers an opportunity to share ideas and recent work in technical and computational fields. It is a chance to connect with like-minded people, broaden our understanding, and explore practical approaches to technology and research.",
      "We are grateful to the academicians and industry experts whose guidance and participation enrich the symposium.",
      "The Organizing Committee thanks all participants, presenters, faculty members, volunteers, and contributors for sharing their ideas and helping create a thoughtful and engaging program.",
      "We thank the University Management for its support in making this event possible. We hope Techvistra Q-Vortex will be a valuable and inspiring experience for the entire research and student community.",
    ],
  },
];

const orderedMessages = [...messages].sort((left, right) => left.order - right.order);

export default function ProceedingsMessages() {
  const [activeMessage, setActiveMessage] =
    useState<ProceedingsMessage | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const itemsPerPage = 4;
  const slides = Array.from(
    { length: Math.ceil(orderedMessages.length / itemsPerPage) },
    (_, index) =>
      orderedMessages.slice(
        index * itemsPerPage,
        index * itemsPerPage + itemsPerPage,
      ),
  );
  const totalPages = slides.length;
  const isPaused = isHovered || isFocused || activeMessage !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeMessage && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [activeMessage]);

  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;

    const timeoutId = window.setTimeout(() => {
      setActivePage((currentPage) => (currentPage + 1) % totalPages);
    }, 8000);

    return () => window.clearTimeout(timeoutId);
  }, [activePage, isPaused, totalPages]);

  const goToPreviousPage = () => {
    setActivePage((currentPage) =>
      currentPage === 0 ? totalPages - 1 : currentPage - 1,
    );
  };

  const goToNextPage = () => {
    setActivePage((currentPage) => (currentPage + 1) % totalPages);
  };

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
          title="Distinguished Wishes"
          className={styles.heading}
        />
        <p className={styles.intro}>
          Read heartfelt messages from our distinguished leaders and organizers as they welcome you to the symposium.
        </p>

        <div
          className={styles.carouselArea}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setIsFocused(false);
            }
          }}
        >
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{
              width: `${totalPages * 100}%`,
              transform: `translateX(-${(activePage * 100) / totalPages}%)`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                className={styles.carouselSlide}
                key={`slide-${slideIndex}`}
                style={{ flex: `0 0 ${100 / totalPages}%` }}
              >
                <div className={styles.grid}>
                  {slide.map((message) => (
                    <article
                      className={`${styles.card} ${
                        message.id === "department-head" ||
                        message.id === "conference-committee"
                          ? styles.tallCard
                          : ""
                      } ${
                        message.id === "conference-committee"
                          ? styles.committeeCard
                          : ""
                      }`}
                      key={message.id}
                    >
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

                      {message.images ? (
                        <div
                          className={`${styles.portraitGroup} ${
                            message.id === "conference-committee"
                              ? styles.conferencePortraitGroup
                              : ""
                          }`}
                        >
                          {message.images.map((image, index) => (
                            <img
                              key={`${message.id}-${index}`}
                              className={
                                index === 0
                                  ? styles.portraitPrimary
                                  : index === 1
                                    ? styles.portraitSecondary
                                    : styles.portraitTertiary
                              }
                              src={image}
                              alt=""
                              width="96"
                              height="112"
                            />
                          ))}
                        </div>
                      ) : message.image ? (
                        <img
                          className={styles.portrait}
                          src={message.image}
                          alt=""
                          width="96"
                          height="112"
                        />
                      ) : (
                        <div
                          className={styles.portrait}
                          role="img"
                          aria-label="Portrait not provided"
                        >
                          Portrait not provided
                        </div>
                      )}

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
            ))}
          </div>
        </div>

        <div className={styles.carouselControls} aria-label="Proceedings messages navigation">
          <button
            type="button"
            className={styles.navButton}
            onClick={goToPreviousPage}
            aria-label="Previous messages"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className={styles.pageDots} aria-label="Page indicators">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`page-${index}`}
                type="button"
                className={
                  index === activePage ? styles.pageDotActive : styles.pageDot
                }
                onClick={() => setActivePage(index)}
                aria-label={`Go to message group ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={goToNextPage}
            aria-label="Next messages"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
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
            <div
              className={`${styles.dialogPerson} ${
                activeMessage.people ? styles.committeeDialogPerson : ""
              }`}
            >
              {activeMessage.images ? (
                <div className={styles.dialogPortraitGroup}>
                  {activeMessage.images.map((image, index) => (
                    <img
                      key={`${activeMessage.id}-dialog-${index}`}
                      className={
                        index === 0
                          ? styles.dialogPortraitPrimary
                          : index === 1
                            ? styles.dialogPortraitSecondary
                            : styles.dialogPortraitTertiary
                      }
                      src={image}
                      alt={`${activeMessage.name}, member ${index + 1}`}
                      width="96"
                      height="112"
                    />
                  ))}
                </div>
              ) : activeMessage.image ? (
                <img
                  className={styles.dialogPortrait}
                  src={activeMessage.image}
                  alt={`${activeMessage.name}, ${activeMessage.role}`}
                  width="96"
                  height="112"
                />
              ) : (
                <div
                  className={styles.dialogPortrait}
                  role="img"
                  aria-label="Portrait not provided"
                >
                  Portrait not provided
                </div>
              )}
              <div className={styles.dialogDetails}>
                {activeMessage.people ? (
                  <ul
                    id="proceedings-message-title"
                    className={styles.dialogMemberList}
                  >
                    {activeMessage.people.map((person) => (
                      <li key={person}>{person}</li>
                    ))}
                  </ul>
                ) : (
                  <h2 id="proceedings-message-title" className={styles.dialogTitle}>
                    {activeMessage.name}
                  </h2>
                )}
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