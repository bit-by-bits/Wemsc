import { Song } from "@/Interfaces";

export interface SongCard {
  item: Song;
  href: string;
}

export interface SongMenu {
  label: string;
  href: string;
  items: Song[];
}

export interface SongCardProps {
  item: Song;
  onPlay: (id: string) => void;
}

export interface SongMenuProps {
  label: string;
  href: string;
  items: Song[];
}
