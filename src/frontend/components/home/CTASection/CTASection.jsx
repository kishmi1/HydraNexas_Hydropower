import "./CTASection.css";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="cta-section">

      <div className="container">

        <div className="cta-content">

          <span>Let's Build the Future Together</span>

          <h2>
            Partner With HydraNexa
            <br />
            For A Sustainable Tomorrow
          </h2>

          <p>
            Join us in transforming Nepal's energy future through
            innovative hydropower projects, responsible investment,
            and sustainable development.
          </p>

          <div className="cta-buttons">

            <Link
              href="/contact"
              className="primary-btn"
            >
              Contact Us
            </Link>

            <Link
              href="/projects"
              className="secondary-btn"
            >
              Explore Projects
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
