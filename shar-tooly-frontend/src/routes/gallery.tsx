import { createFileRoute } from "@tanstack/react-router";
import ToolcardSkeleton from "../Components/ToolcardSkeleton.tsx";
import { useQuery } from "@tanstack/react-query";
import { GetTools } from "../Utils.ts";

export const Route = createFileRoute("/gallery")({
  component: () => Gallery(),
});

function Gallery() {
  const { data, isFetched } = useQuery({
    queryKey: ["tools"],
    queryFn: GetTools,
  });
  return (
    <>
      <p className="text-center">
        Check out some of the tools that our community has shared!
      </p>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Filter..."
          className="p-2 m-2"
        />
      </div>
      <div className="m-2 gap-10 flex flex-wrap justify-center">
        {isFetched &&
          data!.map((tool) => (
            <div
              key={tool.id}
              className="toolcard">
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
          ))}
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
      </div>
    </>
  );
}
