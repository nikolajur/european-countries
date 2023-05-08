import React, { useState, useCallback } from "react";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import classes from "./ModalWindow.module.css";

const ModalWindow = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const { onClose, onNext, game, nextGame, question, answer, ok } = props;

  const isLastGame = game === "area";

  const showNextGameHandler = useCallback(() => {
    onClose();
    onNext(nextGame, question);
  }, [onClose, onNext, nextGame, question]);

  const onGiveUpHandler = useCallback(() => {
    setShowAnswer(true);
  }, []);

  const goToStart = useCallback(() => {
    onClose();
    onNext("country", "POZNÁŠ STÁT PODLE JEHO HRANIC?");
  }, [onClose, onNext]);

  return (
    <motion.div
      key="modal"
      className={classes.modal}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.4 }
      }}
      initial={{ y: "-100%", opacity: 0.2 }}
      exit={{ y: "-200%", opacity: 0, transition: { ease: "backIn", duration: 0.4 } }}
    >
      {!showAnswer && <h3>{props.msg}</h3>}
      {showAnswer && (
        <>
          <motion.h3
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            initial={{ opacity: 0 }}
          >
            SPRÁVNÁ ODPOVĚĎ JE
          </motion.h3>
          <motion.p
            className={classes[game]}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.8 } }}
            initial={{ scale: 0.6, opacity: 0 }}
          >
            {answer}
            {game === "area" ? " km" : null}
            {game === "area" ? <sup>2</sup> : null}
          </motion.p>
        </>
      )}
      {isLastGame && (props.ok || (!props.ok && showAnswer)) && (
        <motion.h3
          className={classes.konec}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 1.5 } }}
          initial={{ opacity: 0 }}
        >
          KONEC HRY
        </motion.h3>
      )}
      <div className={classes.buttons}>
        <Button
          className="btn-orange"
          type="button"
          focus={isLastGame && (props.ok || (!props.ok && showAnswer))}
          label={ok || (!ok && showAnswer) ? "ZPÁTKY NA ZAČÁTEK" : "VZDÁVÁM TO"}
          onClick={ok || (!ok && showAnswer) ? goToStart : onGiveUpHandler}
        ></Button>

        {(!isLastGame || (isLastGame && !props.ok && !showAnswer)) && (
          <Button
            className="btn-blue"
            type="button"
            focus={true}
            label={props.ok || (!props.ok && showAnswer) ? props.btnLabel : "ZKUSÍM TO ZNOVA"}
            onClick={props.ok || (!props.ok && showAnswer) ? showNextGameHandler : props.onClose}
          ></Button>
        )}
      </div>

      {isLastGame && (props.ok || (!props.ok && showAnswer)) && (
        <a href={props.wiki} target="_blank" rel="noreferrer">
          Ukaž info o státě na Wikipedii
        </a>
      )}
    </motion.div>
  );
};

export default React.memo(ModalWindow);
