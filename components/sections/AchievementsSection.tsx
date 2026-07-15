import Image from "next/image";
import {
  FiArrowUpRight,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFileText,
  FiShield,
} from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  ACHIEVEMENT_CREDENTIALS,
  ACHIEVEMENTS_SECTION,
} from "@/data/portfolio";
import type { AchievementCredential } from "@/types/portfolio";

import styles from "./AchievementsSection.module.css";

type CredentialCardProps = Readonly<{
  credential: AchievementCredential;
  featured?: boolean;
}>;

function CredentialCard({ credential, featured = false }: CredentialCardProps) {
  const titleId = `credential-${credential.id}-title`;

  return (
    <article
      className={styles.credentialCard}
      data-featured={featured ? "true" : "false"}
      aria-labelledby={titleId}
    >
      <div className={styles.certificateVisual}>
        <div className={styles.previewToolbar} aria-hidden="true">
          <span className={styles.previewDots}>
            <i />
            <i />
            <i />
          </span>
          <span>Certificate preview</span>
          <FiFileText />
        </div>

        <a
          className={styles.previewLink}
          href={credential.certificateHref}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`View ${credential.title} certificate PDF in a new tab`}
        >
          <Image
            className={styles.certificateImage}
            src={credential.previewSrc}
            alt={credential.previewAlt}
            fill
            sizes={
              featured
                ? "(max-width: 760px) 88vw, (max-width: 1200px) 72vw, 44vw"
                : "(max-width: 760px) 88vw, (max-width: 1200px) 72vw, 31vw"
            }
          />
          <span className={styles.previewAction}>
            View full certificate
            <FiArrowUpRight aria-hidden="true" />
          </span>
        </a>
      </div>

      <div className={styles.credentialContent}>
        <div className={styles.credentialKicker}>
          <span>{credential.index}</span>
          <p>{credential.track}</p>
        </div>

        <div className={styles.credentialHeading}>
          <span className={styles.awardIcon} aria-hidden="true">
            <FiAward />
          </span>
          <div>
            <h3 id={titleId}>{credential.title}</h3>
            <p>{credential.issuer}</p>
            {credential.provider ? <small>{credential.provider}</small> : null}
          </div>
        </div>

        <p className={styles.credentialDescription}>{credential.description}</p>

        <dl className={styles.credentialFacts}>
          {credential.duration ? (
            <div>
              <dt>
                <FiClock aria-hidden="true" /> Duration
              </dt>
              <dd>{credential.duration}</dd>
            </div>
          ) : null}
          {credential.period ? (
            <div>
              <dt>Training period</dt>
              <dd>{credential.period}</dd>
            </div>
          ) : null}
          {credential.issued ? (
            <div>
              <dt>Issued</dt>
              <dd>{credential.issued}</dd>
            </div>
          ) : null}
          {credential.credentialId ? (
            <div className={styles.credentialId}>
              <dt>Credential ID</dt>
              <dd>{credential.credentialId}</dd>
            </div>
          ) : null}
        </dl>

        <ul className={styles.highlights} aria-label="Learning highlights">
          {credential.highlights.map((highlight) => (
            <li key={highlight}>
              <FiCheckCircle aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className={styles.credentialActions}>
          <a
            className={styles.primaryAction}
            href={credential.certificateHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            View certificate
            <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            className={styles.secondaryAction}
            href={credential.certificateHref}
            download
          >
            <FiDownload aria-hidden="true" />
            PDF
          </a>
          {credential.validationHref ? (
            <a
              className={styles.validationAction}
              href={credential.validationHref}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FiShield aria-hidden="true" />
              {credential.validationLabel}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function AchievementsSection() {
  const [featuredCredential, ...supportingCredentials] =
    ACHIEVEMENT_CREDENTIALS;

  return (
    <section
      className={`portfolio-section ${styles.section}`}
      id="achievements"
      aria-labelledby="achievements-title"
    >
      <div className={styles.sectionIntroduction}>
        <SectionHeading
          eyebrow={ACHIEVEMENTS_SECTION.eyebrow}
          title={ACHIEVEMENTS_SECTION.title}
          description={ACHIEVEMENTS_SECTION.description}
          titleId="achievements-title"
        />

        <div className={styles.credentialSummary} aria-label="Credential summary">
          <div>
            <FiAward aria-hidden="true" />
            <span>
              <strong>03</strong>
              <small>Completion certificates</small>
            </span>
          </div>
          <div>
            <FiClock aria-hidden="true" />
            <span>
              <strong>80</strong>
              <small>Instructor-led hours</small>
            </span>
          </div>
          <div>
            <FiShield aria-hidden="true" />
            <span>
              <strong>03</strong>
              <small>Learning tracks</small>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.credentials}>
        <CredentialCard credential={featuredCredential} featured />

        <div className={styles.supportingGrid}>
          {supportingCredentials.map((credential) => (
            <CredentialCard key={credential.id} credential={credential} />
          ))}
        </div>
      </div>
    </section>
  );
}
