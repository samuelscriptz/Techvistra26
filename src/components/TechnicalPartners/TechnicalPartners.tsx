import styles from "./TechnicalPartners.module.css";

const PARTNERS = [
  { name: "Armoured Vehicles Nigam Limited", image: "/avnl_logo.png" },
  { name: "AWS", image: "/aws_logo.png" },
  { name: "Cisco", image: "/cisco_logo.png" },
  { name: "Red Hat", image: "/redhat_logo.png" },
  { name: "National Digital Library of India", image: "/NDLI_Logo_Aligned.png" },
  { name: "Oracle", image: "/oracle_logo.png" },
  { name: "IBM", image: "/ibm_logo.png" },
];

export default function TechnicalPartners() {
  return (
    <section
      id="technical-partners"
      className={styles.section}
      aria-labelledby="technical-partners-title"
    >
      <div className={styles.inner}>
        
        <h2 id="technical-partners-title" className={styles.title}>
          Technical Partners
        </h2>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          Working together to make innovation happen.
        </p>
      </div>

      <div className={styles.marquee} aria-label="Technical partners">
        <div className={styles.track}>
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              className={styles.partnerGroup}
              aria-hidden={copy !== 0}
            >
              {PARTNERS.map((partner) => (
                <div className={styles.partnerCard} key={partner.name}>
                  <div className={styles.logoViewport}>
                    <img
                      className={styles.partnerLogo}
                      data-partner={partner.name}
                      src={partner.image}
                      alt={copy === 0 ? partner.name : ""}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.partnerName} aria-hidden="true">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
