import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTool, Tool } from "../ToolFetchUtils";

type ToolcardProps = {
  toolItem: Tool;
};

function Toolcard({ toolItem }: ToolcardProps) {


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
          <button className="btn font-bold  btn-secondary">Lend</button>
        </div>
      </div>
    </div>
  );
}

export default Toolcard;
