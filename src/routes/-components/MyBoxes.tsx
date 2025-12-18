import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { PagedResponse } from "../../lib/schemas/page";
import type { BoxShort } from "../../lib/schemas/box";
import BoxesGrid from "./BoxesGrid";
import { useState } from "react";
import Modal from "../../lib/components/ui/Modal";
import boxPlus from "../../assets/box-plus.svg";
import BoxEdit from "./BoxEdit";

export default function MyBoxes() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["boxes"],
    queryFn: ({ queryKey }) =>
      api.get<PagedResponse<BoxShort>>("/boxes").then((d) => d.data),
  });

  const { mutate: create, isPending: isPendingCreate } = useMutation({
    mutationKey: ["boxCreate"],
    mutationFn: async (body: {
      name: string;
      description: string;
      color: string;
    }) => {
      const { data } = await api.post("/boxes", body);
      refetch();

      return data;
    },
    onError: (error) => {}, // TODO handle error
  });

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-2xl font-bold mb-3">My boxes</h1>

      {isAdding && (
        <Modal onCancel={() => setIsAdding(false)}>
          <BoxEdit
            onClose={() => setIsAdding(false)}
            onSubmitHandler={(name, description, color) => {
              create({ name, description, color });

              setIsAdding(false);
            }}
            boxData={null}
          />
        </Modal>
      )}

      <button
        type="button"
        className="bg-orange-400 hover:bg-orange-300 border-b-2 border-b-primary text-customdark rounded font-bold py-2 w-[200px] flex items-center justify-center gap-2 transition-colors duration-300"
        onClick={() => setIsAdding(true)}
      >
        <img src={boxPlus} className="w-10" />
        <span className="text-lg">Add Box</span>
      </button>

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
