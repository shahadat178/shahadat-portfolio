import { PORTFOLIO_STATS } from "@/data/portfolio";

import styles from "./PortfolioStatsStrip.module.css";

export function PortfolioStatsStrip() {
  return (
    <section className={styles.root} aria-labelledby="portfolio-stats-title">
      <div className={styles.heading}>
        <p>AT A GLANCE</p>
        <h2 id="portfolio-stats-title">Focused on useful outcomes</h2>
      </div>

      <div className={styles.grid}>
        {PORTFOLIO_STATS.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
