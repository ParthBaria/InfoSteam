import "./Detail.css";
function Detail() {
  return (
    <main className="about-page" aria-labelledby="about-heading">
      <header className="about-hero">
        <div className="about-hero-inner">
          <h1 id="about-heading" className="about-hero-title">
            About InfoStream
          </h1>
          <p className="about-hero-tagline">Real-time. Reliable. Relevant.</p>
        </div>
        <div className="about-hero-wave" aria-hidden="true" />
      </header>

      <section className="about-section about-intro">
        <p>
          Welcome to <strong>InfoStream</strong> – your intelligent news
          companion. We aggregate, analyze, and deliver the stories that matter
          to <em>you</em>, from trusted global and local sources. Whether you
          follow cybersecurity, world events, tech launches, or market trends,
          InfoStream keeps your feed clean, current, and personalized.
        </p>
      </section>

      <section className="about-section about-vision">
        <h2>Our Vision</h2>
        <p>
          Make high-quality information accessible to everyone, anywhere, in
          real time.
        </p>
        <h2>Our Mission</h2>
        <p>
          Combine verified feeds, smart filtering, and user-driven curation so
          you spend less time sorting noise and more time staying informed.
        </p>
      </section>

      <section className="about-section about-highlights">
        <h2>Why Choose InfoStream?</h2>
        <div className="about-card-grid">
          <article className="about-card">
            <h3>Personalized Stream</h3>
            <p>
              Follow topics, sources, and keywords. Your feed adapts as your
              interests evolve.
            </p>
          </article>
          <article className="about-card">
            <h3>Trusted Sources</h3>
            <p>
              Content is pulled from vetted publications, APIs, and rated
              community submissions.
            </p>
          </article>
          <article className="about-card">
            <h3>Save & Sync Favourites</h3>
            <p>
              Bookmark stories across devices. Come back any time—even offline
              (PWA ready).
            </p>
          </article>
          <article className="about-card">
            <h3>Topic Alerts</h3>
            <p>
              Get notified when breaking news hits a category you care about.
            </p>
          </article>
        </div>
      </section>

      <section
        className="about-section about-stats"
        aria-label="InfoStream quick stats"
      >
        <ul className="about-stats-list">
          <li>
            <span className="about-stat-number" data-target="120+">
              120+
            </span>
            <span className="about-stat-label">Sources</span>
          </li>
          <li>
            <span className="about-stat-number" data-target="1.5M">
              1.5M
            </span>
            <span className="about-stat-label">Articles Indexed</span>
          </li>
          <li>
            <span className="about-stat-number" data-target="99.9%">
              99.9%
            </span>
            <span className="about-stat-label">Uptime</span>
          </li>
        </ul>
      </section>

      <section className="about-section about-story">
        <h2>Our Story</h2>
        <p>
          InfoStream started as a student project tracking cybersecurity
          headlines for campus hackathons. As friends asked for more
          topics—tech, finance, world news—the project grew into a full
          platform. Today, InfoStream blends automation with community curation
          so anyone can build a smarter news feed.
        </p>
      </section>

      <section className="about-section about-cta">
        <h2>Stay Informed. Stay Ahead.</h2>
        <p>
          Create a free account, follow topics, and build your own info stream
          in minutes.
        </p>
        <a className="about-cta-button" href="/signup">
          Get Started
        </a>
      </section>
    </main>
  );
}

export default Detail;
