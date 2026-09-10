import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/landing/Hero.jsx";
import WhatWeDo from "./components/landing/WhatWeDo.jsx";
import LearnConnectAct from "./components/landing/LearnConnectAct.jsx";
import SupportUs from "./components/landing/SupportUs.jsx";
import CatalogueEntry from "./components/landing/CatalogueEntry.jsx";
import NarrativeMotion from "./components/landing/NarrativeMotion.jsx";

export default function App() {
  return (
    <div id="top" className="landing-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <NarrativeMotion>
          <Hero />
          <WhatWeDo />
          <LearnConnectAct />
          <SupportUs />
          <CatalogueEntry />
        </NarrativeMotion>
      </main>
      <Footer />
    </div>
  );
}
