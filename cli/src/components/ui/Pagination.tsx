interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-4">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
