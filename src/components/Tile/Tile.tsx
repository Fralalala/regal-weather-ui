import React from "react";
import "./Tile.css";

interface Props {
  label: string;
}

const Tile = ({ label }: Props) => {
  return (
    <div className="tile">
      <span>{label}</span>
      <div className="divider" />

      <div className="temperature">
        <span className="celsius">
          34<small>°C</small>{" "}
        </span>
        <span style={{ color: "black" }}>|</span>
        <span className="farenheit">
          {" "}
          90<small>°F</small>{" "}
        </span>
      </div>

      <img
        className="weather-icon"
        src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/tornado.svg"
      />
    </div>
  );
};

export default Tile;
