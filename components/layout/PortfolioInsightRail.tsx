import { PORTFOLIO_STATS } from "@/data/portfolio";

export function PortfolioInsightRail() {
  return (
    <aside className="right-rail" aria-label="Career summary">
      {PORTFOLIO_STATS.map((stat, index) => (
        <div className="rail-card" key={stat.label}>
          {index === 0 && <p className="rail-label">AT A GLANCE</p>}
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </aside>
  );
}
