import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <h3>HydraNexa</h3>
              <p>Powering Nepal's sustainable future through innovative hydropower solutions.</p>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <span>📍</span>
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="contact-item">
                <span>📧</span>
                <span>info@hydranexa.com</span>
              </div>
              <div className="contact-item">
                <span>📞</span>
                <span>+977 9843289896</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about/company-overview">About Us</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/investor/financial-highlights">Investor Relations</Link></li>
              <li><Link href="/careers/current-openings">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="footer-section">
            <h4>Our Projects</h4>
            <ul className="footer-links">
              <li><Link href="/projects/ongoing">Ongoing Projects</Link></li>
              <li><Link href="/projects/completed">Completed Projects</Link></li>
              <li><Link href="/projects/upcoming">Upcoming Projects</Link></li>
              <li><Link href="/projects/project-map">Project Map</Link></li>
            </ul>
          </div>

          {/* Investor */}
          <div className="footer-section">
            <h4>Investor Relations</h4>
            <ul className="footer-links">
              <li><Link href="/investor/financial-highlights">Financial Highlights</Link></li>
              <li><Link href="/investor/annual-reports">Annual Reports</Link></li>
              <li><Link href="/investor/corporate-governance">Corporate Governance</Link></li>
              <li><Link href="/investor/downloads">Downloads</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2026 HydraNexa Energy Ltd. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-legal">
              {/* Legal pages not yet implemented */}
              {/* <Link href="/privacy">Privacy Policy</Link> */}
              {/* <Link href="/terms">Terms of Service</Link> */}
              {/* <Link href="/disclaimer">Disclaimer</Link> */}
            </div>
            <div className="footer-social">
              {/* Social media links - add actual URLs when available */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
