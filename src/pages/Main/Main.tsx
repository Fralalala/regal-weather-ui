import React, { useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";

const Main = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

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
            <div>
              34°
              <div className="description-temperature">
                °
                <span
                  className="celsius"
                  style={{ textDecoration: isCelsius ? "underline" : "" }}
                >
                  C
                </span>
                <span style={{ color: "black" }}>|</span>°
                <span
                  className="farenheight"
                  style={{ textDecoration: !isCelsius ? "underline" : "" }}
                >
                  F
                </span>
              </div>
              <div className="location">Philippines, Metro Manila</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
