import LabelItem from "@/components/LabelItem";
import { useLabels } from "@/hooks/query/useLabels";

const LabelsPage = () => {
  const { data, isLoading, error } = useLabels();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load labels.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Labels</h1>

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
