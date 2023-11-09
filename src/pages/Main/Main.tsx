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

  const getWeatherData = async (
    apiKey: string = "Ix3CHbqwB7qBGCehl4ZAeaexFRfZmHs8",
    showSuccess = false
  ) => {
    console.log("asjidniausd");
    try {
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/264885?apikey=${apiKey}&details=true`
      );

      const newWeather: Weather[] = [];

      res.data.DailyForecasts.forEach((forecast: any) => {
        const date = moment(forecast.Date);
        const dailyWeather: Weather = {
          dayName: date.format("ddd"),
          date: date.format("MMMM DD"),
          description: forecast.Day.LongPhrase,
          celsius: "",
          farenheit: "",
          iconPhrase: getWeatherIcon(forecast.Day.IconPhrase.toLowerCase()),
        };

        let value: number = forecast.RealFeelTemperature.Maximum.Value;
        value += forecast.RealFeelTemperature.Minimum.Value;

        value /= 2;

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
        toast("User inputed API key invalid. Using default key.");
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
        <div className="column-wrapper">
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

          <div id="description-column">
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
          </div>
          <div className="location">Philippines, Metro Manila</div>
          <input
            value={inputToken}
            onChange={(event) => {
              setInputToken(event.target.value);
            }}
            className="input"
          />
        </div>
      )}
    </div>
  );
};

export default Main;
