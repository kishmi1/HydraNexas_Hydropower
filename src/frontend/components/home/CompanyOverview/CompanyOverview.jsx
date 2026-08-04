"use client";

import "./CompanyOverview.css";

const overviewImage = "/assets/images/company/company.jpg";

import { companyOverview } from "../../../data/homeData";

import { useTranslation } from "react-i18next";

import Link from "next/link";

import { motion } from "framer-motion";


export default function CompanyOverview()
{

  const { t } = useTranslation();


  return (

    <section className="company-overview">


      <div className="container company-grid">



        {/* LEFT IMAGE */}

        <motion.div

          className="company-image"

          initial={{
            opacity: 0,
            x: -80
          }}

          whileInView={{
            opacity: 1,
            x: 0
          }}

          viewport={{
            once: true,
            amount: 0.3
          }}

          transition={{
            duration: 0.8
          }}

        >

          <img

            src={overviewImage}

            alt="HydraNexa"

          />


        </motion.div>





        {/* RIGHT CONTENT */}


        <motion.div


          className="company-content"


          initial={{
            opacity: 0,
            x: 80
          }}


          whileInView={{
            opacity: 1,
            x: 0
          }}


          viewport={{
            once: true,
            amount: 0.3
          }}


          transition={{
            duration: 0.8,
            delay: 0.3
          }}

        >


          <span>
            {t("company.subtitle")}
          </span>



          <h2>
            {t("company.title")}
          </h2>



          <p>
            {t("company.description")}
          </p>




          <ul>

            <li>
              ✓ {t("company.feature1")}
            </li>

            <li>
              ✓ {t("company.feature2")}
            </li>

            <li>
              ✓ {t("company.feature3")}
            </li>


          </ul>




          <Link

            href="/about/company-overview"

            className="company-btn"

          >

            {t("company.button")}


          </Link>



        </motion.div>



      </div>


    </section>

  );

}
