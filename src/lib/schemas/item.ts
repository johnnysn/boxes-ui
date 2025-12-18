export interface Item {
  id: number;
  name: string;
  description: string | null;
}

export interface ItemCreateData {
  name: string;
}
