function ToolcardSkeleton() {
  return (
    <div className="flex min-w-1/4 flex-wrap flex-col gap-4">
      <div className="skeleton opacity-50 bg-neutral h-32 w-full"></div>
      <div className="skeleton opacity-50 bg-secondary h-4 w-28"></div>
      <div className="skeleton bg-secondary opacity-50 h-4 w-full"></div>
    </div>
  );
}

export default ToolcardSkeleton;
