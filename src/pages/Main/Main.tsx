import { useCallback, useEffect, useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";
import axios from "axios";
import moment from "moment";
import { getWeatherIcon } from "../../constants/getWeatherIcon";
import { toast } from "react-toastify";
import {
  celsiusToFarenheit,
  farenheitToCelsius,
} from "../../helper/helperTemperature";
import { debounce } from "../../helper/debounce";
import { motion } from "framer-motion";

// We export this as this will be used from other components
export interface Weather {
  dayName: string;
  celsius: string;
  farenheit: string;
  description: string;
  date: string;
  iconPhrase: string;
}

const Main = () => {
  const [inputToken, setInputToken] = useState("");
  const [weather, setWeather] = useState<Weather[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<Weather | undefined>(
    undefined
  );

  // Default value is my (the developer of this app) personal AccuWeather API Key.
  const getWeatherData = async (
    apiKey: string = "Ix3CHbqwB7qBGCehl4ZAeaexFRfZmHs8",
    showSuccess = false
  ) => {
    try {
      const res = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/264885?apikey=${apiKey}&details=true`
      );

      const newWeather: Weather[] = [];

      res.data.DailyForecasts.forEach((forecast: any) => {
        const date = moment(forecast.Date);

        // Intialize Weather Object values
        const dailyWeather: Weather = {
          dayName: date.format("ddd"),
          date: date.format("MMMM DD"),
          description: forecast.Day.LongPhrase,
          celsius: "",
          farenheit: "",
          iconPhrase: getWeatherIcon(forecast.Day.IconPhrase.toLowerCase()),
        };


        // Calculate Temperature Value
        let value: number = forecast.RealFeelTemperature.Maximum.Value;
        value += forecast.RealFeelTemperature.Minimum.Value;

        value /= 2;

        // AccuWeather does not contain both values for both units so we always have to check and convert accordingly
        if (forecast.RealFeelTemperature.Maximum.Unit === "F") {
          dailyWeather.farenheit = value.toString();
          dailyWeather.celsius = farenheitToCelsius(value).toString();
        } else {
          dailyWeather.celsius = value.toString();
          dailyWeather.farenheit = celsiusToFarenheit(value).toString();
        }

        newWeather.push(dailyWeather);
      });

      setWeather(newWeather);
      setSelectedWeather(newWeather[0]);

      if (showSuccess) toast("Successfulty fetched data.");
    } catch (error) {
      if (apiKey !== "Ix3CHbqwB7qBGCehl4ZAeaexFRfZmHs8") {
        toast("API key is invalid. Using default key.");
        getWeatherData();
      }
    }
  };

  const debouncedGetWeather = useCallback(
    debounce((newInputToken: string, showSuccess: boolean = false) => {
      getWeatherData(
        newInputToken || undefined,
        newInputToken === "" ? false : showSuccess
      );
    }, 200),
    []
  );

  useEffect(() => {
    debouncedGetWeather(inputToken, true);
  }, [inputToken]);

  return (
    <div id="main">
      {selectedWeather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="column-wrapper"
        >
          <div id="tile-column">
            {weather.map((weatherData) => (
              <Tile
                onClick={() => {
                  setSelectedWeather(weatherData);
                }}
                isSelected={selectedWeather?.date === weatherData.date}
                {...weatherData}
                key={weatherData.date}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            id="description-column"
            key={selectedWeather.dayName}
          >
            <img
              className="description-weather-icon"
              src={selectedWeather?.iconPhrase}
            />
            <div className="description">
              <span>{selectedWeather?.celsius}°</span>
              <small className="farenheit-sm">
                {selectedWeather?.farenheit}°
              </small>
              <div className="weather-text">{selectedWeather?.description}</div>
            </div>
            <div className="weather-date">{selectedWeather?.date}</div>
          </motion.div>
          <div className="location">Philippines, Metro Manila</div>

          <input
            value={inputToken}
            onChange={(event) => {
              setInputToken(event.target.value);
            }}
            className="input"
            placeholder="Inser API Key Here"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Main;
