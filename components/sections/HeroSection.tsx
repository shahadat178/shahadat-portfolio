import { FaBrain, FaNodeJs, FaReact } from "react-icons/fa6";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import InteractiveBangladeshGlobe from "@/components/InteractiveBangladeshGlobe";

export function HeroSection() {
  return (
    <section className="hero-placeholder" id="home">
      <div className="hero-copy">
        <p className="eyebrow">FULL-STACK &amp; CLOUD SOFTWARE ENGINEER</p>

        <h1>
          I build digital
          <span> experiences that feel effortless.</span>
        </h1>

        <p className="hero-text">
          I design and build reliable web products that turn complex workflows
          into clear, fast, and delightful experiences.
        </p>

        <div className="hero-actions">
          <a className="hero-primary-action" href="#work">
            Explore my work
            <FiArrowRight aria-hidden="true" />
          </a>

          <a className="hero-secondary-action" href="#contact">
            Let&apos;s connect
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="hero-stack" aria-label="Core technology stack">
          <span>Next.js</span>
          <span>React</span>
          <span>Node.js</span>
          <span>AWS</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="orb-glow" />

        <div className="workflow-scene">
          <span className="workflow-line workflow-line-1" />
          <span className="workflow-line workflow-line-2" />
          <span className="workflow-line workflow-line-3" />
          <span className="workflow-line workflow-line-4" />
          <span className="workflow-line workflow-line-5" />

          <InteractiveBangladeshGlobe />

          <div className="workflow-node workflow-node-top-left">
            <div className="workflow-node-icon workflow-node-icon-product">
              ✦
            </div>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Product Thinking</p>
              <p className="workflow-node-text">Problem → UX → solution</p>
            </div>
          </div>

          <div className="workflow-node workflow-node-top-right">
            <div className="workflow-node-icon workflow-node-icon-react">
              <FaReact aria-hidden="true" />
            </div>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Frontend Craft</p>
              <p className="workflow-node-text">
                React • Next.js • UI systems
              </p>
            </div>
          </div>

          <div className="workflow-node workflow-node-right">
            <div className="workflow-node-icon workflow-node-icon-node">
              <FaNodeJs aria-hidden="true" />
            </div>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Backend &amp; Cloud</p>
              <p className="workflow-node-text">
                APIs • deployment • scalability
              </p>
            </div>
          </div>

          <div className="workflow-node workflow-node-bottom-right">
            <div className="workflow-node-icon workflow-node-icon-quality">
              ✓
            </div>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Quality &amp; Iteration</p>
              <p className="workflow-node-text">Test • refine • improve</p>
            </div>
          </div>

          <div className="workflow-node workflow-node-bottom-left">
            <div className="workflow-node-icon workflow-node-icon-systems">
              <FaBrain aria-hidden="true" />
            </div>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Systems Mindset</p>
              <p className="workflow-node-text">Reliable • clear • connected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
