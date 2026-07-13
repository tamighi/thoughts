import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { useCreateLabel } from "@/hooks/query/labels/useCreateLabel";
import type { CreateLabelDto } from "@/types/label";
import React from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

type CreateLabelDialogProps = {
  open: boolean;
  onClose: () => void;
};

const CreateLabelDialog = ({ open, onClose }: CreateLabelDialogProps) => {
  const createLabel = useCreateLabel();

  const [content, setContent] = React.useState("");
  const [definition, setDefinition] = React.useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto: CreateLabelDto = {
      content,
      definition: definition || undefined,
    };

    createLabel.mutate(dto, {
      onSuccess: () => {
        setContent("");
        setDefinition("");
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} title="Create label" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span>Content</span>
          <Input
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span>Definition</span>
          <Textarea
            value={definition}
            onChange={(event) => setDefinition(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
            rows={3}
          />
        </label>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={createLabel.isPending}>
            {createLabel.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateLabelDialog;
