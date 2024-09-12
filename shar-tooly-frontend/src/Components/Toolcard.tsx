import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowTool, Tool } from "../ToolFetchUtils";
import { useAuth } from "./AuthProvider";
import noPicAlt from "../assets/no-pic-alt.svg";
import toast, { Toaster } from "react-hot-toast";

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

  const notify = () => toast("You borrowed a tool! 🛠️");

  function handleBorrowing() {
    notify();
    mutate();
  }

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        {toolItem.imageName ? (
          <img
            className="object-contain w-full"
            src={`/localBlob/${toolItem.imageName}`}
            alt={toolItem.name}
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200">
            <img
              className="object-contain w-full size-40 p-4"
              src={noPicAlt}
              alt="No picture available"
            />
          </div>
        )}
      </figure>
      <div className="card-body text-sm">
        <h2 className="card-title"> {toolItem.name}</h2>

        <p>{toolItem.description}</p>
        <p>{toolItem.model}</p>

        <div className="card-actions justify-end">
          {currentUserId && (
            <button
              onClick={handleBorrowing}
              className="btn font-bold btn-secondary">
              Borrow
            </button>
          )}

          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Toolcard;
