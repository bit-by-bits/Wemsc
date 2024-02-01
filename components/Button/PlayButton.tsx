import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { GiMusicSpell } from "react-icons/gi";
import ToolTip from "./ToolTip";

const PlayButton: FC<PlayButtonProps> = ({ onPlay, mode }) => {
  return (
    <button
      onClick={onPlay}
      className={`cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out ${mode ? "opacity-100" : "opacity-0"}`}
    >
      <ToolTip text="Play">
        {mode === 1 ? (
          <GiMusicSpell className="text-white animate-pulse text-lg" />
        ) : (
          <FaPlay className="text-white" />
        )}
      </ToolTip>
    </button>
  );
};

export default PlayButton;
