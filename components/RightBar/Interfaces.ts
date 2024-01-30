import { Song } from "@/Interfaces";

export interface RightBarProps {
  up: Song[];
}

export interface RightBarItemProps {
  item: Song;
}

export interface RightBarMenuProps {
  label: string;
  href: string;
  items: Song[];
}
