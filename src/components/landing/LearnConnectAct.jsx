import { landingContent } from "../../content/landing.js";

export default function LearnConnectAct() {
  const { journey } = landingContent;
  return (
    <section className="journey-section landing-shell" aria-labelledby="journey-title">
      <h2 id="journey-title" className="eyebrow section-label" data-reveal>{journey.eyebrow}</h2>
      <ol className="journey-stages">
        {journey.stages.map((stage) => (
          <li key={stage.number} className="journey-stage" data-reveal>
            <span className="stage-number" aria-hidden="true">{stage.number}</span>
            <div className="stage-copy">
              <h3>{stage.title}<span className="stage-period" aria-hidden="true">.</span></h3>
              <p>{stage.body}</p>
            </div>
            <span className="stage-node" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="journey-outcome" data-reveal>
        <span className="outcome-branch" aria-hidden="true"><i /><i /><i /></span>
        <p>{journey.outcome}</p><span aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
