import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowTool, Tool } from "../ToolFetchUtils";
import { useAuth } from "./AuthProvider";
import noPicAlt from "../assets/no-pic-alt.svg";

type ToolcardProps = {
  toolItem: Tool;
};

function Toolcard({ toolItem }: ToolcardProps) {
  const clientQuery = useQueryClient();
  const { currentUserId } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ["borrowTool"],
    mutationFn: () => BorrowTool(toolItem.id as string, currentUserId),
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["tools"] });
    },
  });

  function handleBorrowing() {
    alert("You have borrowed the " + toolItem);
    mutate();
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        {toolItem.imageName ? (
          <img
            className="object-contain w-full size-40"
            src={`/localBlob/${toolItem.imageName}`}
            alt={toolItem.name}
          />
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-200">
            <img
              className="object-contain w-full size-40 p-4"
              src={noPicAlt}
              alt="No picture available"
            />
          </div>
        )}
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
