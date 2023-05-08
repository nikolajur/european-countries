import React, { useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

import classes from "./RadioButtonGame.module.css";

const flagUrl = "https://flagcdn.com/h80";

const RadioButtonGame = forwardRef(function RadioButtonGame(props, firstFlagRef) {
  const { optionsArray: randomFlags, onSubmitAnswer } = props;

  const onSelectFlagHandler = (e) => {
    onSubmitAnswer(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      const index = parseInt(document.activeElement.dataset.flagindex);

      if (index >= 0 && index <= 3) {
        onSubmitAnswer(randomFlags[index]);
      }
    }
  };

  const onMouseOverHandler = (e) => {
    e.target.focus();
  };

  useEffect(() => {
    if (firstFlagRef) {
      firstFlagRef.current.focus();
    }
  });

  return (
    <motion.form
      className={classes["form-radio"]}
      key="radioButtons"
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
      initial={{ opacity: 0, x: "-100vw" }}
      exit={{ opacity: 0, x: "100vw", transition: { ease: "easeOut", duration: 0.5, delay: 0.5 } }}
    >
      {randomFlags.map((flag, index) => {
        return (
          <div
            key={index}
            className={classes["flag-container"]}
            ref={index === 0 ? firstFlagRef : null}
            tabIndex={0}
            onKeyDown={keyDownHandler}
            onMouseOver={onMouseOverHandler}
            data-flagindex={index}
          >
            <input
              type="radio"
              id={`f${index}`}
              name="flags"
              value={randomFlags[index]}
              onClick={onSelectFlagHandler}
              tabIndex={-1}
            />
            <div className={classes.flag}>
              <label htmlFor={`f${index}`} className={classes.label}>
                <img src={`${flagUrl}/${randomFlags[index]}.png`} alt="flag" />
              </label>
            </div>
          </div>
        );
      })}
    </motion.form>
  );
});

export default RadioButtonGame;
