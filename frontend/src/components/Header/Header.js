import React, { useContext } from "react";
import CountryContext from "../../store/country-context";
import classes from "./Header.module.css";

const Header = (props) => {
  const ctx = useContext(CountryContext);

  const headlineStyle = props.game === "country" ? "default-text" : "country-name";
  return (
    <div className={classes["header-container"]}>
      <h1>EVROPA</h1>
      <h2 className={classes[headlineStyle]}>
        {props.game === "country" ? "ZNÁŠ EVROPSKÉ STÁTY?" : ctx.country.toUpperCase()}
      </h2>
    </div>
  );
};

export default React.memo(Header);
