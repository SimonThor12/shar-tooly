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
          <h2 className="text-lg">
            Feel free to browse, although you need to be signed in to borrow
            tools
          </h2>
          <Link
            to="/profile"
            className="btn-link border-black ">
            Sign in
          </Link>
          <hr className=" m-10" />
        </div>
      )}

      <div className="flex justify-center items-center">
        <form onSubmit={handleFilterSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Filter..."
              name="filter"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
      <div className="flex flex-wrap justify-center md:justify-evenly gap-10 p-20 pt-5 grid-">
        {isLoading && (
          <>
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
