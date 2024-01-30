import { ChangeEvent, ReactElement } from "react";
import { IconType } from "react-icons";

export interface TopBarButtons {
  icon: ReactElement;
  click: () => void;
}

export interface TopBarSearchProps {
  text: string;
  clearText: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  handleBlur: () => void;
  handleFocus: () => void;
}

export interface TopBarMenuItems {
  icon: IconType;
  label: string;
  func: () => void;
}
