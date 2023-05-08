import React, { useContext } from "react";
import { MapContainer, Marker } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import CountryContext from "../../store/country-context";
import Country from "./Country";
import "leaflet/dist/leaflet.css";
import "./Map-leaflet.css";
import pinIcon from "../../icons/location-pin.svg";

const myIcon = L.icon({
  iconUrl: pinIcon,
  iconRetinaUrl: pinIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

const Map = (props) => {
  const ctx = useContext(CountryContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="map"
        exit={{
          opacity: 0,
          x: "100vw",
          transition: { ease: "easeOut", duration: 0.5, delay: 0.8 }
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapContainer
          center={[41.9, 12.45]}
          zoom={13}
          zoomControl={false}
          zoomSnap={0.25}
          dragging={false}
          doubleClickZoom={false}
          attributionControl={false}
          keyboard={false}
          scrollWheelZoom={false}
          touchZoom={false}
        >
          <Country />
          {props.showPoints && (
            <Marker icon={myIcon} position={JSON.parse(ctx.capitalLtdLng)}></Marker>
          )}
        </MapContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Map);
