import axios from "axios";
const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = `25a2a38b0f35a8bd76c2f1cff5ad7eb7`;

export const getWeather = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: OPEN_WEATHER_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather: " + error);
  }
};

export const getForecast = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: OPEN_WEATHER_KEY,
        units: "metric",
      },
    });

    return response.data.list;
  } catch (error) {
    throw new Error("Error fetching forecast: " + error);
  }
};
