import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { BoxCreateData } from "../../lib/schemas/box";
import BoxesGrid from "./BoxesGrid";
import { useContext, useState } from "react";
import Modal from "../../lib/components/ui/Modal";
import boxPlus from "../../assets/box-plus.svg";
import BoxEdit from "./BoxEdit";
import type { ItemCreateData } from "../../lib/schemas/item";
import SearchBox from "../../lib/components/box/SearchBox";
import { UserContext } from "../../lib/providers/user-context";
import { addItem } from "../../lib/services/item-services";
import { searchBoxes } from "../../lib/services/box-services";

export default function MyBoxes() {
  const [searchKey, setSearchKey] = useState({ name: "", description: "" });
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const {
    data,
    isPending: isPendingFetch,
    isError: isErrorFetch,
  } = useQuery({
    queryKey: ["boxes", searchKey.name, searchKey.description],
    queryFn: ({ queryKey }) =>
      searchBoxes(queryKey[1], queryKey[2], user!.dataKey),
  });

  const handleError = (error: Error) => {
    // TODO handle error
    console.error(error);
  };

  const handleSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["boxes"] });
  };

  const { mutate: createBox, isPending: isPendingCreate } = useMutation({
    mutationKey: ["boxCreate"],
    mutationFn: async (body: BoxCreateData) => {
      await api.post("/boxes", body);
    },
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: deleteBox, isPending: isPendingDelete } = useMutation({
    mutationFn: async (boxId: number) => {
      await api.delete(`/boxes/${boxId}`);
    },
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: deleteItem, isPending: isPendingDeleteItem } = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/items/${id}`);
    },
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: doAddItem, isPending: isPendingAddItem } = useMutation({
    mutationFn: async (body: ItemCreateData) => addItem(body, user!.dataKey),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isPending =
    isPendingFetch ||
    isPendingCreate ||
    isPendingDelete ||
    isPendingAddItem ||
    isPendingDeleteItem;
  // const isError = isErrorFetch;

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      {isAdding && (
        <Modal onCancel={() => setIsAdding(false)}>
          <BoxEdit
            onClose={() => setIsAdding(false)}
            onSubmitHandler={(name, description, color) => {
              createBox({ name, description, color });

              setIsAdding(false);
            }}
            boxData={null}
          />
        </Modal>
      )}

      <SearchBox
        searchHandler={(key, enableName, enableDescription) =>
          setSearchKey({
            name: enableName ? key : "",
            description: enableDescription ? key : "",
          })
        }
      />

      {isPendingFetch ? (
        <span>Loading...</span>
      ) : data && !isErrorFetch ? (
        <>
          <BoxesGrid
            boxes={data.content}
            onDelete={deleteBox}
            onAddedItem={(boxId, item) => doAddItem({ ...item, boxId })}
            onDeleteItem={deleteItem}
          />
          <button
            type="button"
            className="mt-4 bg-orange-400 hover:bg-orange-300 border-b-2 border-b-primary text-customdark rounded font-bold py-2 w-[200px] flex items-center justify-center gap-2 transition-colors duration-300"
            onClick={() => setIsAdding(true)}
            disabled={isPending}
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
