"use client";

import { ChangeEvent, FC, useState } from "react";
import TopBarButtons from "./TopBarButtons";
import TopBarSearch from "./TopBarSearch";
import TopBarMenu from "./TopBarMenu";

const TopBar: FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

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
    <div className="flex flex-row items-center justify-between w-full h-16 mb-4">
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
