import { ProductWithPrice } from "@/Interfaces";
import { InputHTMLAttributes, ReactNode } from "react";

export interface ParentModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}

export interface UploadModalFileInputProps {
  id: string;
  disabled: boolean;
  register: any;
  placeholder: string;
  accept: string;
}

export interface SubModalProps {
  products: ProductWithPrice[];
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
