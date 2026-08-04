import { motion } from "framer-motion";

export default function ScrollAnimation({
  children,
  direction = "up",
  delay = 0
}) {

  const animations = {

    up: {
      initial: {
        opacity: 0,
        y: 60
      },
      animate: {
        opacity: 1,
        y: 0
      }
    },

    left: {
      initial: {
        opacity: 0,
        x: -80
      },
      animate: {
        opacity: 1,
        x: 0
      }
    },

    right: {
      initial: {
        opacity: 0,
        x: 80
      },
      animate: {
        opacity: 1,
        x: 0
      }
    },

    fade: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      }
    }

  };


  return (

    <motion.div

      initial={animations[direction].initial}

      whileInView={animations[direction].animate}

      viewport={{
        once:true,
        amount:0.2
      }}

      transition={{
        duration:0.7,
        delay
      }}

    >

      {children}

    </motion.div>

  );
}
