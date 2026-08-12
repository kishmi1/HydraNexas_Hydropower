"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {useParams} from "next/navigation";
import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import "./EventDetails.css";
import { useEffect, useState } from "react";

export default function EventDetails(){
    const params = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/events/${params.id}`)
            .then((res) => res.json())
            .then((result) => {
                console.log("EVENT DETAILS:", result);
                if (result.success) {
                    setEvent(result.event);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [params.id]);

    if(loading) {
        return <div className="p-8">Loading...</div>;
    }

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
                backgroundImage={event.image}
            />


            <section className="event-details-section">

                <div className="container">


                 <motion.img
    src={event.image}
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
    className="event-description"
>
    {event.description}
</motion.p>


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
    href="/news/events"
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
