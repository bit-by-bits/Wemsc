import { FC } from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton: FC<PlayButtonProps> = ({ onPlay, show }) => {
  return (
    <button
      onClick={onPlay}
      className={`cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}
    >
      <FaPlay className="text-white" />
    </button>
  );
};

export default PlayButton;
