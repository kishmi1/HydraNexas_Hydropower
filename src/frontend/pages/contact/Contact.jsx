"use client";

import "./Contact.css";

import { useState } from "react";

import PageHero from "../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/contact/contact-hero.jpg";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (

    <>

      <PageHero
        subtitle="Contact"
        title="Get In Touch"
        description="We're here to answer your questions and assist you with any inquiries about HydraNexa Energy."
        backgroundImage={heroImage}
      />

      <section className="contact-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>Contact Us</span>

            <h2>Let's Connect</h2>

            <p>
              We'd love to hear from you. Reach out through any of the
              following channels or send us a message directly.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-card fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <h3>Office Address</h3>

              <p>
                Kathmandu Metropolitan City,
                Kathmandu, Nepal
              </p>
            </div>

            <div className="contact-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="contact-icon">
                <FaPhoneAlt />
              </div>

              <h3>Phone</h3>

              <p>+977-1-4567890</p>
            </div>

            <div className="contact-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <h3>Email</h3>

              <p>info@hydranexa.com</p>
            </div>

            <div className="contact-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="contact-icon">
                <FaClock />
              </div>

              <h3>Office Hours</h3>

              <p>Sun - Fri : 9:00 AM - 5:00 PM</p>
            </div>
          </div>

        </div>

      </section>

      <section className="contact-form-section">

        <div className="container">

          <div className="contact-wrapper">

            <div className="contact-form fade-in-up">
              <h2>Send Us a Message</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div className="contact-map fade-in-up" style={{ animationDelay: '0.2s' }}>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

      </section>

      <section className="social-section">

        <div className="container">

          <h2>Follow Us</h2>

          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaYoutube />
            </a>
          </div>

        </div>

      </section>

    </>

  );

}
