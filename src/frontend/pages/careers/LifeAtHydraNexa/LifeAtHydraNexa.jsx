import "./LifeAtHydraNexa.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/careers/careers-hero.jpg";
const cultureImage = "/assets/images/careers/work-culture.jpg";

import {
  FaLeaf,
  FaUsers,
  FaRocket,
  FaGraduationCap,
    FaMoneyCheckAlt,
  FaHeartbeat,
  FaBookOpen,
  FaAward,
  FaUmbrellaBeach,
  FaLaptopHouse,
} from "react-icons/fa";



import {
  lifeValues,
  employeeBenefits,
  testimonials,
} from "../../../data/careerData";

export default function LifeAtHydraNexa() {
  return (
    <>
      <PageHero
        subtitle="Careers"
        title="Life at HydraNexa"
        description="Discover a workplace where innovation, teamwork and sustainability drive Nepal's clean energy future."
        backgroundImage={heroImage}
      />

      {/* WHY JOIN US */}

      <section className="life-section">

        <div className="container">

          <div className="section-header">

            <span>Why Join Us</span>

            <h2>Grow Your Career With HydraNexa</h2>

            <p>
              We believe our people are our greatest strength.
              We provide opportunities to innovate, learn and
              contribute towards Nepal's renewable energy future.
            </p>

          </div>

        <div className="life-grid">

  {lifeValues.map((item) => {

    const icons = {
      Sustainability: <FaLeaf />,
      Innovation: <FaRocket />,
      Teamwork: <FaUsers />,
      "Career Growth": <FaGraduationCap />,
    };

    return (

      <div
        className="life-card"
        key={item.id}
      >

        <div className="life-icon">
          {icons[item.title]}
        </div>

        <h3>{item.title}</h3>

        <p>{item.description}</p>

      </div>

    );

  })}

</div>

        </div>

      </section>

      {/* WORK CULTURE */}

      <section className="culture-section">

        <div className="container culture-wrapper">

          <div className="culture-image">

            <img
              src={cultureImage}
              alt="HydraNexa Work Culture"
            />

          </div>

          <div className="culture-content">

            <span>Our Culture</span>

            <h2>Work Together. Grow Together.</h2>

            <p>
              HydraNexa promotes collaboration, innovation,
              diversity and continuous learning.
              We encourage every employee to take ownership,
              share ideas and build a sustainable future together.
            </p>

            <ul>

              <li>✔ Friendly & Professional Environment</li>

              <li>✔ Learning & Development</li>

              <li>✔ Equal Opportunity Workplace</li>

              <li>✔ Innovation Driven Culture</li>

            </ul>

          </div>

        </div>

      </section>

      {/* BENEFITS */}

      <section className="benefits-section">

        <div className="container">

          <div className="section-header">

            <span>Employee Benefits</span>

            <h2>What We Offer</h2>

          </div>

         <div className="benefits-grid">

  {employeeBenefits.map((item) => {

    const icons = {

      "Competitive Salary": <FaMoneyCheckAlt />,

      "Health Insurance": <FaHeartbeat />,

      "Professional Training": <FaBookOpen />,

      "Performance Bonus": <FaAward />,

      "Paid Leave": <FaUmbrellaBeach />,

      "Flexible Work Environment": <FaLaptopHouse />,

    };

    return (

      <div
        className="benefit-card"
        key={item.id}
      >

        <div className="life-icon">

          {icons[item.title]}

        </div>

        <h3>{item.title}</h3>

        <p>{item.description}</p>

      </div>

    );

  })}

</div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="testimonial-section">

        <div className="container">

          <div className="section-header">

            <span>Employee Stories</span>

            <h2>What Our Team Says</h2>

          </div>

          <div className="testimonial-grid">

            {testimonials.map((item) => (

              <div
                className="testimonial-card"
                key={item.id}

              >


                <p>"{item.feedback}"</p>

                <h4>{item.name}</h4>

                <span>{item.position}</span>

              </div>

            ))}

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
