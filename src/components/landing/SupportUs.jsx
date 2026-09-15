import { landingContent } from "../../content/landing.js";

export default function SupportUs() {
  const { support } = landingContent;
  return (
    <section id="support" className="support" aria-labelledby="support-title">
      <div className="landing-container support__inner">
        <p className="landing-eyebrow" data-reveal>{support.eyebrow}</p>
        <div className="support__layout">
          <h2 id="support-title" data-reveal>
            {support.headingLines.map((line) => <span key={line}>{line}{" "}</span>)}
          </h2>
          <div className="support__details" data-reveal>
            <p>{support.body}</p>
            <a className="landing-action-link" href="#merchandise">
              {support.linkLabel}<span className="landing-action-link__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="support__footer">
          <p>{support.bridge}</p>
        </div>
      </div>
    </section>
  );
}
