import { api } from "../axios";
import type { BoxShort } from "../schemas/box";
import type { PagedResponse } from "../schemas/page";
import { decryptItem } from "./item-services";

export async function searchBoxes(
  name: string,
  description: string,
  dataKey: CryptoKey
) {
  return api
    .get<PagedResponse<BoxShort>>("/boxes", {
      params: { name: name, description: description, or: true, size: 200 },
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
