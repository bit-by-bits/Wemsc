interface HomeCard {
  image: string;
  title: string;
  description: string;
  href: string;
}

interface HomeMenu {
  label: string;
  href: string;
  items: HomeCard[];
}

interface HomeCardProps {
  item: HomeCard;
}

interface HomeMenuProps {
  label: string;
  href: string;
  items: HomeCard[];
}
