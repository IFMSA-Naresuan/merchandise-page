import { landingContent } from "../../content/landing.js";

export default function WhatWeDo() {
  const { mission } = landingContent;
  return (
    <section id="what-we-do" className="what-we-do" aria-labelledby="mission-title">
      <div className="landing-container">
        <p className="landing-eyebrow landing-section-label" data-reveal>
          <span className="landing-eyebrow__rule" aria-hidden="true" />{mission.eyebrow}
        </p>
        <h2 id="mission-title" className="what-we-do__title" data-reveal>
          {mission.headingLines.map((line, index) => (
            <span key={line} className={index > 1 ? "what-we-do__title-accent" : undefined}>
              <span className="what-we-do__title-line" style={{ "--line-order": index }}>{line}{" "}</span>
            </span>
          ))}
        </h2>
        <div className="what-we-do__context" data-reveal>
          <div className="what-we-do__copy">
            <p className="what-we-do__intro">{mission.intro}</p>
            <p>{mission.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
