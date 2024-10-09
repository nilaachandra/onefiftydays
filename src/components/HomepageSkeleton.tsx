import React from "react";
import { Skeleton } from "./ui/skeleton";

const HomepageSkeleton = () => {
  return (
    <div className="p-1 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="w-16 h-3" />
        <Skeleton className="w-1/5 h-3" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="w-16 h-3" />
        <Skeleton className="w-2/5 h-3" />
      </div>
    </div>
  );
};

export default HomepageSkeleton;
