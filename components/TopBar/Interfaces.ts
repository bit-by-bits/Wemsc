import { ChangeEvent, ReactElement } from "react";

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
  label: string;
  func: () => void;
}
