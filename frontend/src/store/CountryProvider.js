import React, { useState, useEffect, useCallback } from "react";
import fetchAPI from "../helpers/fetchAPI";

import CountryContext from "./country-context";

const DEFAULT_COUNTRY_STATE = {
  country: "",
  capital: "",
  capitalLtdLng: "",
  flag: "",
  population: 0,
  area: 0,
  wiki: "",
  geom: "",
  fetchCountry: () => {}
};

const CountryProvider = (props) => {
  const [activeCountry, setActiveCountry] = useState(DEFAULT_COUNTRY_STATE);
  const [isLoading, setIsLoading] = useState(" ");
  const [error, setError] = useState(null);

  const fetchDataAPI = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const data = await fetchAPI();
      if (data.properties) {
        const countryData = {
          country: data.properties.country,
          capital: data.properties.capital,
          capitalLtdLng: data.properties.cap_coord,
          flag: data.properties.cntr_iso,
          population: data.properties.pop_categ,
          area: data.properties.area_categ,
          wiki: data.properties.wikipedia,
          geom: data
        };
        setActiveCountry(countryData);
        setError(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataAPI();
  }, [fetchDataAPI]);

  return (
    <CountryContext.Provider
      value={{
        country: activeCountry.country,
        capital: activeCountry.capital,
        flag: activeCountry.flag,
        capitalLtdLng: activeCountry.capitalLtdLng,
        population: activeCountry.population,
        area: activeCountry.area,
        wiki: activeCountry.wiki,
        geom: activeCountry.geom,
        fetchCountry: fetchDataAPI,
        isLoading: isLoading,
        error: error
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;
