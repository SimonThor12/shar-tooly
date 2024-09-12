import { createFileRoute, Link } from "@tanstack/react-router";
import ToolcardSkeleton from "../Components/ToolcardSkeleton.tsx";
import { GetTools, Tool } from "../ToolFetchUtils.ts";
import Toolcard from "../Components/Toolcard.tsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../Components/AuthProvider.tsx";

export const Route = createFileRoute("/gallery")({
  component: () => Gallery(),
});

function Gallery() {
  const { currentUserId } = useAuth();

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
      <h1 className="mt-10 mb-10 text-xl text-center">
        Check out some of the tools that our community has shared!
      </h1>
      {!currentUserId && (
        <div className="text-center">
          <h2 className="text-lg">Please log in to borrow these tools</h2>
          <Link
            to="/profile"
            className="btn btn-accent opacity-60 ">
            Go to login
          </Link>
        </div>
      )}

      <div className="flex justify-center">
        <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            name="filter"
            placeholder="Filter..."
            className="p-2 mt-10 mb-5"
          />
          <button className="btn">Search</button>
        </form>
      </div>
      <div className="p-40 pt-1 gap-10 flex flex-wrap w-full justify-center items-center">
        {isLoading && (
          <>
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
            <ToolcardSkeleton />
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
