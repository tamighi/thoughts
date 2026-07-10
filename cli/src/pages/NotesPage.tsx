import { useNotes } from "@/hooks/query/notes/useNotes";
import NoteListItem from "@/components/NoteListItem";
import Pagination from "@/components/Pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";

const NotesPage = () => {
  const { page = 1, limit = 5, title } = useSearch({ from: "/notes" });
  const navigate = useNavigate({ from: "/notes" });

  const { data, isLoading, error } = useNotes({ page, limit, title });

  //TODO: Reset pages if filter changes
  const setPage = (newPage: number) => {
    navigate({
      search: (previous) => ({
        ...previous,
        page: newPage,
      }),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load notes.</div>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Notes</h1>

      {data?.items.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {data?.items.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </div>
      )}

      {data && (
        <Pagination
          page={data.meta.page}
          totalPages={data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default NotesPage;
