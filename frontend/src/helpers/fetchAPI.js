import axios from "axios";

let displayedCountries = [];

const generateCountryNumber = () => {
  let isDisplayed = true;

  if (displayedCountries.length === 44) {
    displayedCountries = [];
  }

  while (isDisplayed) {
    const randomNumber = Math.ceil(Math.random() * 44);
    if (displayedCountries.includes(randomNumber)) {
      continue;
    } else {
      displayedCountries.push(randomNumber);
      isDisplayed = false;
      return randomNumber;
    }
  }
};

const fetchAPI = async () => {
  const randomCountryNumber = generateCountryNumber();
  const url = `https://statyevropy-api.onrender.com/staty/${randomCountryNumber}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(url, { timeout: 60000 });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const data = fetchData();
  return data;
};

export default fetchAPI;
