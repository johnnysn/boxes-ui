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
import SearchBox from "../../lib/components/box/SearchBox";

export default function MyBoxes() {
  const [searchKey, setSearchKey] = useState("");

  const {
    data,
    isPending: isPendingFetch,
    isError: isErrorFetch,
    refetch,
  } = useQuery({
    queryKey: ["boxes", searchKey],
    queryFn: ({ queryKey }) =>
      api
        .get<
          PagedResponse<BoxShort>
        >("/boxes", { params: { name: queryKey[1] } })
        .then((d) => d.data),
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

      <SearchBox searchHandler={(key) => setSearchKey(key)} />

      {isPendingFetch ? (
        <span>Loading...</span>
      ) : data && !isErrorFetch ? (
        <>
          <BoxesGrid
            boxes={data.content}
            onDelete={deleteBox}
            onAddedItem={(boxId, item) => addItem({ boxId, body: item })}
            onDeleteItem={deleteItem}
          />
          <button
            type="button"
            className="mt-4 bg-orange-400 hover:bg-orange-300 border-b-2 border-b-primary text-customdark rounded font-bold py-2 w-[200px] flex items-center justify-center gap-2 transition-colors duration-300"
            onClick={() => setIsAdding(true)}
          >
            <img src={boxPlus} className="w-10" />
            <span className="text-lg">Add Box</span>
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
