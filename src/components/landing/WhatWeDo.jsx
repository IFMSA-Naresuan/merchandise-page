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
          <svg className="mission-thread" viewBox="0 0 320 150" aria-hidden="true" fill="none">
            <path d="M5 28H130C185 28 160 119 219 119H301" pathLength="1" stroke="currentColor" strokeWidth="2" />
            <circle cx="305" cy="119" r="7" fill="currentColor" />
          </svg>
          <div className="mission-copy">
            <p className="mission-intro">{mission.intro}</p>
            <p>{mission.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
