import { landingContent } from "../../content/landing.js";

export default function LearnConnectAct() {
  const { journey } = landingContent;
  return (
    <section className="journey landing-container" aria-labelledby="journey-title">
      <h2 id="journey-title" className="landing-eyebrow landing-section-label" data-reveal>{journey.eyebrow}</h2>
      <ol className="journey__timeline">
        {journey.stages.map((stage) => (
          <li key={stage.number} className="journey__step" data-reveal>
            <span className="journey__step-number" aria-hidden="true">{stage.number}</span>
            <div className="journey__step-copy">
              <h3>{stage.title}<span className="journey__step-period" aria-hidden="true">.</span></h3>
              <p>{stage.body}</p>
            </div>
            <span className="journey__timeline-node" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="journey__outcome" data-reveal>
        <p>{journey.outcome}</p>
      </div>
    </section>
  );
}
