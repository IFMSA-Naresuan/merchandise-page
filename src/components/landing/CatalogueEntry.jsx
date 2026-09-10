import { landingContent } from "../../content/landing.js";
import ProductGrid from "../ProductGrid.jsx";

export default function CatalogueEntry() {
  const { catalogue } = landingContent;
  return (
    <section id="merchandise" className="catalogue-entry" aria-labelledby="catalogue-title">
      <div className="catalogue-panel">
        <div className="landing-shell catalogue-intro" data-reveal>
          <div>
            <p className="eyebrow">{catalogue.eyebrow}</p>
            <h2 id="catalogue-title">{catalogue.title}</h2>
          </div>
          <p className="catalogue-description">{catalogue.body}</p>
        </div>
        <div className="catalogue-grid-entry" data-reveal><ProductGrid /></div>
      </div>
    </section>
  );
}
