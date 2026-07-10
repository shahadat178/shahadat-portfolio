import { FiArrowUp } from "react-icons/fi";

import { PORTFOLIO_PROFILE, SIDEBAR_NAVIGATION } from "@/data/portfolio";

export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-identity">
        <p>{PORTFOLIO_PROFILE.name}</p>
        <span>{PORTFOLIO_PROFILE.role}</span>
      </div>

      <nav aria-label="Footer navigation">
        <ul className="site-footer-navigation">
          {SIDEBAR_NAVIGATION.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="site-footer-meta">
        <p>Designed and engineered as an evolving, evidence-first portfolio.</p>
        <a href="#home">
          Back to top
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
