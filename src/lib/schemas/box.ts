import type { Item } from "./item";

export interface BoxShort {
  id: number;
  label: string;
  description: string;
  color: string;
  items: Item[];
}

export interface BoxCreateData {
  label: string;
  description: string;
  color: string;
}

export interface BoxUpdateData {
  id: number;
  label: string;
  description: string;
  color: string;
}
