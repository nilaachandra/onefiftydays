import React from "react";
import { Skeleton } from "./ui/skeleton";

const JournalListSkeleton = () => {
  return (
    <div className="h-[200px] w-full bg-[#fae3cf] p-7 rounded-xl">
      <div className="w-full space-y-1.5">
        <Skeleton className="w-2/5 h-3" />
        <Skeleton className="w-3/5 h-3" />
      </div>
      <div className="mt-12 flex justify-between items-center">
        <Skeleton className="w-20 h-6" />
        <div className="flex gap-3">
          <Skeleton className="w-10 h-4" />
          <Skeleton className="w-10 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
    </div>
  );
};

export default JournalListSkeleton;
