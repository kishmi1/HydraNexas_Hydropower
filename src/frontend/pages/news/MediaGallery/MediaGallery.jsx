"use client";

import "./MediaGallery.css";

import { useEffect, useState } from "react";

import ScrollAnimation from "../../../components/common/ScrollAnimation/ScrollAnimation";
import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/news/gallery-hero.jpg";


export default function MediaGallery() {

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);


 useEffect(() => {

 fetch("/api/gallery")

 .then(res=>res.json())

 .then(data=>{

    setGallery(data.gallery);
    setLoading(false);

 })

 .catch(error=>console.log(error));


}, []);


const images = gallery.filter(
 item=>item.type==="Image"
);


const videos = gallery.filter(
 item=>item.type==="Video"
);



  return (
    <>

      <PageHero
        subtitle="News & Events"
        title="Media Gallery"
        description="Explore our latest project photos, construction updates, community programs, and corporate videos."
        backgroundImage={heroImage}
      />


      <section className="gallery-section">


        <div className="container">


          <div className="section-header">

            <span>Gallery</span>

            <h2>Photo Gallery</h2>

            <p>
              Explore our hydropower projects, construction progress,
              community activities and corporate events.
            </p>

          </div>



          {
            loading ? (

              <p>Loading gallery...</p>

            ) : (


              <ScrollAnimation direction="left">

                <div className="photo-grid">


                  {
                    images.map((item)=> (

                      <div
                        className="photo-card"
                        key={item.id}
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                        />


                      </div>


                    ))
                  }


                </div>


              </ScrollAnimation>


            )
          }





          <ScrollAnimation direction="left">


            <div className="section-header video-title">

              <span>Videos</span>

              <h2>Video Gallery</h2>


            </div>




            <div className="video-grid">


              {
                videos.map((video)=>(


                  <div
                    className="video-card"
                    key={video.id}
                  >



                   <div className="video-image">

  <video
    src={video.video}
    controls
  />

  <div className="play-btn">
    ▶
  </div>

</div>





                    <div className="video-content">


                      <h3>
                        {video.title}
                      </h3>



                      <button className="primary-btn">

                        Watch Video

                      </button>



                    </div>



                  </div>



                ))
              }



            </div>



          </ScrollAnimation>



        </div>


      </section>



      <CTASection />


    </>
  );
}
