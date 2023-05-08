import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameWrapper = (props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="game-wrapper"
        key={props.game}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        initial={{ opacity: 0, x: "-100vw" }}
        exit={{
          opacity: 0,
          x: "100vw",
          transition: { ease: "easeOut", duration: 0.5, delay: 0.8 }
        }}
      >
        {props.children}
      </motion.div>
      ;
    </AnimatePresence>
  );
};

export default React.memo(GameWrapper);
