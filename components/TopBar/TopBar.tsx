"use client";

import { ChangeEvent, FC, useState } from "react";
import TopBarButtons from "./TopBarButtons";
import TopBarSearch from "./TopBarSearch";
import TopBarMenu from "./TopBarMenu";

const TopBar: FC = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearText = () => {
    setText("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-16 my-4">
      <TopBarButtons />
      <TopBarSearch
        text={text}
        clearText={clearText}
        handleChange={handleChange}
        isFocused={isFocused}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
      />
      <TopBarMenu />
    </div>
  );
};

export default TopBar;
