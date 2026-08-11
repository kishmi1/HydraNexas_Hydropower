"use client";

import { useState } from "react";
import "./ApplyNow.css";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/careers/apply-now-hero.jpg";

import {
  positions,
  qualifications,
} from "../../../data/careerData";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaMoneyBillWave,
  FaFileUpload,
  FaPaperPlane,
} from "react-icons/fa";

export default function ApplyNow() {

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    qualification: "",
    experience: "",
    company: "",
    salary: "",
    coverLetter: "",
    cv: null,
    terms: false,

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    let newValue = value;

    if (name === "fullName") {

      newValue = value.replace(/[^A-Za-z\s]/g, "");

    }

    if (name === "phone") {

      newValue = value.replace(/\D/g, "").slice(0, 10);

    }

    if (name === "experience" || name === "salary") {

      newValue = value.replace(/\D/g, "");

    }

    if (type === "checkbox") {

      setFormData({
        ...formData,
        [name]: checked,
      });

      return;

    }

    if (type === "file") {

      setFormData({
        ...formData,
        cv: files[0],
      });

      return;

    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

  };

  const validate = () => {

    let newErrors = {};

    if (formData.fullName.trim() === "")
      newErrors.fullName = "Full name is required.";

    if (formData.email.trim() === "")
      newErrors.email = "Email is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Invalid email.";

    if (formData.phone.length !== 10)
      newErrors.phone = "Phone number must be exactly 10 digits.";

    if (formData.address.trim() === "")
      newErrors.address = "Address is required.";

    if (formData.position === "")
      newErrors.position = "Please select a position.";

    if (formData.qualification === "")
      newErrors.qualification = "Please select qualification.";

    if (formData.experience === "")
      newErrors.experience = "Experience is required.";

    if (!formData.cv)
      newErrors.cv = "Please upload your CV.";

    if (!formData.terms)
      newErrors.terms = "You must accept Terms & Conditions.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    const form = new FormData();

    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("position", formData.position);
    form.append("qualification", formData.qualification);
    form.append("experience", formData.experience);
    form.append("company", formData.company);
    form.append("salary", formData.salary);
    form.append("coverLetter", formData.coverLetter);
    form.append("cv", formData.cv);

    const response = await fetch(
      "/api/job-applications",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        qualification: "",
        experience: "",
        company: "",
        salary: "",
        coverLetter: "",
        cv: null,
        terms: false,
      });

      setErrors({});
    } else {
      alert(data.message || "Application submission failed.");
    }
  } catch (error) {
    console.error("Submit Error:", error);
    alert("Server Error");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <PageHero
        subtitle="Careers"
        title="Apply Now"
        description="Take the next step in your career by applying to join the HydraNexa Energy team."
        backgroundImage={heroImage}
      />

      <section className="apply-section">

        <div className="container">

          <div className="section-header">

            <span>Career Application</span>

            <h2>Submit Your Application</h2>

            <p>
              Complete the application form below. Our HR team will review
              your application and contact shortlisted candidates.
            </p>

          </div>

          <div className="apply-wrapper">

            {!submitted ? (

              <form
                className="apply-form"
                onSubmit={handleSubmit}
              >

                <div className="form-grid">

                  <div className="input-group">
                    <FaUser />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.fullName && <small>{errors.fullName}</small>}

                  <div className="input-group">
                    <FaEnvelope />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <small>{errors.email}</small>}

                  <div className="input-group">
                    <FaPhone />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <small>{errors.phone}</small>}

                  <div className="input-group">
                    <FaMapMarkerAlt />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && <small>{errors.address}</small>}

                  <div className="input-group">
                    <FaBriefcase />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    >
                      <option value="">Select Position</option>

                      {positions.map((item) => (

                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>

                      ))}

                    </select>
                  </div>
                  {errors.position && <small>{errors.position}</small>}

                  <div className="input-group">
                    <FaGraduationCap />
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    >
                      <option value="">Highest Qualification</option>

                      {qualifications.map((item) => (

                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>

                      ))}

                    </select>
                  </div>
                  {errors.qualification && (
                    <small>{errors.qualification}</small>
                  )}

                  <div className="input-group">
                    <FaBriefcase />
                    <input
                      type="text"
                      name="experience"
                      placeholder="Years of Experience"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.experience && <small>{errors.experience}</small>}

                  <div className="input-group">
                    <FaBuilding />
                    <input
                      type="text"
                      name="company"
                      placeholder="Current Company (Optional)"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaMoneyBillWave />
                    <input
                      type="text"
                      name="salary"
                      placeholder="Expected Salary (Optional)"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="upload-box">

                  <label>

                    <FaFileUpload />

                    Upload CV (PDF / DOC / DOCX)

                  </label>

                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                  />

                  {errors.cv && <small>{errors.cv}</small>}

                </div>

                <textarea
                  rows="6"
                  name="coverLetter"
                  placeholder="Cover Letter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                />

                <div className="checkbox">

                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />

                  <label>

                    I agree to the Terms & Conditions.

                  </label>

                </div>

                {errors.terms && <small>{errors.terms}</small>}

               <button
  className="primary-btn"
  type="submit"
  disabled={loading}
>
  <FaPaperPlane />
  {loading ? "Submitting..." : "Submit Application"}
</button>

              </form>

            ) : (

              <div className="success-box">

                <h2>🎉 Application Submitted Successfully</h2>

                <p>

                  Thank you for applying to HydraNexa Energy.

                  Our HR team will review your application carefully.

                  If shortlisted, we will contact you through your
                  registered email address or phone number.

                </p>

                <button
                  className="primary-btn"
                  onClick={() => {

                    setSubmitted(false);

                    setFormData({

                      fullName: "",
                      email: "",
                      phone: "",
                      address: "",
                      position: "",
                      qualification: "",
                      experience: "",
                      company: "",
                      salary: "",
                      coverLetter: "",
                      cv: null,
                      terms: false,

                    });

                    setErrors({});

                  }}
                >
                  Apply Another Position
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </>
  );

}
