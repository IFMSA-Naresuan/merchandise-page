import { landingContent } from "../../content/landing.js";

export default function Hero() {
  const { hero } = landingContent;
  return (
    <section className="hero-chapter" aria-labelledby="hero-title">
      <div className="landing-hero landing-shell">
        <div className="hero-scene">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-rule" aria-hidden="true" />{hero.eyebrow}</p>
            <p className="hero-description">{hero.description}</p>
          </div>
        </div>
        <div className="hero-signature">
          <h1 id="hero-title">{hero.title}</h1>
          <div className="hero-bottom">
            <p>{hero.motifCaption}</p>
            <a className="text-link scroll-cue" href="#what-we-do">
              {hero.scrollLabel}<span className="circle-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
