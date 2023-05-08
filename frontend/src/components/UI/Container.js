import React from "react";
import classes from "./Container.module.css";

const Container = (props) => {
  return <div className={`${classes.container} ${classes[props.type]}`}>{props.children}</div>;
};

export default React.memo(Container);
