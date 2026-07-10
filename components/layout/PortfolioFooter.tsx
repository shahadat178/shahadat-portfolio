import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";

import { PORTFOLIO_PROFILE, SIDEBAR_NAVIGATION } from "@/data/portfolio";

export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-identity">
        <a
          className="site-footer-logo"
          href="#home"
          aria-label="Shahadat Sardar — back to the top"
        >
          <Image
            className="site-footer-logo-image site-footer-logo-light"
            src="/brand/shahadat-logo-dark.png"
            alt="Shahadat Sardar logo"
            width={180}
            height={70}
          />
          <Image
            className="site-footer-logo-image site-footer-logo-dark"
            src="/brand/shahadat-logo-white.png"
            alt=""
            aria-hidden="true"
            width={180}
            height={70}
          />
        </a>
        <p className="site-footer-copyright">
          © 2026 {PORTFOLIO_PROFILE.name}. All rights reserved.
        </p>
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
