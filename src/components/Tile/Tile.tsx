import React from "react";
import "./Tile.css";

interface Props {
  label: string
}

const Tile = ({label}: Props) => {
  return <div className="tile">
    <span>{label}</span>
    <div className="divider" />

    <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/tornado.svg" />
    
  </div>;
};

export default Tile;
