import React from "react";
import "./Tile.css";

interface Props {
  dayName: string;
  celsius?: string;
  farenheit?: string;
}

const Tile = ({ dayName, celsius, farenheit }: Props) => {
  return (
    <div className="tile">
      <span>{dayName}</span>
      <div className="divider" />

      <div className="temperature">
        <span className="celsius">
          {celsius}
          <small>°C</small>
        </span>
        <span style={{ color: "black" }}>{" | "}</span>
        <span className="farenheit">
          {farenheit}
          <small>°F</small>
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
