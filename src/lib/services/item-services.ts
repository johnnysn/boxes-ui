import { api } from "../api-client";
import type { Item, ItemCreateData } from "../schemas/item";
import { decryptText, encryptText } from "../utils/crypto";

export async function addItem(payload: ItemCreateData, dataKey: CryptoKey) {
  const { cipherText, iv } = await encryptText(payload.name, dataKey);
  payload.name = cipherText;

  await api.post(`/boxes/${payload.boxId}/items`, { ...payload, iv });
}

export async function decryptItem(item: Item, dataKey: CryptoKey) {
  if (item.iv) {
    item.name = await decryptText(item.name, item.iv, dataKey);
    if (item.description) {
      item.description = await decryptText(item.description, item.iv, dataKey);
    }
  }
}
