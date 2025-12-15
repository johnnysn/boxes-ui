import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { PagedResponse } from "../../lib/schemas/page";
import type { BoxListItem } from "../../lib/schemas/box";
import BoxesGrid from "./BoxesGrid";

export default function MyBoxes() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["boxes"],
    queryFn: ({ queryKey }) =>
      api.get<PagedResponse<BoxListItem>>("/boxes").then((d) => d.data),
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">My boxes</h1>

      {isPending ? (
        <span>Loading...</span>
      ) : data && !isError ? (
        <BoxesGrid boxes={data.content} />
      ) : (
        <></>
      )}
    </div>
  );
}
