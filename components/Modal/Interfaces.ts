import { ReactNode } from "react";

export interface ParentModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}
