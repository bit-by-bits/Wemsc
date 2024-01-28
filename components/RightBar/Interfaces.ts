interface LeftBarItem {
  label: string;
  iconOutline: any;
  iconFilled: any;
  href: string;
  active: boolean;
}

interface LeftBarMenu {
  label: string;
  items: LeftBarItem[];
}

interface LeftBarItemProps {
  item: LeftBarItem;
  isOpen: boolean;
}

interface LeftBarMenuProps {
  label: string;
  items: LeftBarItem[];
  isOpen: boolean;
}
