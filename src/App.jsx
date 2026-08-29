import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Tabs from "./components/Tabs.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-700">
      <Header />
      {/* <Tabs /> */}
      <ProductGrid />
      <Footer />
    </div>
  );
}
