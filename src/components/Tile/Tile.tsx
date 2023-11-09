import "./Tile.css";
import { Weather } from "../../pages/Main/Main";

const Tile = ({ dayName, celsius, farenheit, iconPhrase }: Weather) => {
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

      <img className="weather-icon" src={iconPhrase} />
    </div>
  );
};

export default Tile;
