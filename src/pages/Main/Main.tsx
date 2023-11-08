import React, { useState } from "react";
import "./Main.css";
import Tile from "../../components/Tile/Tile";

const Main = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div id="main">
      <div className="column-wrapper">
        <div id="tile-column">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((x) => (
            <Tile label={x} />
          ))}
        </div>

        <div id="description-column">description</div>
      </div>
    </div>
  );
};

export default Main;
