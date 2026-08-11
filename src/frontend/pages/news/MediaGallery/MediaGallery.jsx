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
  const [selectedVideo, setSelectedVideo] = useState(null);


 useEffect(() => {

 fetch("/api/gallery")

 .then(res=> {
    if (!res.ok) {
        console.error("API Error - Status:", res.status);
        setGallery([]); // Set empty array on error
        setLoading(false);
        return null;
    }
    return res.json();
 })

 .then(data=>{
    if (data && data.success) {
        setGallery(data.gallery || []);
    } else {
        console.error("API Error:", data?.message || "Unknown error");
        setGallery([]); // Set empty array on error
    }
    setLoading(false);

 })

 .catch(error=>{
    console.error("Error fetching gallery:", error);
    setGallery([]); // Set empty array on error
    setLoading(false);
 });


}, []);

const images = gallery.filter(
 item=>item.type==="Image"
);


const videos = gallery.filter(
 item=>item.type==="Video"
);

const handleWatchVideo = (video) => {
  setSelectedVideo(video);
};

const closeVideoModal = () => {
  setSelectedVideo(null);
};



  return (
    <>

      <PageHero
        subtitle="News & Events"
        title="Media Gallery"
        description="Explore our latest project photos, construction updates, community programs, and corporate videos."
        backgroundImage={heroImage}
      />

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideoModal}>×</button>
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              className="modal-video"
            />
            <h3>{selectedVideo.title}</h3>
          </div>
        </div>
      )}


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

          <div className="section-header video-title">

            <span>Videos</span>

            <h2>Video Gallery</h2>

            <p>
              Watch our hydropower projects, construction progress,
              community activities and corporate events.
            </p>

          </div>

          <ScrollAnimation direction="left">

            <div className="video-grid">

              {
                videos.map((video)=>(


                  <div
                    className="video-card"
                    key={video.id}
                  >


                   <div className="video-image">
                    {video.image ? (
                      <img src={video.image} alt={video.title} />
                    ) : (
                      <div className="video-thumbnail">
                        <div className="play-icon">▶</div>
                      </div>
                    )}
                  </div>




                    <div className="video-content">


                      <h3>
                        {video.title}
                      </h3>



                      <button
                        className="primary-btn"
                        onClick={() => handleWatchVideo(video)}
                      >

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
