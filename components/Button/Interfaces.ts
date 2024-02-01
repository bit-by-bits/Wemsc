interface LikeButtonProps {
  songID: string;
  show: boolean;
}

interface PlayButtonProps {
  onPlay: () => void;
  mode: number;
}

interface ToolTipProps {
  text: string | JSX.Element;
  children: React.ReactNode;
}
