"use client";

import "./Hero.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-fade";

const hero1 = "/assets/images/hero/hero1.jpg";
const hero2 = "/assets/images/hero/hero2.jpg";
const hero3 = "/assets/images/hero/hero3.jpg";

export default function Hero() {
    const { t } = useTranslation();

  const slides = [hero1, hero2, hero3];
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1000}
      className="hero-slider"
    >
      {slides.map((image, index) => (
        <SwiperSlide key={index}>
          <section
            className="hero"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="hero-overlay"></div>

            <div className="container">
              <div className="hero-content">

               <span className="hero-subtitle">
                {t("hero.subtitle")}
               </span>

               <h1>
                {t("hero.title")}
                <br />
                {t("hero.title2")}
               </h1>

               <p>
                {t("hero.description")}
               </p>

               <div className="hero-buttons">
                <Link href="/projects" className="primary-btn">
                 {t("hero.explore")}
                </Link>

                <Link
                 href="/investor/financial-highlights"
                 className="secondary-btn"
                >
                 {t("hero.investor")}
                </Link>
               </div>

              </div>
            </div>

          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
