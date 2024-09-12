import { createFileRoute } from "@tanstack/react-router";
import { PostTool } from "../ToolFetchUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../Components/AuthProvider";

export const Route = createFileRoute("/uploadform")({
  component: () => Uploadform(),
});

function Uploadform() {
  const clientQuery = useQueryClient();
  const { currentUserId } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ["postTools"],
    mutationFn: (formData: FormData) => PostTool(formData, currentUserId),
  });

  const handleNewToolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    mutate(formData, {
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
        clientQuery.invalidateQueries({ queryKey: ["tools"] });
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2 className="mt-10 text-xl text-center">
        Get started by sharing your first tool with the community!
      </h2>
      <form
        onSubmit={handleNewToolSubmit}
        className="mx-auto flex flex-col gap-4 items-center justify-center">
        <input
          type="file"
          name="Image"
          className="file-input w-80"
        />
        <label className="w-80 input input-bordered flex items-center gap-2">
          Tool name:
          <input
            required
            name="Name"
            type="text"
            placeholder="Axe"
          />
        </label>
        <label className="w-80 input input-bordered flex items-center gap-2">
          Description:
          <input
            name="Description"
            type="text"
            placeholder="Cuts wood"
          />
        </label>
        <label className="w-80 input input-bordered flex items-center gap-2">
          Model:
          <input
            name="Model"
            type="text"
            placeholder="M1"
          />
        </label>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
