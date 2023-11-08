import { useEffect, useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";
import Switch from "react-switch";
import axios from "axios";
import moment from "moment";

interface Weather {
  dayName: string;
  celsius: string;
  farenheit: string;
  description: string;
  date: string;
  iconPhrase: string;
}

const Main = () => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

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
        date: date.format("MM-DD"),
        description: forecast.Day.LongPhrase,
        celsius: "",
        farenheit: "",
        iconPhrase: "",
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
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div id="main">
      <div className="column-wrapper">
        <div id="tile-column">
          {weather.map((weatherData) => (
            <Tile {...weatherData} />
          ))}
        </div>

        <div id="description-column">
          <img
            className="description-weather-icon"
            src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/tornado.svg"
          />
          <div className="description">
            <span>34°</span>
            <small className="farenheit-sm">94°</small>
            <div className="weather-text">
              Some short text about this more words words owrds owsa oasdasoda{" "}
            </div>
          </div>
          <div className="weather-date">November 8</div>
        </div>
        <div className="location">Philippines, Metro Manila</div>
      </div>
    </div>
  );
};

export default Main;
