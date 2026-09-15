import { landingContent } from "../../content/landing.js";
import ProductGrid from "../ProductGrid.jsx";

export default function CatalogueEntry() {
  const { catalogue } = landingContent;
  return (
    <section id="merchandise" className="merchandise" aria-labelledby="catalogue-title">
      <div className="merchandise__panel">
        <div className="landing-container merchandise__intro" data-reveal>
          <div>
            <p className="landing-eyebrow">{catalogue.eyebrow}</p>
            <h2 id="catalogue-title">{catalogue.title}</h2>
          </div>
          <p className="merchandise__description">{catalogue.body}</p>
        </div>
        <div className="merchandise__grid" data-reveal><ProductGrid /></div>
      </div>
    </section>
  );
}
