import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";

import { PORTFOLIO_PROFILE, SIDEBAR_NAVIGATION } from "@/data/portfolio";

export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-primary">
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

          <p className="site-footer-role">{PORTFOLIO_PROFILE.role}</p>
          <p className="site-footer-statement">
            Clear systems. Useful products. Work people can trust.
          </p>
        </div>

        <div className="site-footer-actions">
          <nav aria-label="Footer navigation">
            <ul className="site-footer-navigation">
              {SIDEBAR_NAVIGATION.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="site-footer-top-action" href="#home">
            <span>Back to top</span>
            <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p className="site-footer-copyright">
          © 2026 {PORTFOLIO_PROFILE.name}. All rights reserved.
        </p>
        <p className="site-footer-availability">
          <span aria-hidden="true" />
          {PORTFOLIO_PROFILE.availabilityLabel}
        </p>
        <p>Designed and engineered as an evolving, evidence-first portfolio.</p>
      </div>
    </footer>
  );
}
