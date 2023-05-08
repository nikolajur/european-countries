import React, { useRef, useEffect } from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnRef = useRef();

  useEffect(() => {
    if (props.focus) {
      btnRef.current.focus();
    }
  });

  return (
    <button
      ref={btnRef}
      className={`${classes[props.className]} ${classes.button}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default React.memo(Button);
