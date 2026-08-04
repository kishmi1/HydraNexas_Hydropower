"use client";

import { useState } from "react";
import "./VendorRegistration.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";

import {
  registrationBenefits,
  eligibilityRequirements,
} from "../../../data/tenderData";

import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

export default function VendorRegistration() {

  const [isLogin, setIsLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({

    companyName: "",
    registrationNumber: "",
    vat: "",
    businessCategory: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    password: "",

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    let newValue = value;

    switch (name) {

      case "companyName":
      case "contactPerson":
        newValue = value.replace(/[^A-Za-z\s]/g, "");
        break;

      case "phone":
        newValue = value.replace(/\D/g, "").slice(0,10);
        break;

      case "vat":
        newValue = value.replace(/\D/g, "");
        break;

      default:
        break;

    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

  };

  const validate = () => {

    let newErrors = {};

    if(!isLogin){

      if(formData.companyName.trim()==="")
        newErrors.companyName="Company name is required.";

      if(formData.registrationNumber.trim()==="")
        newErrors.registrationNumber="Registration number is required.";

      if(formData.vat.trim()==="")
        newErrors.vat="VAT/PAN is required.";

      if(formData.businessCategory==="")
        newErrors.businessCategory="Please select business category.";

      if(formData.contactPerson.trim()==="")
        newErrors.contactPerson="Contact person is required.";

      if(formData.phone.length!==10)
        newErrors.phone="Phone number must be exactly 10 digits.";

      if(formData.address.trim()==="")
        newErrors.address="Address is required.";

    }

    if(formData.email.trim()==="")
      newErrors.email="Email is required.";

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(formData.email && !emailRegex.test(formData.email))
      newErrors.email="Invalid email address.";

    if(formData.password.length<8)
      newErrors.password="Password must be at least 8 characters.";
     console.log(newErrors);

    setErrors(newErrors);

    return Object.keys(newErrors).length===0;

  };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit clicked");

  if (!validate()) {
    console.log("Validation Failed");
    return;
  }

  console.log("Validation Passed");


  try {
    const url = isLogin
      ? "/api/vendor-login"
      : "/api/vendor-registrations";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.log(error);
  }
};
    return (
    <>
      <PageHero
        subtitle="E-Bidding"
        title="Vendor Registration"
        description="Register your company to participate in HydraNexa Energy procurement opportunities."
        backgroundImage={heroImage}
      />

      <section className="vendor-section">

        <div className="container">

          <div className="section-header">

            <span>Become a Partner</span>

            <h2>{isLogin ? "Vendor Login" : "Vendor Registration"}</h2>

            <p>
              {isLogin
                ? "Login to access your vendor portal."
                : "Register your organization to participate in our procurement process."}
            </p>

          </div>

          <div className="vendor-wrapper">

            <div className="vendor-form">

              {!submitted ? (

                <form onSubmit={handleSubmit}>

                  {!isLogin && (

                    <>

                      <div className="input-group">

                        <FaBuilding/>

                        <input
                          type="text"
                          name="companyName"
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={handleChange}
                        />

                      </div>

                      {errors.companyName && (
                        <small className="error">{errors.companyName}</small>
                      )}

                      <div className="input-group">

                        <FaBuilding/>

                        <input
                          type="text"
                          name="registrationNumber"
                          placeholder="Registration Number"
                          value={formData.registrationNumber}
                          onChange={handleChange}
                        />

                      </div>

                      {errors.registrationNumber && (
                        <small className="error">{errors.registrationNumber}</small>
                      )}

                      <div className="input-group">

                        <input
                          type="text"
                          name="vat"
                          placeholder="VAT / PAN Number"
                          value={formData.vat}
                          onChange={handleChange}
                        />

                      </div>

                      {errors.vat && (
                        <small className="error">{errors.vat}</small>
                      )}

                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                      >

                        <option value="">Business Category</option>
                        <option>Contractor</option>
                        <option>Supplier</option>
                        <option>Consultant</option>
                        <option>Equipment Manufacturer</option>
                        <option>Service Provider</option>

                      </select>

                      {errors.businessCategory && (
                        <small className="error">
                          {errors.businessCategory}
                        </small>
                      )}

                      <div className="input-group">

                        <FaUser/>

                        <input
                          type="text"
                          name="contactPerson"
                          placeholder="Contact Person"
                          value={formData.contactPerson}
                          onChange={handleChange}
                        />

                      </div>

                      {errors.contactPerson && (
                        <small className="error">
                          {errors.contactPerson}
                        </small>
                      )}

                    </>

                  )}

                  <div className="input-group">

                    <FaEnvelope/>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>

                  {errors.email && (
                    <small className="error">{errors.email}</small>
                  )}

                  {!isLogin && (

                    <>

                      <div className="input-group">

                        <FaPhone/>

                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                        />

                      </div>

                      {errors.phone && (
                        <small className="error">{errors.phone}</small>
                      )}

                      <textarea
                        rows="4"
                        name="address"
                        placeholder="Company Address"
                        value={formData.address}
                        onChange={handleChange}
                      />

                      {errors.address && (
                        <small className="error">{errors.address}</small>
                      )}

                    </>

                  )}

                  <div className="input-group password-group">

                    <FaLock/>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <span
                      className="toggle-password"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </span>

                  </div>

                  {errors.password && (
                    <small className="error">{errors.password}</small>
                  )}

                  {isLogin && (

                    <div className="remember-row">

                      <label>

                        <input type="checkbox"/>

                        Remember Me

                      </label>

                      <a href="#">
                        Forgot Password?
                      </a>

                    </div>

                  )}

                  <button
                    className="primary-btn"
                    type="submit"
                  >
                    {isLogin ? "Login" : "Register Now"}
                  </button>

                  <div className="switch-form">

                    {isLogin ? (

                      <p>

                        Don't have an account?

                        <span
                          onClick={() => setIsLogin(false)}
                        >
                          Register
                        </span>

                      </p>

                    ) : (

                      <p>

                        Already Registered?

                        <span
                          onClick={() => setIsLogin(true)}
                        >
                          Vendor Login
                        </span>

                      </p>

                    )}

                  </div>

                </form>

              ) : (

                <div className="success-box">

                  <h2>
                    ✅ {isLogin
                      ? "Login Successful"
                      : "Registration Successful"}
                  </h2>

                  <p>

                    {isLogin
                      ? "Welcome back to HydraNexa Vendor Portal."
                      : "Thank you for registering with HydraNexa Energy."}

                  </p>

                  <button
                    className="primary-btn"
                    onClick={() => {

                      setSubmitted(false);

                      setIsLogin(false);

                    }}
                  >
                    Back
                  </button>

                </div>

              )}

            </div>
                        <div className="vendor-info">

              <div className="requirements">

                <h3>Eligibility Requirements</h3>

                <ul>

                  {eligibilityRequirements.map((item, index) => (

                    <li key={index}>
                      ✓ {item}
                    </li>

                  ))}

                </ul>

              </div>

              <div className="benefits">

                <h3>Benefits</h3>

                {registrationBenefits.map((item) => (

                  <div
                    className="benefit-card"
                    key={item.id}
                  >

                    <h4>{item.title}</h4>

                    <p>{item.description}</p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );

}
