import type { Item } from "./item";

export interface BoxShort {
  id: number;
  name: string;
  description: string;
  color: string;
  items: Item[];
}

export interface BoxCreateData {
  name: string;
  description: string;
  color: string;
}
