import { landingContent } from "../../content/landing.js";

export default function Hero() {
  const { hero } = landingContent;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__layout landing-container">
        <div className="hero__intro">
          <div className="hero__copy">
            <p className="landing-eyebrow"><span className="landing-eyebrow__rule" aria-hidden="true" />{hero.eyebrow}</p>
            <p className="hero__description">{hero.description}</p>
          </div>
        </div>
        <div className="hero__wordmark">
          <h1 id="hero-title">{hero.title}</h1>
          <div className="hero__footer">
            <p>{hero.motifCaption}</p>
            <a className="landing-action-link hero__discover-link" href="#what-we-do">
              {hero.scrollLabel}<span className="landing-action-link__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
