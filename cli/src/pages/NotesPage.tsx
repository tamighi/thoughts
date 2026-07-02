import { useNotes } from "@/hooks/query/useNotes";
import NoteListItem from "@/components/NoteListItem";
import React from "react";
import Pagination from "@/components/Pagination";

const NotesPage = () => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, error } = useNotes({
    page,
    limit: 5,
  });

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
