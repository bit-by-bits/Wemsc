import { 
  FC } from "react";
import { LuMusic, LuSearch } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import { TopBarSearchProps } from "./Interfaces";

const TopBarSearch: FC<TopBarSearchProps> = ({
  text,
  clearText,
  handleChange,
  isFocused,
  handleBlur,
  handleFocus,
}) => {
  return (
    <div className="relative flex-grow mx-4">
      <div className="flex items-center absolute inset-y-0 left-0 pl-3 pointer-events-none">
        {isFocused ? (
          <LuMusic className="text-secondary-text text-xl" />
        ) : (
          <LuSearch className="text-secondary-text text-xl" />
        )}
      </div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="w-full h-10 px-10 rounded-full bg-white text-gray-800 placeholder-gray-500 outline-none appearance-none border-0 text-sm"
        placeholder="Search for artists, songs, or albums"
      />
      <div className="flex items-center absolute inset-y-0 right-0 pr-3">
        {text.length > 0 && (
          <button
            onClick={clearText}
            className="cursor-pointer hover:text-white transition-all"
          >
            <MdClear className="text-2xl hover:text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBarSearch;
