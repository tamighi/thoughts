import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import LabelItem from "@/components/LabelItem";
import { useLabels } from "@/hooks/query/labels/useLabels";
import React from "react";

const LabelsPage = () => {
  const { data, isLoading, error } = useLabels();
  const [createOpen, setCreateOpen] = React.useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load labels.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold">Labels</h1>
        <Button onClick={() => setCreateOpen(true)}>New label</Button>
      </div>
      <Dialog
        open={createOpen}
        title="Create label"
        onClose={() => setCreateOpen(false)}
      >
        Hello world
      </Dialog>

      {data?.length === 0 ? (
        <p>No labels found.</p>
      ) : (
        <div className="flex flex-col">
          {data?.map((label) => (
            <LabelItem key={label.id} label={label} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LabelsPage;
