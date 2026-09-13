import { landingContent } from "../../content/landing.js";

export default function WhatWeDo() {
  const { mission } = landingContent;
  return (
    <section id="what-we-do" className="mission-section" aria-labelledby="mission-title">
      <div className="landing-shell">
        <p className="eyebrow section-label" data-reveal>
          <span className="small-rule" aria-hidden="true" />{mission.eyebrow}
        </p>
        <h2 id="mission-title" className="mission-title" data-reveal>
          {mission.headingLines.map((line, index) => (
            <span key={line} className={index > 1 ? "mission-accent" : undefined}>
              <span className="mission-line" style={{ "--line-order": index }}>{line}{" "}</span>
            </span>
          ))}
        </h2>
        <div className="mission-context" data-reveal>
          <div className="mission-copy">
            <p className="mission-intro">{mission.intro}</p>
            <p>{mission.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
