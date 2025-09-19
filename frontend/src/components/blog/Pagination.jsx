export default function Pagination({ page, setPage, totalPages, nextPage, prevPage }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        disabled={!prevPage}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${p === page ? "bg-red-400 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={!nextPage}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
