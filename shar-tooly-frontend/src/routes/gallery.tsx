import { createFileRoute } from "@tanstack/react-router";
import ToolcardSkeleton from "../Components/ToolcardSkeleton.tsx";
import { GetTools, Tool } from "../ToolFetchUtils.ts";
import Toolcard from "../Components/Toolcard.tsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/gallery")({
  component: () => Gallery(),
});

function Gallery() {
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["tools"],
    queryFn: GetTools,
  });

  const availableTools = data?.filter((tool: Tool) => tool.isAvailable == true);
  const filteredData = filter
    ? availableTools
        ?.filter((tool: Tool) =>
          tool.name.toLowerCase().includes(filter.toLowerCase())
        )
        .filter((tool: Tool) => tool.isAvailable == true)
    : availableTools;

  async function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataFromFilter = new FormData(e.target as HTMLFormElement);

    const filter = formDataFromFilter.get("filter") as string;

    setFilter(filter);
  }
  return (
    <>
      <p className="mt-10 mb-10 text-xl text-center">
        Check out some of the tools that our community has shared!
      </p>

      <div className="flex justify-center">
        <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            name="filter"
            placeholder="Filter..."
            className="p-2 m-2"
          />
          <button className="btn">Search</button>
        </form>
      </div>
      <div className="m-2 gap-10 flex flex-wrap justify-center">
        {isLoading && (
          <>
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
          </>
        )}
        {filteredData && (
          <>
            {filteredData.map((tool: Tool) => (
              <Toolcard
                key={tool.id}
                toolItem={tool}
              />
            ))}
          </>
        )}
        {error && (
          <p>Can not find the tools right now, please try again later.</p>
        )}
      </div>
    </>
  );
}
