"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import "./EventDetails.css";
import { events } from "../../../data/newsData";

const event1 = "/assets/images/news/event1.jpg";
const event2 = "/assets/images/news/event2.jpg";
const event3 = "/assets/images/news/event3.jpg";


const images = {
    event1,
    event2,
    event3,
};


export default function EventDetails({ params }){

    const event = events.find(
        (item)=> item.id === Number(params.id)
    );


    if(!event){

        return (
            <h2>
                Event Not Found
            </h2>
        );

    }


    return (

        <>

            <PageHero
                subtitle="News & Events"
                title={event.title}
                description={event.description}
                backgroundImage={images[event.image]}
            />


            <section className="event-details-section">

                <div className="container">


                 <motion.img
    src={images[event.image]}
    alt={event.title}
    initial={{opacity:0, scale:0.9}}
    animate={{opacity:1, scale:1}}
    transition={{duration:0.7}}
/>


<motion.h1
    initial={{opacity:0, x:-50}}
    animate={{opacity:1, x:0}}
    transition={{duration:0.8, delay:0.2}}
>
    {event.title}
</motion.h1>


<motion.p
    initial={{opacity:0, x:50}}
    animate={{opacity:1, x:0}}
    transition={{duration:0.8, delay:0.3}}
>
    📅 {event.date}
</motion.p>


<motion.p
    initial={{opacity:0, x:50}}
    animate={{opacity:1, x:0}}
    transition={{duration:0.8, delay:0.4}}
>
    📍 {event.location}
</motion.p>


<motion.p
    initial={{opacity:0, y:30}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.8, delay:0.5}}
>
    {event.content}
</motion.p>


<motion.div
    initial={{opacity:0, y:30}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.8, delay:0.6}}
>

<Link
    href="/events"
    className="primary-btn"
>
    Back to Events
</Link>

</motion.div>
</div>
            </section>


            <CTASection />

        </>

    );

}
