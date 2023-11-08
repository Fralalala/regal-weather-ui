import { useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";
import Switch from "react-switch";

const Main = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  return (
    <div id="main">
      <div className="column-wrapper">
        <div id="tile-column">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((x) => (
            <Tile label={x} />
          ))}
        </div>

        <div id="description-column">
          <img
            className="description-weather-icon"
            src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/tornado.svg"
          />
          <div className="description">
            <span>34°</span>
            <small className="farenheit-sm" >94°</small>
            <div className="location">Philippines, Metro Manila</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
