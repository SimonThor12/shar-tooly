import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowTool, Tool } from "../ToolFetchUtils";
import { useAuth } from "./AuthProvider";

type ToolcardProps = {
  toolItem: Tool;
};

function Toolcard({ toolItem }: ToolcardProps) {
  const clientQuery = useQueryClient();
  const { currentUserId } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ["borrowTool"],
    mutationFn: () => BorrowTool(toolItem.id as string, currentUserId),
  });

  function handleBorrowing() {
    alert("You have borrowed the " + toolItem);
    mutate();
    clientQuery.invalidateQueries({ queryKey: ["tools"] });
  }

  return (
    <div className="card bg-base-100 w-1/5 h-30 shadow-xl">
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
        <div className="card-actions justify-center">
          <button
            onClick={handleBorrowing}
            className="btn font-bold btn-secondary">
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolcard;
