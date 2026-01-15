import { api } from "../api-client";
import type { BoxShort } from "../schemas/box";
import type { PagedResponse } from "../schemas/page";
import { decryptItem } from "./item-services";

export async function searchBoxes(
  label: string,
  description: string,
  page: number,
  size: number,
  dataKey: CryptoKey
) {
  return api
    .get<PagedResponse<BoxShort>>("/boxes", {
      params: { label, description, or: true, size, page: page - 1 },
    })
    .then((d) => d.data)
    .then((data) => {
      const content = data.content;

      content.forEach((box) => {
        box.items.forEach(async (item) => decryptItem(item, dataKey));
      });

      return data;
    });
}
