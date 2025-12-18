import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { PagedResponse } from "../../lib/schemas/page";
import type { BoxShort } from "../../lib/schemas/box";
import BoxesGrid from "./BoxesGrid";
import { useState } from "react";
import Modal from "../../lib/components/ui/Modal";
import boxPlus from "../../assets/box-plus.svg";
import BoxEdit from "./BoxEdit";
import type { ItemCreateData } from "../../lib/schemas/item";

export default function MyBoxes() {
  const {
    data,
    isPending: isPendingFetch,
    isError: isErrorFetch,
    refetch,
  } = useQuery({
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

  const { mutate: deleteBox, isPending: isPendingDelete } = useMutation({
    mutationFn: async (boxId: number) => {
      await api.delete(`/boxes/${boxId}`);
      refetch();
    },
    onError: (error) => {}, // TODO handle error
  });

  const { mutate: deleteItem, isPending: isPendingDeleteItem } = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/items/${id}`);
      refetch();
    },
    onError: (error) => {}, // TODO handle error
  });

  const { mutate: addItem, isPending: isPendingAddItem } = useMutation({
    mutationFn: async ({
      boxId,
      body,
    }: {
      boxId: number;
      body: ItemCreateData;
    }) => {
      await api.post(`/boxes/${boxId}/items`, body);
      refetch();
    },
    onError: (error) => {}, // TODO handle error
  });

  // const isPending = isPendingFetch || isPendingCreate || isPendingDelete || isPendingAddItem || isPendingDeleteItem;
  // const isError = isErrorFetch;

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

      {isPendingFetch ? (
        <span>Loading...</span>
      ) : data && !isErrorFetch ? (
        <BoxesGrid
          boxes={data.content}
          onDelete={deleteBox}
          onAddedItem={(boxId, item) => addItem({ boxId, body: item })}
          onDeleteItem={deleteItem}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
