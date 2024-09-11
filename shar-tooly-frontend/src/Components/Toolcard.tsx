import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTool, Tool } from "../Utils";

type ToolcardProps = {
  toolItem: Tool;
};

function Toolcard({ toolItem }: ToolcardProps) {
  const clientQuery = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteTool"],
    mutationFn: DeleteTool,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["tools"] });
    },
  });

  async function handleDelete() {
    mutate(toolItem.id!);
  }

  return (
    <div className="card card-compact bg-base-100 w-1/5 h-30 shadow-xl">
      <figure>
        <img
          className="object-contain w-full h-50"
          src={`/localBlob/${toolItem.imageName}`}
          alt="No picture available"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {toolItem.name}</h2>
        <p>{toolItem.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Lend</button>
          <button
            onClick={handleDelete}
            className="btn btn-warning">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolcard;
