type SectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
}>;

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: SectionHeadingProps) {
  return (
    <header className="portfolio-section-heading">
      <p className="portfolio-section-eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p className="portfolio-section-description">{description}</p>
    </header>
  );
}
