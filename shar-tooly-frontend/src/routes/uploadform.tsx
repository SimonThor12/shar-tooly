import { createFileRoute } from "@tanstack/react-router";
import { PostTool, Tool } from "../Utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/uploadform")({
  component: () => Uploadform(),
});

function Uploadform() {
  const clientQuery = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["postTools"],
    mutationFn: PostTool,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["tools"] });
    },
  });

  const handleNewToolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();

    const formData = new FormData(e.currentTarget);

    const Image = formData.get("file") as File;
    const ImageName = Image.name;

    const newTool: Tool = {
      name: formData.get("toolName") as string,
      description: formData.get("description") as string,
      model: formData.get("model") as string,
      imageUrl: ImageName,
    };

    mutate(newTool);
  };

  return (
    <>
      <h2 className="mt-10 text-xl text-center">
        Get started by sharing your first tool with the community!
      </h2>
      <form
        onSubmit={handleNewToolSubmit}
        className="mx-auto my-10 flex flex-col gap-4 items-center justify-center">
        <input
          type="file"
          name="file"
          className="file-input w-full max-w-xs"
        />
        <label className="w-1/4 input input-bordered flex items-center gap-2">
          Tool name:
          <input
            required
            name="toolName"
            type="text"
            placeholder="Axe"
          />
        </label>
        <label className="w-1/4 input input-bordered flex items-center gap-2">
          Description:
          <input
            name="description"
            type="text"
            placeholder="Cuts wood"
          />
        </label>
        <label className="w-1/4 input input-bordered flex items-center gap-2">
          Model:
          <input
            name="model"
            type="text"
            placeholder="M1"
          />
        </label>
      
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
