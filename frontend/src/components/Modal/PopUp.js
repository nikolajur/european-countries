import React from "react";
import ReactDOM from "react-dom";
import ModalWindow from "./ModalWindow";
import classes from "./PopUp.module.css";

export const ModalBackground = () => {
  return <div className={classes.backdrop}></div>;
};

const PopUp = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<ModalBackground />, document.getElementById("modal-background-root"))}
      {ReactDOM.createPortal(
        <ModalWindow
          onClose={props.onClose}
          ok={props.ok}
          answer={props.answer}
          msg={props.msg}
          onNext={props.onNext}
          game={props.game}
          nextGame={props.nextGame}
          question={props.question}
          btnLabel={props.btnLabel}
          wiki={props.wiki}
        />,
        document.getElementById("modal-window-root")
      )}
    </>
  );
};

export default React.memo(PopUp);
