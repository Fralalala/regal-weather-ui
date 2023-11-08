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

      <div className="temperature" >
        <span className="celsius" >34°C </span>
        <span style={{color: "black"}} >|</span>
        <span className="farenheight" > 90°F</span>
      </div>

      <img className="weather-icon" src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/tornado.svg" />

    </div>
  );
};

export default Tile;
