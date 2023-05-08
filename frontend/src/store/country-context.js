import React from "react";

const CountryContext = React.createContext({
  country: "",
  capital: "",
  capitalLtdLng: "",
  flag: "",
  population: 0,
  area: 0,
  wiki: "",
  geom: "",
  fetchCountry: () => {}
});

export default CountryContext;
