export interface Item {
  id: number;
  name: string;
  description: string | null;
  iv: string | null;
}

export interface ItemCreateData {
  name: string;
  boxId: number;
}
