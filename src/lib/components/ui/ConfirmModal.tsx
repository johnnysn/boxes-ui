import Button from "./Button";
import Modal from "./Modal";

interface Props {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  message,
  title,
  onConfirm,
  onCancel,
}: Props) {
  const cancel = onCancel || (() => {});

  return (
    <Modal onCancel={cancel}>
      <div className="flex flex-col">
        {title && <h1 className="text-lg font-bold mb-4">{title}</h1>}
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <Button onClick={cancel} color={"sec"}>
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
