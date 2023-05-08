import React, { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";

import classes from "./SelectOptionsGame.module.css";

const SelectOptionsGame = forwardRef(function SelectOptionsGame(props, firstCategRef) {
  const { game, gameData, optionsArray: categsArray, onSubmitAnswer } = props;

  const isAreaGame = game === "area";

  const onSelectCategHandler = (e) => {
    const index = parseInt(e.target.dataset.categindex);
    onSubmitAnswer(categsArray[index]);
  };

  const keyDownHandler = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      const index = parseInt(document.activeElement.dataset.categindex);
      if (index >= 0 && index <= 3) {
        onSubmitAnswer(categsArray[index]);
      }
    }
  };

  const onMouseOverHandler = (e) => {
    e.target.focus();
  };

  useEffect(() => {
    if (firstCategRef) {
      firstCategRef.current.focus();
    }
  });

  return (
    <motion.div>
      {categsArray.map((categ, index) => {
        return (
          <div
            key={index}
            className={classes.option}
            ref={index === 0 ? firstCategRef : null}
            tabIndex={0}
            onClick={onSelectCategHandler}
            onKeyDown={keyDownHandler}
            data-categindex={index}
            onMouseOver={onMouseOverHandler}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            initial={{ opacity: 0, x: "-100vw" }}
            exit={{
              opacity: 0,
              x: "100vw",
              transition: { ease: "easeOut", duration: 0.5, delay: 0.5 }
            }}
          >
            {gameData[categsArray[index]]}
            {isAreaGame && (
              <span>
                &nbsp;km<sup>2</sup>
              </span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
});

export default SelectOptionsGame;
