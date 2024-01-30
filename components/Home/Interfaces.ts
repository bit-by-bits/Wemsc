import { Song } from "@/Interfaces";

export interface HomeCard {
  item: Song;
  href: string;
}

export interface HomeMenu {
  label: string;
  href: string;
  items: Song[];
}

export interface HomeCardProps {
  item: Song;
  onPlay: (id: string) => void;
}

export interface HomeMenuProps {
  label: string;
  href: string;
  items: Song[];
}
