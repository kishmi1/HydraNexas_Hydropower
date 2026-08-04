import "./PageHero.css";

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
}) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(6, 35, 64, 0.70),
            rgba(6, 35, 64, 0.70)
          ),
          url(${backgroundImage})
        `,
      }}
    >
      <div className="container page-hero-content">

        <span>{subtitle}</span>

        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}

      </div>
    </section>
  );
}
