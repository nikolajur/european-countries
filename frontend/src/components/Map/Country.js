import React, { useContext } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import CountryContext from "../../store/country-context";

const Country = () => {
  const ctx = useContext(CountryContext);
  const map = useMap();

  const countryGeom = ctx.geom;
  const bounds = L.geoJSON(countryGeom).getBounds();
  map.fitBounds(bounds);

  return (
    <GeoJSON
      key={ctx.flag}
      data={countryGeom}
      pathOptions={{ stroke: false, fillColor: "#d2d2d2", fillOpacity: "1", interactive: false }}
    />
  );
};

//
export default Country;
