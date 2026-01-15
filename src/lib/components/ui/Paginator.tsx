import Button from "./Button";

interface Props {
  page: number;
  size: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Paginator({
  page,
  size,
  totalItems,
  onPageChange: onChangePage,
}: Props) {
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / size);

  return (
    <div className="flex items-center gap-5 py-2 border border-gray-100 px-2 rounded-md">
      <Button
        onClick={() => onChangePage(page - 1)}
        disabled={page <= 1 || totalItems === 0}
      >
        Previous Page
      </Button>

      <span className="text-gray-700">
        {page} out of {totalPages}
      </span>

      <Button
        onClick={() => onChangePage(page + 1)}
        disabled={page >= totalPages || totalItems === 0}
      >
        Next Page
      </Button>
    </div>
  );
}
