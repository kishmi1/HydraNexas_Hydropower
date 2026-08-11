"use client";

import "./Navbar.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaBars, FaTimes, FaPhone } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { navItems } from "../../../data/navData";
const logo = "/assets/logo/logo.png";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { t } = useTranslation();
  const pathname = usePathname();

  const dropdownRef = useRef();

useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setActiveDropdown(null);
    }

  };


  document.addEventListener(
    "mousedown",
    handleClickOutside
  );


  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };


}, []);

  return (

    <header className="navbar">

      <div className="container navbar-container">

        {/* Logo */}

        <Link
          href="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >

          <img
            src={logo}
            alt="HydraNexa Logo"
          />

          <div className="logo-text">

            <h2>{t("navbar.logoTitle")}</h2>

            <span>{t("navbar.logoTagline")}</span>

          </div>

        </Link>

        {/* Mobile Toggle */}

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </button>

        {/* Right Side */}

        <div className="navbar-right">

          <nav
            className={
              menuOpen
                ? "nav-menu active"
                : "nav-menu"
            }
          >
            {navItems.map((item, index) => (

  item.children ? (

    <div
 className="nav-dropdown"
 key={item.key}
 ref={dropdownRef}
>

    <span
 className="dropdown-title"
 onClick={() =>
   setActiveDropdown(
     activeDropdown === index ? null : index
   )
 }
>

        {t(`navbar.${item.key}`)}

        <FaChevronDown
          className={
            activeDropdown === index
              ? "rotate"
              : ""
          }
        />

      </span>

     <div
 className={
   activeDropdown === index
   ? "dropdown-menu show"
   : "dropdown-menu"
 }
>

        {item.children.map((child) => (

          <Link
            key={child.key}
            href={child.path}
            onClick={() => {
              setMenuOpen(false);
              setActiveDropdown(null);
            }}
            className={pathname === child.path ? "active-link" : ""}
          >

            {t(`navbar.${child.key}`)}

          </Link>

        ))}

      </div>

    </div>

  ) : (

    <Link
      key={item.key}
      href={item.path}
      onClick={() => setMenuOpen(false)}
      className={pathname === item.path ? "active-link" : ""}
    >

      {t(`navbar.${item.key}`)}

    </Link>

  )

))}
          </nav>

          {/* Phone Number */}
          <a href="tel:+977123456789" className="navbar-phone">
            <FaPhone />
            <span>+977-1-1234567</span>
          </a>

        </div>

      </div>

    </header>

  );

}
