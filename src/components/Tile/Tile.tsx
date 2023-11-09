import "./Tile.css";
import { Weather } from "../../pages/Main/Main";
import { motion } from "framer-motion";

interface Props extends Weather {
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Tile = ({
  dayName,
  celsius,
  farenheit,
  iconPhrase,
  isSelected,
  onClick,
}: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`tile ${isSelected && "selected"}`}
      onClick={onClick}
    >
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
    </motion.div>
  );
};

export default Tile;
