import { createFileRoute } from "@tanstack/react-router";
import ToolcardSkeleton from "../Components/ToolcardSkeleton.tsx";

export const Route = createFileRoute("/gallery")({
  component: () => (
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
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
        <ToolcardSkeleton />
      </div>
    </>
  ),
});
