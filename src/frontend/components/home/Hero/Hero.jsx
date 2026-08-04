"use client";

import "./Hero.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
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
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
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

            <div className="container hero-content">

             <motion.span
  className="hero-subtitle"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
{t("hero.subtitle")}</motion.span>

             <motion.h1
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.2 }}
>
{t("hero.title")}
<br />
{t("hero.title2")}
</motion.h1>

             <motion.p
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4 }}
>
{t("hero.description")}
</motion.p>

             <motion.div
  className="hero-buttons"
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.6 }}
>
 <Link href="/projects" className="primary-btn">
 {t("hero.explore")}
</Link>

  <Link
  href="/investor/financial-highlights"
  className="secondary-btn"
>
  {t("hero.investor")}
</Link>
</motion.div>

            </div>

          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
