



import Image from "next/image";

export default function Home() {
  return (
    <main className="portfolio-shell">
      <aside className="left-rail">
        <div className="brand-card">
          <div className="brand-logo">
            <Image
              src="/brand/shahadat-logo-dark.png"
              alt="Shahadat Sardar Logo"
              width={180}
              height={70}
              priority
            />
          </div>
          <h2>Shahadat Sardar</h2>
          <p>Full-Stack & Cloud Software Engineer</p>
        </div>

        <nav className="side-nav">
          <a className="nav-item active" href="#home">
            Home
          </a>
          <a className="nav-item" href="#work">
            Work
          </a>
          <a className="nav-item" href="#story">
            Story
          </a>
          <a className="nav-item" href="#experience">
            Experience
          </a>
          <a className="nav-item" href="#toolkit">
            Toolkit
          </a>
          <a className="nav-item" href="#contact">
            Contact
          </a>
        </nav>

        <div className="availability-card">
          <span className="status-dot" />
          <p>Available for new opportunities</p>
        </div>
      </aside>

      <section className="main-content">
        <header className="top-dock">
          <span>Work</span>
          <span>Story</span>
          <span>Experience</span>
          <span>Toolkit</span>
          <span>Contact</span>
        </header>

        <section className="hero-placeholder" id="home">
          <p className="eyebrow">FULL-STACK & CLOUD-FOCUSED SOFTWARE ENGINEER</p>
          <h1>
            Hi, I’m <br />
            <span>Shahadat Sardar</span>
          </h1>
          <p className="hero-text">
            I build reliable web products that turn complex workflows into
            simple, delightful experiences.
          </p>
        </section>
      </section>

      <aside className="right-rail">
        <div className="rail-card">
          <p className="rail-label">AT A GLANCE</p>
          <strong>3+</strong>
          <span>Major Projects</span>
        </div>

        <div className="rail-card">
          <strong>1+</strong>
          <span>Years Experience</span>
        </div>

        <div className="rail-card">
          <strong>100%</strong>
          <span>Dedication</span>
        </div>
      </aside>
    </main>
  );
}