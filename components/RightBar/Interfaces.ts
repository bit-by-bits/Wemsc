interface RightBarItem {
  img: string;
  main: string;
  left: string;
  right: string;
}

interface RightBarMenu {
  label: string;
  href: string;
  items: RightBarItem[];
}

interface RightBarItemProps {
  item: RightBarItem;
}

interface RightBarMenuProps {
  label: string;
  href: string;
  items: RightBarItem[];
}
