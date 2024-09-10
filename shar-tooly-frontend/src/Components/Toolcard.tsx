import { Tool } from "../Utils";

type ToolcardProps = {
  toolItem: Tool;
};

function Toolcard({ toolItem }: ToolcardProps) {
  console.log(toolItem);
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          className="object-cover w-full h-60"
          src={`/localBlob/${toolItem.imageUrl}`}
          alt="No picture available"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {toolItem.name}</h2>
        <p>{toolItem.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Lend</button>
        </div>
      </div>
    </div>
  );
}

export default Toolcard;
