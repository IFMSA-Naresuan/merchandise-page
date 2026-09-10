import { landingContent } from "../../content/landing.js";

export default function SupportUs() {
  const { support } = landingContent;
  return (
    <section id="support" className="support-section" aria-labelledby="support-title">
      <div className="landing-shell support-scene">
        <p className="eyebrow" data-reveal>{support.eyebrow}</p>
        <div className="support-composition">
          <h2 id="support-title" data-reveal>
            {support.headingLines.map((line) => <span key={line}>{line}{" "}</span>)}
          </h2>
          <div className="support-aside" data-reveal>
            <p>{support.body}</p>
            <a className="text-link" href="#merchandise">
              {support.linkLabel}<span className="circle-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="support-bridge">
          <p>{support.bridge}</p><span aria-hidden="true">↓</span>
        </div>
      </div>
    </section>
  );
}
