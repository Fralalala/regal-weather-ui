import { useCallback, useEffect, useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";
import axios from "axios";
import moment from "moment";
import { getWeatherIcon } from "../../constants/getWeatherIcon";

export interface Weather {
  dayName: string;
  celsius: string;
  farenheit: string;
  description: string;
  date: string;
  iconPhrase: string;
}

const Main = () => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<Weather | undefined>(
    undefined
  );

  const farenheitToCelsius = (farenheit: number) => {
    return Math.floor(((farenheit - 32) * 5) / 9);
  };

  const celsiusToFarenheit = (celsius: number) => {
    return Math.floor(celsius * (9 / 5) + 32);
  };

  const getWeatherData = async () => {
    const res = await axios.get(
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/264885?apikey=Ix3CHbqwB7qBGCehl4ZAeaexFRfZmHs8&details=true"
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
  };

  // const setActiveWeather = (newActiveWeather: Weather) => {
  //   setSelectedWeather(newActiveWeather)
  // }

  const setActiveWeather = useCallback(
    (weatherData: Weather) => {},
    [setSelectedWeather]
  );

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div id="main">
      <div className="column-wrapper">
        <div id="tile-column">
          {weather.map((weatherData) => (
            <Tile
              onClick={() => {
                setSelectedWeather(weatherData);
              }}
              isSelected={selectedWeather?.date === weatherData.date}
              {...weatherData}
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
      </div>
    </div>
  );
};

export default Main;
