import React, { useState } from "react";

import classes from "./Attribution.module.css";

const Attribution = () => {
  const [showPopup, setShowPopup] = useState(false);

  const toggleInfoPopup = (e) => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className={classes.attribution} onClick={toggleInfoPopup}>
      {showPopup && (
        <div className={classes.popup}>
          <p>
            mapa:&nbsp;technologie&nbsp;
            <a
              href="https://leafletjs.com"
              title="A JavaScript library for interactive maps"
              target="_blank"
              rel="noreferrer"
            >
              Leaflet
            </a>
          </p>
          <br />
          <p>
            data:&nbsp;
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
              &copy;&nbsp;OpenStreetMap&nbsp;
            </a>
            &nbsp;contributors
          </p>
          <br />
          <p>aplikace: Nikola Jurková</p>
        </div>
      )}

      <svg viewBox="0 0 24 24" fill="#d2d2d2" height="24px" width="24px">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
      </svg>
    </div>
  );
};

export default React.memo(Attribution);
