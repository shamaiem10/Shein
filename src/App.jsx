import React from 'react';
import Header from './components/Header.jsx';
import {
  AppSection,
  CareSection,
  HomeSections,
  NewInSection,
  SaleSection,
  WomenSection
} from './components/Sections.jsx';

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <a className="footer-brand" href="#top" aria-label="SHEIN home">SHEIN</a>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#customer-care">Customer Care</a>
          <a href="#shipping">Shipping &amp; Returns</a>
          <a href="#cookies">Privacy &amp; Cookies</a>
          <a href="#app">App</a>
        </nav>
        <a className="to-top" href="#top"><span>Back to top</span><i className="bi bi-arrow-up" /></a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <HomeSections />
        <SaleSection />
        <NewInSection />
        <WomenSection />
        <AppSection />
        <CareSection />
      </main>
      <Footer />
    </div>
  );
}
